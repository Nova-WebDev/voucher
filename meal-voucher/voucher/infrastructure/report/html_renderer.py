from typing import List
from datetime import date
from voucher.core.entities.voucher_report_entity import VoucherReportEntity


BASE_CSS = """
@page {
    size: A4;
    margin: 8mm;
}

body {
    font-family: "Vazirmatn", sans-serif;
    background: #f2f2f2;
    margin: 0;
    padding: 0;
    direction: rtl;
}

/* گرید دو ستونه با فاصلهٔ دقیق */
.grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 4mm;
}

/* کارت‌ها */
.card {
    background: white;
    border: 1px dashed #aaa;
    border-radius: 10px;
    padding: 8mm;
    min-height: 55mm;
    box-sizing: border-box;
    page-break-inside: avoid;
    text-align: center;
}

.card-title {
    font-size: 16pt;
    font-weight: 700;
    margin-bottom: 4mm;
    color: #333;
}

.card-desc {
    font-size: 11pt;
    color: #666;
    margin-bottom: 6mm;
    line-height: 1.6;
}

.row-info {
    font-size: 12pt;
    margin-bottom: 2mm;
}

.label {
    font-weight: 600;
    color: #444;
}
"""


def _format_date(d: date) -> str:
    return d.strftime("%Y-%m-%d")


def render_voucher_report_html(items: List[VoucherReportEntity]) -> tuple[str, str]:
    cards_html = []

    for item in items:
        cards_html.append(
            f"""
            <div class="card">
                <div class="card-title">{item.title}</div>
                <div class="card-desc">{(item.description or "").strip()}</div>
                <div class="row-info"><span class="label">تاریخ:</span> {_format_date(item.plan_date)}</div>
                <div class="row-info"><span class="label">کاربر:</span> {item.username}</div>
            </div>
            """
        )

    cards_str = "\n".join(cards_html)

    html = f"""
<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
    <meta charset="utf-8" />
    <title>Voucher Cards</title>
    <style>
    {BASE_CSS}
    </style>
</head>
<body>

<div class="grid">
    {cards_str}
</div>

</body>
</html>
    """

    return html, ""
