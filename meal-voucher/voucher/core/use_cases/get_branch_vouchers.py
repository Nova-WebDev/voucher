from voucher.core.interfaces.voucher_repository import IVoucherRepository
from users.core.interfaces.user_repository import IUserRepository


class GetBranchVouchers:
    def __init__(
        self,
        voucher_repo: IVoucherRepository,
        user_repo: IUserRepository,
    ):
        self.voucher_repo = voucher_repo
        self.user_repo = user_repo

    async def execute(self, requester_public_id: str, meal_plan_id: int):
        user = await self.user_repo.get_by_public_id(requester_public_id)
        if not user:
            return []

        if user.branch_role != 20:
            return []

        branch_id = user.branch_id
        if not branch_id:
            return []

        return await self.voucher_repo.get_branch_vouchers(branch_id, meal_plan_id)
