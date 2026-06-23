from users.core.entities.user_entity import UserEntity
from users.core.interfaces.user_repository import IUserRepository


class UpdateUser:
    def __init__(self, repository: IUserRepository):
        self.repository = repository

    async def execute(
        self,
        requester_role: int,
        public_id: str,
        phone: str,
        username: str,
        branch_id: str | None,
        branch_role: int,
    ) -> UserEntity:

        if requester_role != 20:
            raise PermissionError()

        return await self.repository.update(
            public_id=public_id,
            phone=phone,
            username=username,
            branch_id=branch_id,
            branch_role=branch_role,
        )
