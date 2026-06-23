from typing import List
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import insert, update, select, func

from users.core.interfaces.user_repository import IUserRepository
from users.core.entities.user_entity import UserEntity
from users.infrastructure.data.models import User
from users.core.entities.enums import UserOrderBy


class UserRepository(IUserRepository):
    def __init__(self, session: AsyncSession):
        self.session = session

    async def create(
        self,
        phone: str,
        username: str,
        branch_id: str | None,
        branch_role: int,
    ) -> UserEntity:

        stmt = (
            insert(User)
            .values(
                phone=phone,
                username=username,
                branch_id=branch_id,
                branch_role=branch_role,
            )
            .returning(
                User.public_id,
                User.phone,
                User.username,
                User.role,
                User.branch_id,
                User.branch_role,
                User.is_blocked,
            )
        )

        result = await self.session.execute(stmt)
        row = result.fetchone()
        await self.session.commit()

        return UserEntity(
            public_id=row.public_id,
            phone=row.phone,
            username=row.username,
            role=row.role,
            branch_id=row.branch_id,
            branch_role=row.branch_role,
            is_blocked=row.is_blocked,
        )

    async def update(
            self,
            public_id: str,
            phone: str,
            username: str,
            branch_id: str | None,
            branch_role: int,
    ) -> UserEntity:
        stmt = (
            update(User)
            .where(User.public_id == public_id)
            .values(
                phone=phone,
                username=username,
                branch_id=branch_id,
                branch_role=branch_role,
            )
            .returning(
                User.public_id,
                User.phone,
                User.username,
                User.role,
                User.branch_id,
                User.branch_role,
                User.is_blocked,
            )
        )

        result = await self.session.execute(stmt)
        row = result.fetchone()
        await self.session.commit()

        return UserEntity(
            public_id=row.public_id,
            phone=row.phone,
            username=row.username,
            role=row.role,
            branch_id=row.branch_id,
            branch_role=row.branch_role,
            is_blocked=row.is_blocked,
        )


    async def update_my_name(
        self,
        public_id: str,
        new_name: str,
    ) -> str:

        stmt = (
            update(User)
            .where(User.public_id == public_id)
            .values(username=new_name)
            .returning(User.username)
        )

        result = await self.session.execute(stmt)
        row = result.fetchone()
        await self.session.commit()

        return row.username

    async def get_by_public_ids(self, public_ids: list[str]) -> List[UserEntity]:
        if not public_ids:
            return []

        stmt = (
            select(User)
            .where(User.public_id.in_(public_ids))
        )

        result = await self.session.execute(stmt)
        models = result.scalars().all()

        return [
            UserEntity(
                public_id=m.public_id,
                phone=m.phone,
                username=m.username,
                role=m.role,
                branch_id=m.branch_id,
                branch_role=m.branch_role,
                is_blocked=m.is_blocked,
            )
            for m in models
        ]




    async def get_users_paginated(
        self,
        offset: int,
        limit: int,
        search: str | None,
        exclude_public_id: str | None,
        order_by: UserOrderBy,
        deorder: bool,
    ) -> List[UserEntity]:

        column = getattr(User, order_by.value)

        stmt = select(User)

        if exclude_public_id is not None:
            stmt = stmt.where(User.public_id != exclude_public_id)

        if search:
            stmt = stmt.where(User.username.ilike(f"%{search}%"))

        stmt = stmt.order_by(column.desc() if deorder else column.asc())
        stmt = stmt.offset(offset).limit(limit)

        result = await self.session.execute(stmt)
        models = result.scalars().all()

        return [
            UserEntity(
                public_id=m.public_id,
                phone=m.phone,
                username=m.username,
                role=m.role,
                branch_id=m.branch_id,
                branch_role=m.branch_role,
                is_blocked=m.is_blocked,
            )
            for m in models
        ]

    async def count_users(
        self,
        search: str | None,
        exclude_public_id: str | None,
    ) -> int:

        stmt = select(func.count(User.public_id))

        if exclude_public_id is not None:
            stmt = stmt.where(User.public_id != exclude_public_id)

        if search:
            stmt = stmt.where(User.username.ilike(f"%{search}%"))

        return await self.session.scalar(stmt)


    async def get_by_public_id(self, public_id: str) -> UserEntity | None:
        stmt = select(User).where(User.public_id == public_id)
        result = await self.session.execute(stmt)
        model = result.scalar_one_or_none()

        if model is None:
            return None

        return UserEntity(
            public_id=model.public_id,
            phone=model.phone,
            username=model.username,
            role=model.role,
            branch_id=model.branch_id,
            branch_role=model.branch_role,
            is_blocked=model.is_blocked,
        )

    async def set_block_status(self, public_id: str, is_blocked: bool) -> None:
        stmt = (
            update(User)
            .where(User.public_id == public_id)
            .values(is_blocked=is_blocked)
        )
        await self.session.execute(stmt)
        await self.session.commit()
