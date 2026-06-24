from users.core.interfaces.user_repository import IUserRepository


class CheckBranchId:
    def __init__(self, user_repo: IUserRepository):
        self.user_repo = user_repo

    async def execute(self, requester_public_id: str, branch_id: None | str, requester_role):
        if requester_role == 20:
            return None

        requester = await self.user_repo.get_by_public_id(requester_public_id)
        if not requester:
            raise ValueError("Requester not found")

        if requester.branch_role != 20:
            raise ValueError("Requester is not branch admin")

        if not branch_id:
            raise ValueError("Requester has no branch assigned")

        if branch_id != requester.branch_id:
            raise ValueError

        return None
