from users.core.interfaces.user_repository import IUserRepository
from users.core.entities.enums import UserOrderBy


class GetUsersPaginated:
    def __init__(self, repository: IUserRepository):
        self.repository = repository


    async def execute(
            self,
            requester_role: int,
            page: int,
            limit: int,
            search: str | None,
            current_user_public_id: str,
            order_by: UserOrderBy,
            deorder: bool,
            include_self: bool,
    ) -> dict:

        if requester_role != 20:
            raise PermissionError()

        if page < 1 or limit < 1:
            return {"users": [], "total_count": 0}

        offset = (page - 1) * limit

        exclude_id = None if include_self else current_user_public_id

        total_count = await self.repository.count_users(
            search=search,
            exclude_public_id=exclude_id,
        )

        users = await self.repository.get_users_paginated(
            offset=offset,
            limit=limit,
            search=search,
            exclude_public_id=exclude_id,
            order_by=order_by,
            deorder=deorder,
        )

        return {
            "users": users,
            "total_count": total_count,
        }
