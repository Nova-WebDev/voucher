from typing import List
from voucher.core.interfaces.voucher_repository import IVoucherRepository
from voucher.core.interfaces.voucher_report_builder import IVoucherReportBuilder
from voucher.core.entities.voucher_report_entity import VoucherReportEntity


class GenerateVoucherReport:
    def __init__(
        self,
        voucher_repo: IVoucherRepository,
        report_builder: IVoucherReportBuilder,
    ):
        self.voucher_repo = voucher_repo
        self.report_builder = report_builder

    async def execute(self, meal_plan_id: int, branch_id: str | None) -> bytes:
        rows = await self.voucher_repo.get_voucher_report_rows(
            meal_plan_id=meal_plan_id,
            branch_id=branch_id,
        )

        items: List[VoucherReportEntity] = [
            VoucherReportEntity(
                title=r.title,
                description=r.description,
                plan_date=r.plan_date,
                username=r.username,
            )
            for r in rows
        ]

        pdf_bytes = await self.report_builder.build_pdf(items)
        return pdf_bytes
