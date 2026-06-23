from branch.core.interfaces.branch_repository import IBranchRepository


class DeleteBranch:
    def __init__(self, repository: IBranchRepository):
        self.repository = repository

    async def execute(self, role: int, branch_id: str) -> None:
        if role != 20:
            raise PermissionError()

        await self.repository.delete(branch_id)
