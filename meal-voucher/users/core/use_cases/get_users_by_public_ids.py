from typing import List
from users.core.entities.user_entity import UserEntity
from users.core.interfaces.user_repository import IUserRepository


class GetUsersByPublicIds:
    def __init__(self, repository: IUserRepository):
        self.repository = repository

    async def execute(self, public_ids: list[str]) -> List[UserEntity]:
        return await self.repository.get_by_public_ids(public_ids)
