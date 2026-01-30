from decimal import Decimal
from typing import List, Optional, Type
from typing import Callable, AsyncGenerator
from contextlib import AbstractContextManager
from fastapi_pagination.ext.sqlalchemy import apaginate
from fastapi_pagination import Params, create_page, Page
from sqlalchemy import and_, delete, desc, exists, func, or_, update
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.security import get_password_hash
from app.models.banner import Banner, BannerTypeEnum
from app.models.category import Occupation, Service, Specialization
from app.models.order import Order, OrderAddress, OrderAttachment, OrderComplaint, OrderStatusEnum, Reaction, ReactionAttachment
from app.models.performer import Performer, PerformerAddress, PerformerCertificate, PerformerComplaint, PerformerReview, PerformerService, PerformerServiceAttachment, PerformerSpecialization, PerformerSpecializationFeatureValue, PerformerVideo, VerificationStatusEnum
from app.models.user import User, UserDevice
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload, joinedload, aliased
from sqlalchemy.exc import NoResultFound
from pydantic import UUID4
import uuid
from datetime import datetime, timedelta
from sqlalchemy.orm import Session
from app.schemas.order import AdminOrderFilterParams, OrderAddressIn, OrderAttachmentStatusIn, OrderAttachmentsStatusIn, OrderComplaintFilterParams, OrderComplaintIn, OrderIn, OrderOut, OrderPaginationParams, OrderSearchParams, OrderStatusIn, ReactionFilterParams, ReactionIn
from .base_repository import BaseRepository
from geoalchemy2.elements import WKTElement


def make_point(longitude: float, latitude: float) -> WKTElement:
    return WKTElement(f'POINT({longitude} {latitude})', srid=4326)


def make_transformer(user):
    def transformer(items):
        result = []
        for order, count in items:
            order.is_mine = order.user_id == user.id
            obj = OrderOut.model_validate(order)
            obj.reactions_count = count or 0
            result.append(obj)
        return result
    return transformer


