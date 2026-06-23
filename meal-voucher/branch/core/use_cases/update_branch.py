from branch.core.entities.branch_entity import BranchEntity
from branch.core.interfaces.branch_repository import IBranchRepository


class UpdateBranch:
    def __init__(self, repository: IBranchRepository):
        self.repository = repository

    async def execute(self, role: int, branch_id: str, new_name: str) -> BranchEntity:
        if role != 20:
            raise PermissionError()

        return await self.repository.update(branch_id, new_name)
