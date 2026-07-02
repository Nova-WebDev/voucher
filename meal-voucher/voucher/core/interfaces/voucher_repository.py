from abc import ABC, abstractmethod
from typing import List
from voucher.core.entities.voucher_entity import VoucherEntity


class IVoucherRepository(ABC):

    @abstractmethod
    async def create_many(self, user_public_ids: List[str], meal_plan_id: int) -> List[VoucherEntity]:
        pass

    @abstractmethod
    async def get_by_id(self, voucher_id: int) -> VoucherEntity | None:
        pass

    @abstractmethod
    async def delete_many(self, meal_plan_id: int, public_ids: List[str]) -> None:
        pass

    @abstractmethod
    async def get_by_user_and_meal_plan(self, user_public_id: str, meal_plan_id: int) -> VoucherEntity | None:
        pass

    @abstractmethod
    async def get_branch_vouchers(self, branch_id: str, meal_plan_id: int) -> List[VoucherEntity]:
        pass

    @abstractmethod
    async def get_vouchers_with_branch(self, meal_plan_id: int) -> List[dict]:
        pass

    @abstractmethod
    async def get_voucher_report_rows(self, meal_plan_id: int, branch_id: str | None):
        pass