class OrderRepository(BaseRepository):

    async def get_orders(self, user: User, params: OrderSearchParams) -> Page[OrderOut]: 
        stmt = (
            select(Order, func.count(Reaction.id).label("reactions_count"))
            .outerjoin(Order.reactions)  # for reactions count and reacted filtering
            .options(
                selectinload(Order.specialization)
                    .selectinload(Specialization.occupation),
                selectinload(Order.user),
                selectinload(Order.address)
                    .selectinload(OrderAddress.city),
                selectinload(Order.attachments)
            )
            .where(Order.status == OrderStatusEnum.SEARCH_PERFORMER)
        )

        # Add aggregate (reactions count)
        # stmt = stmt.add_columns(func.count(Reaction.id).label("reactions_count"))
        stmt = stmt.group_by(Order.id)

        # Filter: if `reacted=true`, filter by current performer's reactions
        if params.reacted:
            performer_id = user.performer.id  # assumes performer exists
            stmt = stmt.where(Reaction.performer_id == performer_id)
            stmt = stmt.order_by(desc(func.max(Reaction.created_at)))  # similar to '-reactions__date'
        else:
            stmt = stmt.order_by(desc(Order.updated_at))

        # Filter by destinations
        if params.destinations:
            destination_list = params.destinations.split(",")
            stmt = stmt.where(Order.destination.in_(destination_list))

        # Filter by specializations
        if params.specializations:
            specialization_list = [int(id) for id in params.specializations.split(",")]
            stmt = stmt.where(Order.specialization_id.in_(specialization_list))

        # Filter by reactions_count
        if params.reaction_count is not None:
            stmt = stmt.having(func.count(Reaction.id) <= params.reaction_count)

        paginationParams = Params(page=params.page, size=10)
        return await apaginate(
            self.session, 
            stmt, 
            params=paginationParams, 
            transformer=make_transformer(user)
        )
    
    async def admin_get_orders(self, filters: AdminOrderFilterParams):
        stmt = (
            select(Order)
            .options(
                selectinload(Order.user),
                selectinload(Order.address)
                    .selectinload(OrderAddress.city),
                selectinload(Order.specialization)
                    .selectinload(Specialization.occupation)
            )
            .order_by(desc(Order.id))
        )

        if filters.user_id:
            stmt = stmt.where(Order.user_id == filters.user_id)
        if filters.username:
            stmt = stmt.where(Order.user.has(User.username.ilike(f"%{filters.username}%")))
        if filters.status:
            stmt = stmt.where(Order.status == filters.status)

        paginationParams = Params(page=filters.page, size=20)
        return await apaginate(self.session, stmt, params=paginationParams)


    async def admin_get_order(self, id: int) -> Order:
        stmt = (
            select(Order)
            .where(Order.id == id)
            .options(
                selectinload(Order.user),
                selectinload(Order.address)
                    .selectinload(OrderAddress.city),
                selectinload(Order.specialization)
                    .selectinload(Specialization.occupation),
                selectinload(Order.attachments)
            )
        )
        result = await self.session.execute(stmt)
        order = result.scalar_one_or_none()
        return order
    

    async def admin_update_order_status(self, order: Order, data: OrderStatusIn) -> Order:
        order.status = data.status
        order.status_reason_code = data.status_reason_code
        self.session.add(order)
        await self.session.flush()


    async def admin_update_order_attachments_status(self, order_id: int, data: OrderAttachmentsStatusIn):
        attachment_ids = [att.id for att in data.attachments]
        stmt = (
            select(OrderAttachment)
            .where(OrderAttachment.order_id == order_id, OrderAttachment.id.in_(attachment_ids))
        )
        result = await self.session.execute(stmt)
        attachments = result.scalars().all()

        data_map = {att.id: att for att in data.attachments}
        for attachment in attachments:
            if attachment.id in data_map:
                attachment.status = data_map[attachment.id].status
                attachment.status_reason_code = data_map[attachment.id].status_reason_code
                self.session.add(attachment)
        await self.session.flush()


    async def get_my_orders(self, user: User, params: OrderSearchParams):
        stmt = (
            select(Order, func.count(Reaction.id).label("reactions_count"))
            .outerjoin(Order.reactions)  # for reactions count and reacted filtering
            .options(
                selectinload(Order.specialization)
                    .selectinload(Specialization.occupation),
                selectinload(Order.user),
                selectinload(Order.address)
                    .selectinload(OrderAddress.city),
                selectinload(Order.attachments)
            )
            .where(Order.user_id == user.id)
            .order_by(Order.created_at.desc())
        )

        # Add aggregate (reactions count)
        # stmt = stmt.add_columns(func.count(Reaction.id).label("reactions_count"))
        stmt = stmt.group_by(Order.id)

        paginationParams = Params(page=params.page, size=10)
        return await apaginate(
            self.session, 
            stmt, 
            params=paginationParams, 
            transformer=make_transformer(user)
        )

    
    async def get_your_orders(self, user: User, params: OrderSearchParams):
        ReactionAll = aliased(Reaction)
        ReactionSelected = aliased(Reaction)
        stmt = (
            select(Order, func.count(Reaction.id).label("reactions_count"))
            .outerjoin(ReactionAll, Order.reactions)  # for reactions count and reacted filtering
            .outerjoin(ReactionSelected, Order.reaction)
            .options(
                selectinload(Order.specialization)
                    .selectinload(Specialization.occupation),
                selectinload(Order.user),
                selectinload(Order.address)
                    .selectinload(OrderAddress.city),
                selectinload(Order.attachments)
            )
            .where(Order.reaction.has(Reaction.performer_id == user.performer.id))
            .group_by(Order.id)
            .order_by(desc(Order.updated_at))
        )

        paginationParams = Params(page=params.page, size=10)
        return await apaginate(
            self.session, 
            stmt, 
            params=paginationParams, 
            transformer=make_transformer(user)
        )

    async def get_order(self, uid: str) -> Order:
        stmt = (
            select(Order)
            .options(
                selectinload(Order.specialization)
                    .selectinload(Specialization.occupation),
                selectinload(Order.user),
                selectinload(Order.address)
                    .selectinload(OrderAddress.city),
                selectinload(Order.attachments)
            )
            .where(Order.uid == uid)
        )
        result = await self.session.execute(stmt)
        order = result.scalar_one_or_none()
        return order


    async def get_order_with_reaction(self, uid: str) -> Order:
        stmt = (
            select(Order)
            .options(
                selectinload(Order.specialization)
                    .selectinload(Specialization.occupation),
                selectinload(Order.user),
                selectinload(Order.address)
                    .selectinload(OrderAddress.city),
                selectinload(Order.attachments),
                selectinload(Order.reaction)
                    .selectinload(Reaction.performer)
                    .selectinload(Performer.user)
            )
            .where(Order.uid == uid)
        )
        result = await self.session.execute(stmt)
        order = result.scalar_one_or_none()
        return order


    async def get_order_detailed(self, uid: str, user: User) -> Order:
        stmt = (
            select(Order, func.count(Reaction.id).label("reactions_count"))
            .outerjoin(Order.reactions)  # for reactions count and reacted filtering
            .options(
                selectinload(Order.specialization)
                    .selectinload(Specialization.occupation),
                selectinload(Order.user),
                selectinload(Order.address)
                    .selectinload(OrderAddress.city),
                selectinload(Order.attachments),
                # selectinload(Order.reaction)
                #     .selectinload(Reaction.performer)
                #     .selectinload(Performer.city),
                # selectinload(Order.reaction)
                #     .selectinload(Reaction.performer)
                #     .selectinload(Performer.user),
                selectinload(Order.reactions)
                    .selectinload(Reaction.performer)
                    .selectinload(Performer.city),
                selectinload(Order.reactions)
                    .selectinload(Reaction.performer)
                    .selectinload(Performer.user)
            )
            .where(Order.uid == uid)
        )
        # Add aggregate (reactions count)
        # stmt = stmt.add_columns(func.count(Reaction.id).label("reactions_count"))
        stmt = stmt.group_by(Order.id)

        result = await self.session.execute(stmt)
        row = result.first()

        if row is None:
            return None
        
        order, reactions_count = row[0], row[1]
        print(">> order reactions: ", order.reactions, reactions_count)

        if order.user_id == user.id:
            order.is_mine = True
            order.reactions_count = reactions_count
        return order
    

    async def create_order_address(self, user: User, data: OrderAddressIn) -> OrderAddress:
        coordinates = None
        print(">> coordinates")
        print(data.coordinates)
        if data.coordinates:
            coordinates = make_point(
                longitude=data.coordinates.longitude, 
                latitude=data.coordinates.latitude
            )
        address = OrderAddress(
            city_id=data.city_id,
            title=data.title,
            coordinates=coordinates,
        )
        self.session.add(address)
        await self.session.flush()
        await self.session.refresh(address)
        return address
    

    async def update_order_address(self, address: OrderAddress, data: OrderAddressIn) -> OrderAddress:
        for field, value in data.model_dump(exclude_unset=True).items():
            setattr(address, field, value)
        
        self.session.add(address)
        await self.session.flush()
        await self.session.refresh(address)
        return address


    async def create_order(self, user: User, address_id: Optional[int], data: OrderIn) -> Order:
        order_data = data.model_dump()
        del order_data['attachments']
        del order_data['address']

        order = Order(
            user_id=user.id,
            address_id=address_id,
            **order_data
        )
        self.session.add(order)
        await self.session.flush()
        await self.session.refresh(order)

        stmt = (
            update(OrderAttachment)
            .where(OrderAttachment.id.in_(data.attachments), OrderAttachment.user_id == user.id)
            .values(order_id=order.id)
        )
        await self.session.execute(stmt)
        await self.session.flush()

        order = await self.get_order_detailed(uid=order.uid, user=user)
        # await self.session.refresh(order, ['user', 'city', 'specialization', 'attachments', 'reaction'])
        return order


    async def update_order(self, order: Order, address_id: Optional[int], data: OrderIn) -> Order:
        order_data = data.model_dump()
        del order_data['attachments']
        del order_data['address']

        for field, value in order_data.items():
            setattr(order, field, value)
        order.address_id = address_id

        self.session.add(order)
        await self.session.flush()

        stmt = (
            update(OrderAttachment)
            .where(OrderAttachment.order_id == order.id)
            .values(order_id=None)
        )
        await self.session.execute(stmt)
        await self.session.flush()

        stmt = (
            update(OrderAttachment)
            .where(OrderAttachment.id.in_(data.attachments), OrderAttachment.user_id == order.user_id)
            .values(order_id=order.id)
        )
        await self.session.execute(stmt)
        await self.session.flush()

        await self.session.refresh(order, ['attachments', 'address'])
        return order
        

    async def select_reaction(self, order: Order, reaction: Reaction) -> Order:
        order.reaction_id = reaction.id
        order.status = OrderStatusEnum.PERFORMER_SELECTED
        self.session.add(order)
        await self.session.flush()
        await self.session.refresh(order)
        return order
    

    async def deselect_reaction(self, order: Order) -> Order:
        order.reaction_id = None
        order.status = OrderStatusEnum.SEARCH_PERFORMER
        self.session.add(order)
        await self.session.flush()
        await self.session.refresh(order)
        return order


    async def update_status(self, order: Order, status: str) -> Order:
        order.status = status
        await self.session.flush()
        await self.session.refresh(order)
        return order


    async def complete_order(self, order: Order, final_price: Decimal) -> Order:
        order.status = OrderStatusEnum.COMPLETED
        order.final_price = final_price
        await self.session.flush()
        await self.session.refresh(order)
        return order
    

    async def create_complaint(self, user: User, order: Order, data: OrderComplaintIn) -> OrderComplaint:
        order_complaint = OrderComplaint(
            user_id=user.id, 
            order_id=order.id,
            title=data.title,
            description=data.description
        )

        self.session.add(order_complaint)
        await self.session.flush()
        await self.session.refresh(order_complaint)
        return order_complaint
    

    async def get_complaints(self, filters: OrderComplaintFilterParams):
        stmt = (
            select(OrderComplaint)
            .join(OrderComplaint.user)
            .order_by(desc(OrderComplaint.created_at))
            .options(
                selectinload(OrderComplaint.user),
                selectinload(OrderComplaint.order)
                    .selectinload(Order.user),
                selectinload(OrderComplaint.order)
                    .selectinload(Order.address),
                selectinload(OrderComplaint.order)
                    .selectinload(Order.specialization)
            )
        )
        if filters.user_id:
            stmt = stmt.where(OrderComplaint.user_id == filters.user_id)
        if filters.username:
            stmt = stmt.where(User.username.ilike(f'%{filters.username}%'))
        if filters.order_id:
            stmt = stmt.where(OrderComplaint.order_id == filters.order_id)
        if filters.viewed is not None:
            stmt = stmt.where(OrderComplaint.viewed == filters.viewed)

        paginationParams = Params(page=filters.page, size=filters.size or 10)
        return await apaginate(self.session, stmt, params=paginationParams)
    

    async def get_complaint(self, id: int) -> OrderComplaint:
        stmt = (
            select(OrderComplaint)
            .where(OrderComplaint.id == id)
            .options(
                selectinload(OrderComplaint.user),
                selectinload(OrderComplaint.order)
                    .selectinload(Order.user),
                selectinload(OrderComplaint.order)
                    .selectinload(Order.address)
                    .selectinload(OrderAddress.city),
                selectinload(OrderComplaint.order)
                    .selectinload(Order.attachments),
                selectinload(OrderComplaint.order)
                    .selectinload(Order.specialization)
                    .selectinload(Specialization.occupation)
            )
        )
        result = await self.session.execute(stmt)
        return result.scalar_one_or_none()

    async def mark_complaint_viewed(self, id: int, viewed: bool = True) -> OrderComplaint:
        stmt = (
            update(OrderComplaint)
            .where(OrderComplaint.id == id)
            .values(viewed=viewed)
        )
        await self.session.execute(stmt)
        await self.session.flush()
        return await self.get_complaint(id)

    async def delete_complaint(self, id):
        stmt = (
            delete(OrderComplaint)
            .where(OrderComplaint.id == id)
        )
        await self.session.execute(stmt)
        await self.session.flush()
        

    async def create_order_attachment(self, user_id: int, image: str, image_small: Optional[str]) -> OrderAttachment:
        order_attachment = OrderAttachment(
            user_id=user_id,
            image=image,
            image_small=image_small,
        )
        self.session.add(order_attachment)
        await self.session.flush()
        await self.session.refresh(order_attachment)
        return order_attachment
        

    async def get_reaction(self, id: int) -> Reaction:
        stmt = select(Reaction).where(
            Reaction.id == id
        )
        result = await self.session.execute(stmt)
        reaction = result.scalar_one_or_none()
        return reaction
    

    async def get_reaction_detailed(self, id: int) -> Reaction:
        stmt = (
            select(Reaction)
            .where(Reaction.id == id)
            .options(
                selectinload(Reaction.performer)
                    .selectinload(Performer.city),
                selectinload(Reaction.performer)
                    .selectinload(Performer.user),
            )
        )
        result = await self.session.execute(stmt)
        reaction = result.scalar_one_or_none()
        return reaction
    
    async def get_all_reactions(self, filters: ReactionFilterParams):
        stmt = (
            select(Reaction)
            .order_by(desc(Reaction.created_at))
            .options(
                selectinload(Reaction.performer)
                    .selectinload(Performer.city),
                selectinload(Reaction.performer)
                    .selectinload(Performer.user),
                selectinload(Reaction.order)
                    .selectinload(Order.address),
                selectinload(Reaction.order)
                    .selectinload(Order.user)
            )
        )
        if filters.performer_id:
            stmt = stmt.where(Reaction.performer_id == filters.performer_id)
        if filters.order_id:
            stmt = stmt.where(Reaction.order_id == filters.order_id)

        paginationParams = Params(page=filters.page, size=10)
        return await apaginate(self.session, stmt, params=paginationParams)

    

    async def get_reactions(self, uid: str,  user_id: int) -> List[Reaction]:
        stmt = select(Reaction).where(
            Reaction.order.has(uid=uid),
            or_(
                Reaction.order.has(user_id=user_id),
                Reaction.performer.has(user_id=user_id)
            )
        )
        result = await self.session.execute(stmt)
        reactions = result.scalars().all()
        return reactions
        

    async def admin_delete_reaction(self, id: int):
        stmt = (
            delete(Reaction)
            .where(Reaction.id == id)
        )
        await self.session.execute(stmt)
        await self.session.flush()


    async def create_reaction_attachment(self, user_id: int, image: str, image_small: str) -> ReactionAttachment:
        reaction_attachment = ReactionAttachment(
            user_id=user_id,
            image=image,
            image_small=image_small,
        )
        self.session.add(reaction_attachment)
        await self.session.flush()
        await self.session.refresh(reaction_attachment)
        return reaction_attachment


    async def create_reaction(self, order_id: int, performer_id: int, data: ReactionIn) -> Reaction:
        reaction_data = data.model_dump()
        del reaction_data['order_id']
        del reaction_data['attachments']
        reaction = Reaction(
            order_id=order_id,
            performer_id=performer_id,
            **reaction_data,
        )
        self.session.add(reaction)
        await self.session.flush()
        await self.session.refresh(reaction, ['attachments'])
        return reaction
        

    async def update_reaction(self, reaction: Reaction, data: ReactionIn) -> Reaction:
        reaction_data = data.model_dump()
        del reaction_data['attachments']
        for field, value in reaction_data.items():
            setattr(reaction, field, value)

        self.session.add(reaction)
        await self.session.flush()
        await self.session.refresh(reaction)
        return reaction
        
    
    async def delete_reaction(self, reaction: Reaction):
        await self.session.delete(reaction)
    