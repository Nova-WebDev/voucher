from typing import List
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, insert, update, delete

from branch.core.interfaces.branch_repository import IBranchRepository
from branch.core.entities.branch_entity import BranchEntity
from branch.infrastructure.data.models import Branch


class BranchRepository(IBranchRepository):
    def __init__(self, session: AsyncSession):
        self.session = session

    async def create(self, name: str) -> BranchEntity:
        stmt = (
            insert(Branch)
            .values(name=name)
            .returning(Branch.id, Branch.name)
        )
        result = await self.session.execute(stmt)
        row = result.fetchone()
        await self.session.commit()
        return BranchEntity(id=row.id, name=row.name)

    async def list_all(self) -> List[BranchEntity]:
        stmt = select(Branch.id, Branch.name)
        result = await self.session.execute(stmt)
        rows = result.fetchall()

        return [
            BranchEntity(id=row.id, name=row.name)
            for row in rows
        ]

    async def update(self, branch_id: str, new_name: str) -> BranchEntity:
        stmt = (
            update(Branch)
            .where(Branch.id == branch_id)
            .values(name=new_name)
            .returning(Branch.id, Branch.name)
        )

        result = await self.session.execute(stmt)
        row = result.fetchone()
        await self.session.commit()

        return BranchEntity(id=row.id, name=row.name)

    async def delete(self, branch_id: str) -> None:
        stmt = delete(Branch).where(Branch.id == branch_id)
        await self.session.execute(stmt)
        await self.session.commit()
