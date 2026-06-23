from users.core.interfaces.user_repository import IUserRepository
from auth.core.interfaces.auth_store import IAuthStore


class BlockUser:
    def __init__(self, repository: IUserRepository, auth_store: IAuthStore):
        self.repository = repository
        self.auth_store = auth_store

    async def execute(
        self,
        requester_role: int,
        target_public_id: str,
        block: bool,
    ):

        if requester_role != 20:
            raise PermissionError()

        target_user = await self.repository.get_by_public_id(target_public_id)
        if target_user is None:
            raise ValueError("User not found")

        if target_user.role == 20:
            raise PermissionError()

        if block:
            await self.auth_store.delete(target_public_id)

        await self.repository.set_block_status(target_public_id, block)
