from typing import List
from branch.core.entities.branch_entity import BranchEntity
from branch.core.interfaces.branch_repository import IBranchRepository


class ListBranches:
    def __init__(self, repository: IBranchRepository):
        self.repository = repository

    async def execute(self, role: int) -> List[BranchEntity]:
        if role != 20:
            raise PermissionError()

        return await self.repository.list_all()
