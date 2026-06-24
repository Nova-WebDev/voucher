from users.core.interfaces.user_repository import IUserRepository


class ValidateBranchUsers:
    def __init__(self, user_repo: IUserRepository):
        self.user_repo = user_repo

    async def execute(self, requester_public_id: str, target_public_ids: list[str]):
        requester = await self.user_repo.get_by_public_id(requester_public_id)
        if not requester:
            raise ValueError("Requester not found")

        if requester.branch_role != 20:
            raise ValueError("Requester is not branch admin")

        branch_id = requester.branch_id
        if not branch_id:
            raise ValueError("Requester has no branch assigned")

        users = await self.user_repo.get_by_public_ids(target_public_ids)

        for u in users:
            if u.branch_id != branch_id:
                raise ValueError("Some users do not belong to the same branch")

        return None
