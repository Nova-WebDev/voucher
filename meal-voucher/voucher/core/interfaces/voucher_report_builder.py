from abc import ABC, abstractmethod
from typing import List
from voucher.core.entities.voucher_report_entity import VoucherReportEntity


class IVoucherReportBuilder(ABC):

    @abstractmethod
    async def build_pdf(self, items: List[VoucherReportEntity]) -> bytes:
        pass
