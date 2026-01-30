# seeder.py

import asyncio
import random
from uuid import uuid4
from app.core.database import Database 
from sqlalchemy import delete, insert, select
from sqlalchemy.orm import selectinload
from app.core.security import get_password_hash
from app.models.category import Occupation, Specialization
from app.models.city import City
from app.models.user import User
from app.models.performer import Performer, PerformerOccupation, PerformerSpecialization, PerformerService
from app.models.order import Order
from faker import Faker



faker = Faker()
db = Database()


async def seed_users():
    async with db.session() as session:
        # Example seed data
        num = 3731227
        batch_size: int = 1000
        await session.execute(delete(User))
        await session.commit()
        users = []
        password = get_password_hash('asim1234')

        for i in range(100000):
            print(i)
            users.append(User(
                username="+99450{0}".format(num + i),
                password=password,
                first_name=faker.first_name(),
                last_name=faker.last_name()
            ))
            if len(users) >= batch_size:
                session.add_all(users)
                await session.flush()  # Avoid commit here for speed
                users.clear()
                print(f"Inserted batch ending at user {num + i}")

        if users:
            session.add_all(users)
            await session.flush()
        await session.commit()
        print("Seeding completed.")


async def seed_orders():
    async with db.session() as session:
        batch_size: int = 1000
        users = (await session.execute(
            select(User)
        )).scalars().all()

        specializations = (await session.execute(
            select(Specialization)
        )).scalars().all()
        sp_count = len(specializations)

        # await session.commit()
        orders = []
        for i in range(len(users)):
            print(i)
            orders.append(Order(
                user_id=users[i].id,  # or `user_uid=user.uid` depending on your schema
                title=" ".join(faker.words()).capitalize(),
                description=faker.text(),
                specialization_id=specializations[random.randint(0, sp_count - 1)].id,
                destination="remote",
                status="approved",
                moderated=True,
            ))
            if len(orders) >= batch_size:
                session.add_all(orders)
                await session.flush()  # Avoid commit here for speed
                orders.clear()
                print(f"Inserted batch ending at order {i}")

        if orders:
            session.add_all(orders)
            await session.flush()
        await session.commit()
        print("Seeding completed.")


async def seed_performers(): 
    async with db.session() as session:
        await session.execute(delete(PerformerService))
        await session.execute(delete(PerformerSpecialization))
        await session.execute(delete(PerformerOccupation))
        await session.execute(delete(Performer))
        await session.commit()

        users = (await session.execute(select(User))).scalars().all()
        cities = (await session.execute(select(City))).scalars().all()
        result = await session.execute(
            select(Occupation)
            .options(
                selectinload(Occupation.specializations)
                .selectinload(Specialization.services)
            )
        )
        occupations = result.scalars().all()

        i = 1
        for user in users:
            # Random skip some users
            if random.randint(0, 100) > 25:
                continue

            account_type = "person" if random.randint(0, 100) > 15 else "organization"
            organization_name = f"" if account_type == "person" else faker.company()
            city_id = cities[random.randint(0, len(cities) - 1)].id

            performer = Performer(
                user_id=user.id,  # or user.uid depending on your schema
                account_type=account_type,
                city_id=city_id,
                organization_name=organization_name,
                description=faker.text(),
                status="approved",
                active=True,
            )
            session.add(performer)
            await session.flush()  # flush to get performer.id if needed

            for occupation in occupations:
                if random.randint(0, len(occupations)) < 1:
                    performer_occupation = PerformerOccupation(
                        occupation_id=occupation.id,
                        performer_id=performer.id
                    )
                    session.add(performer_occupation)
                    await session.flush()

                    specializations = occupation.specializations  # assuming eager loaded or relationship attribute
                    for specialization in specializations:
                        if random.randint(0, len(specializations)) < 2:
                            performer_specialization = PerformerSpecialization(
                                performer_id=performer.id,
                                occupation_id=performer_occupation.id,  # or performer_occupation.id
                                specialization_id=specialization.id
                            )
                            session.add(performer_specialization)
                            await session.flush()

                            services = specialization.services  # assuming relationship attribute
                            for service in services:
                                if random.randint(0, len(services)) < 6:
                                    performer_service = PerformerService(
                                        performer_id=performer.id,
                                        specialization_id=performer_specialization.id,
                                        service_id=service.id,
                                        status="approved"
                                    )
                                    session.add(performer_service)

            i += 1
            print(i, account_type, organization_name)

        await session.commit()
        print("Profiles added successfully.")


async def seed():
    await seed_users()


if __name__ == "__main__":
    asyncio.run(seed())
