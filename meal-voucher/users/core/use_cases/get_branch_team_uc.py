from typing import List
from users.core.interfaces.user_repository import IUserRepository

class GetBranchTeamUseCase:
    def __init__(self, user_repo: IUserRepository):
        self.user_repo = user_repo

    async def execute(self, requester_public_id: str, branch_id: str) -> List[str]:
        requester = await self.user_repo.get_by_public_id(requester_public_id)
        if requester is None:
            raise ValueError("User not found")

        if requester.role != 20:
            raise PermissionError("Not allowed")

        if requester.branch_id != branch_id:
            raise PermissionError("Branch mismatch")

        users = await self.user_repo.get_by_branch_id(branch_id)

        return [
            u.public_id
            for u in users
            if u.public_id != requester_public_id
        ]
