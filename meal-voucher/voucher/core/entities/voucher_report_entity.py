from dataclasses import dataclass
from datetime import date


@dataclass
class VoucherReportEntity:
    title: str
    description: str | None
    plan_date: date
    username: str
