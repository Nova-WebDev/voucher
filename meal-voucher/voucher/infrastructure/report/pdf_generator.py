from typing import List
from weasyprint import HTML
import jdatetime

from voucher.core.entities.voucher_report_entity import VoucherReportEntity
from voucher.core.interfaces.voucher_report_builder import IVoucherReportBuilder
from voucher.infrastructure.report.html_renderer import render_voucher_report_html


class PdfVoucherReportBuilder(IVoucherReportBuilder):
    async def build_pdf(self, items: List[VoucherReportEntity]) -> bytes:

        for item in items:
            if item.plan_date:
                jd = jdatetime.date.fromgregorian(date=item.plan_date)
                item.plan_date = jd
        html_str, _ = render_voucher_report_html(items)
        pdf_bytes = HTML(string=html_str).write_pdf()
        return pdf_bytes
