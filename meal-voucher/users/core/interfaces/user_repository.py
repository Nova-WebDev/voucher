from typing import List
from abc import ABC, abstractmethod
from users.core.entities.user_entity import UserEntity
from users.core.entities.enums import UserOrderBy

class IUserRepository(ABC):

    @abstractmethod
    async def create(
        self,
        phone: str,
        username: str,
        branch_id: str | None,
        branch_role: int,
    ) -> UserEntity:
        pass

    @abstractmethod
    async def update(
        self,
        public_id: str,
        phone: str,
        username: str,
        branch_id: str | None,
        branch_role: int,
    ) -> UserEntity:
        pass

    @abstractmethod
    async def update_my_name(
        self,
        public_id: str,
        new_name: str,
    ) -> str:
        pass

    @abstractmethod
    async def get_by_public_ids(self, public_ids: list[str]) -> List[UserEntity]:
        pass


    @abstractmethod
    async def get_users_paginated(
        self,
        offset: int,
        limit: int,
        search: str | None,
        exclude_public_id: str | None,
        order_by: UserOrderBy,
        deorder: bool,
    ) -> List[UserEntity]:
        pass

    @abstractmethod
    async def count_users(
        self,
        search: str | None,
        exclude_public_id: str | None,
    ) -> int:
        pass

    @abstractmethod
    async def get_by_public_id(self, public_id: str) -> UserEntity | None:
        pass

    @abstractmethod
    async def set_block_status(self, public_id: str, is_blocked: bool) -> None:
        pass
