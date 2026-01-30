from typing import Dict, List, Optional, Type
from typing import Callable, AsyncGenerator
from contextlib import AbstractContextManager
from app.models.performer import Performer
from fastapi import HTTPException
from sqlalchemy.exc import NoResultFound
from sqlalchemy import and_, func, or_, update
from app.models.chat import Chat, ChatBlock
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload, joinedload
from pydantic import UUID4
from sqlalchemy.orm import Session
from app.models.user import User
from app.schemas.chat import MessageIn
from app.schemas.performer import UserPerformerOut
from .base_repository import BaseRepository
from app.models.chat import ChatMessage


class ChatRepository(BaseRepository):

    async def get_all_chats(self, user_id: int) -> List[Chat]:
        stmt = (
            select(Chat)
            .where(or_(Chat.user1_id == user_id, Chat.user2_id == user_id))
            .options(
                selectinload(Chat.user1)
                    .selectinload(User.performer)
                    .selectinload(Performer.city),
                selectinload(Chat.user2)
                    .selectinload(User.performer)
                    .selectinload(Performer.city),
                selectinload(Chat.user1_last_message)
                    .selectinload(ChatMessage.sender)
                    .selectinload(User.performer)
                    .selectinload(Performer.city),
                selectinload(Chat.user2_last_message)
                    .selectinload(ChatMessage.sender)
                    .selectinload(User.performer)
                    .selectinload(Performer.city),
            )
        )
        result = await self.session.execute(stmt)
        chats = result.scalars().all()
        return chats
        
    
    async def get_chat(self, user: User, receiver_uid: str) -> Chat:
        stmt = select(Chat).where(
            or_(
                (Chat.user1.has(uid=receiver_uid) & (Chat.user2_id == user.id)),
                (Chat.user2.has(uid=receiver_uid) & (Chat.user1_id == user.id)),
            )
        )
        result = await self.session.execute(stmt)
        chat = result.scalar_one_or_none()
        return chat
    

    async def get_or_create_chat(self, user: User, receiver_uid: str) -> Chat:
        stmt = select(Chat).where(
            or_(
                (Chat.user1.has(uid=receiver_uid) & (Chat.user2_id == user.id)),
                (Chat.user2.has(uid=receiver_uid) & (Chat.user1_id == user.id)),
            )
        )
        result = await self.session.execute(stmt)
        chat = result.scalar_one_or_none()

        if chat:
            return chat

        # Get receiver user object
        receiver_stmt = select(User).where(User.uid == receiver_uid)
        receiver_result = await self.session.execute(receiver_stmt)
        receiver = receiver_result.scalar_one_or_none()

        if not receiver:
            raise NoResultFound()

        # Create a new chat
        new_chat = Chat(user1_id=user.id, user2_id=receiver.id)
        self.session.add(new_chat)
        await self.session.flush()
        await self.session.refresh(new_chat)

        return new_chat


    async def is_blocked(self, user_id: int, receiver_uid: str) -> bool:
        # stmt = select(ChatBlock).where(
        #     or_(
        #         and_(ChatBlock.blocker_id == user_id, ChatBlock.blocked.has(uid=receiver_uid)),
        #         and_(ChatBlock.blocker.has(uid=receiver_uid), ChatBlock.blocked_id == user_id)
        #     )
        # )
        stmt = select(ChatBlock).where(
            or_(
                ChatBlock.blocker_id == user_id, 
                ChatBlock.blocked.has(uid=receiver_uid),
            )
        )
        result = await self.session.execute(stmt)
        block = result.scalar_one_or_none()
        return block is not None
        
    
    async def save_message(self, chat: Chat, sender: User, receiver_id: int, text: str, file: str) -> ChatMessage:
        message = ChatMessage(
            sender_id=sender.id,
            receiver_id=receiver_id,
            chat_id=chat.id,
            text=text,
            file=file,
        )
        self.session.add(message)
        await self.session.flush()
        await self.session.refresh(message)
        return message
        
    async def update_chat_last_message(self, chat: Chat, sender: User, message: ChatMessage, blocked: bool) -> Chat:
        if chat.user1_id == sender.id:
            chat.user1_last_message = message
            if not blocked:
                chat.user2_last_message = message
        else:
            chat.user2_last_message = message
            if not blocked:
                chat.user1_last_message = message
        self.session.add(chat)
        await self.session.flush()
        await self.session.refresh(chat)
        return chat


    async def get_unread_messages(self, user_id: int) -> Dict:
        # stmt = (
        #     select(ChatMessage)
        #     .where(
        #         ChatMessage.seen == False,
        #         # ChatMessage.sender_id != user_id,
        #         ChatMessage.receiver_id == user_id,
        #         # ChatMessage.hidden_for_id != user_id
        #     )
        # )
        # result = await self.session.execute(stmt)
        # print(">> new messages")
        # messages = result.scalars().all()
        # for message in messages:
        #     print(">> message: ", message.id, message.sender_id, message.text, message.file, message.chat_id)
        
        unread_stmt = (
            select(ChatMessage.sender_id, func.count(ChatMessage.id).label("count"))
            .where(
                ChatMessage.seen == False,
                ChatMessage.receiver_id == user_id
            )
            # .where(ChatMessage.hidden_for_id != user_id)
            .group_by(ChatMessage.sender_id)
        )
        result = await self.session.execute(unread_stmt)
        unread_counts = {row.sender_id: row.count for row in result.all()}
        print("new message count", unread_counts)
        return unread_counts
    

    async def get_chat_message(self, id: int) -> ChatMessage:
        stmt = (
            select(ChatMessage)
            .where(ChatMessage.id == id)
            .options(
                selectinload(ChatMessage.sender)
                    .selectinload(User.performer)
                    .selectinload(Performer.city)
            )
        )
        result = await self.session.execute(stmt)
        message = result.scalar_one_or_none()
        return message


    async def get_chat_messages(self, user: User, chat: Chat, cursor: Optional[int]):
        # Messages depending on cursor
        if cursor:
            msg_stmt = (
                select(ChatMessage)
                .where(
                    ChatMessage.chat_id == chat.id,
                    ChatMessage.created_at < cursor,
                    ChatMessage.hidden_for_id != user.id  # assuming FK, adjust if ManyToMany
                )
                .order_by(ChatMessage.id.desc())
                .limit(25)
            )
            messages_result = await self.session.execute(msg_stmt)
            messages = messages_result.scalars().all()
            new_messages = []
        else:
            # recent messages (seen or sent by current user)
            print(">> fetch recent messages")
            msg_stmt = (
                select(ChatMessage)
                .where(
                    ChatMessage.chat_id == chat.id,
                    or_(
                        ChatMessage.seen == True,
                        ChatMessage.sender_id == user.id,
                        # ChatMessage.hidden_for_id != user.id
                    )
                ).options(
                    selectinload(ChatMessage.sender)
                        .selectinload(User.performer)
                        .selectinload(Performer.city)
                )
                .order_by(ChatMessage.id.desc())
                .limit(25)
            )
            result = await self.session.execute(msg_stmt)
            messages = result.scalars().all()

            # new unseen messages from other user
            new_stmt = (
                select(ChatMessage)
                .where(
                    # ChatMessage.chat_id == chat.id,
                    ChatMessage.seen == False,
                    ChatMessage.sender_id != user.id,
                    # ChatMessage.hidden_for_id != user.id
                ).options(
                    selectinload(ChatMessage.sender)
                        .selectinload(User.performer)
                        .selectinload(Performer.city)
                )
                .order_by(ChatMessage.id.desc())
            )
            new_messages = (await self.session.execute(new_stmt)).scalars().all()

        return messages, new_messages


    async def mark_messages_as_read(self, receiver: User, sender: User, messages: List[str]):
        stmt = (
            update(ChatMessage)
            .where(ChatMessage.sender_id == sender.id)
            .where(ChatMessage.uid.in_(messages))
            .values(seen=True)
        )
        await self.session.execute(stmt)
        await self.session.flush()

    
    async def get_blocked_chats(self, user_id: int, blocked_ids: List[int]) -> List[Chat]:
        stmt = (
            select(ChatBlock)
            .where(
                ChatBlock.blocker_id == user_id,
                ChatBlock.blocked_id.in_(blocked_ids)
            )
        )
        result = await self.session.execute(stmt)
        chats = result.scalars().all()
        return chats


    async def get_blocked_users(self, user_id: int) -> List[User]:
        stmt = (
            select(ChatBlock)
            .where(ChatBlock.blocker_id == user_id)
        )
        result = await self.session.execute(stmt)
        blocks = result.scalars().all()
        return [block.blocked for block in blocks]
    

    async def get_blocked_users_detailed(self, user_id: int) -> List[User]:
        stmt = (
            select(ChatBlock)
            .options(
                selectinload(ChatBlock.blocked)
                    .selectinload(User.performer)
                    .selectinload(Performer.city)
            )
            .where(ChatBlock.blocker_id == user_id)
        )
        result = await self.session.execute(stmt)
        blocks = result.scalars().all()
        return [block.blocked for block in blocks]


    async def block_user(self, user_id: int, blocked: User) -> ChatBlock:
        block = ChatBlock(
            blocker_id=user_id,
            blocked_id=blocked.id
        )
        self.session.add(block)
        await self.session.flush()
        await self.session.refresh(block)
        return block
        

    async def unblock_user(self, user_id: int, blocked: User) -> ChatBlock:
        stmt = select(ChatBlock).where(
            ChatBlock.blocker_id == user_id, 
            ChatBlock.blocked_id == blocked.id
        )
        result = await self.session.execute(stmt)
        block = result.scalar_one_or_none()

        if not block:
            return
            # raise NoResultFound(f"Block with User ID {blocked.uid} not found.")

        await self.session.delete(block)
        await self.session.flush()