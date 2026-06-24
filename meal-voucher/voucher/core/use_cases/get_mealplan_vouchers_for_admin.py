from voucher.core.interfaces.voucher_repository import IVoucherRepository


class GetMealPlanVouchersForAdmin:
    def __init__(self, voucher_repo: IVoucherRepository):
        self.voucher_repo = voucher_repo

    async def execute(self, admin_role: int, meal_plan_id: int):
        if admin_role != 20:
            return []

        return await self.voucher_repo.get_vouchers_with_branch(meal_plan_id)
