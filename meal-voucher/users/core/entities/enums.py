from enum import Enum

class UserOrderBy(str, Enum):
    PUBLIC_ID = "public_id"
    PHONE = "phone"
    USERNAME = "username"
    ROLE = "role"
    BRANCH_ID = "branch_id"
    BRANCH_ROLE = "branch_role"
    IS_BLOCKED = "is_blocked"
    CREATED_AT = "created_at"
