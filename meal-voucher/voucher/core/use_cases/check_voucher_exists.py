from voucher.core.interfaces.voucher_repository import IVoucherRepository


class CheckVoucherExists:
    def __init__(self, voucher_repo: IVoucherRepository):
        self.voucher_repo = voucher_repo

    async def execute(self, user_public_id: str, meal_plan_id: int) -> bool:
        voucher = await self.voucher_repo.get_by_user_and_meal_plan(
            user_public_id=user_public_id,
            meal_plan_id=meal_plan_id,
        )
        return voucher is not None
