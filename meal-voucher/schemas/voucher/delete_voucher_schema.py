from pydantic import BaseModel


class DeleteVoucherRequest(BaseModel):
    voucher_id: int
