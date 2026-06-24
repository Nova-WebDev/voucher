from sqlalchemy.ext.asyncio import AsyncSession

from voucher.infrastructure.data.voucher_repository import VoucherRepository

from voucher.core.use_cases.create_voucher import CreateVoucher
from voucher.core.use_cases.delete_voucher import DeleteVoucher
from voucher.core.use_cases.check_voucher_exists import CheckVoucherExists
from voucher.core.use_cases.get_branch_vouchers import GetBranchVouchers
from voucher.core.use_cases.get_mealplan_vouchers_for_admin import GetMealPlanVouchersForAdmin
from voucher.core.use_cases.generate_voucher_report import GenerateVoucherReport

from meal_plans.infrastructure.data.meal_plan_repository import MealPlanRepository
from meal_plan_time_policy.infrastructure.data.repositories import MealPlanTimePolicyRepository

from users.infrastructure.data.user_repository import UserRepository

from voucher.infrastructure.report.pdf_generator import PdfVoucherReportBuilder

def get_create_voucher_uc(session: AsyncSession) -> CreateVoucher:
    voucher_repo = VoucherRepository(session)
    meal_plan_repo = MealPlanRepository(session)
    time_policy_repo = MealPlanTimePolicyRepository(session)
    return CreateVoucher(
        voucher_repo=voucher_repo,
        meal_plan_repo=meal_plan_repo,
        time_policy_repo=time_policy_repo,
    )


def get_delete_voucher_uc(session: AsyncSession) -> DeleteVoucher:
    voucher_repo = VoucherRepository(session)
    meal_plan_repo = MealPlanRepository(session)
    time_policy_repo = MealPlanTimePolicyRepository(session)
    return DeleteVoucher(
        voucher_repo=voucher_repo,
        meal_plan_repo=meal_plan_repo,
        time_policy_repo=time_policy_repo,
    )


def get_check_voucher_exists_uc(session: AsyncSession) -> CheckVoucherExists:
    voucher_repo = VoucherRepository(session)
    return CheckVoucherExists(voucher_repo)

def get_branch_vouchers_uc(session: AsyncSession) -> GetBranchVouchers:
    voucher_repo = VoucherRepository(session)
    user_repo = UserRepository(session)
    return GetBranchVouchers(
        voucher_repo=voucher_repo,
        user_repo=user_repo,
    )

def get_mealplan_vouchers_for_admin_uc(session: AsyncSession) -> GetMealPlanVouchersForAdmin:
    voucher_repo = VoucherRepository(session)
    return GetMealPlanVouchersForAdmin(voucher_repo)

def provide_build_voucher_report_usecase(session):
    voucher_repo = VoucherRepository(session)
    report_builder = PdfVoucherReportBuilder()
    return GenerateVoucherReport(voucher_repo, report_builder)
