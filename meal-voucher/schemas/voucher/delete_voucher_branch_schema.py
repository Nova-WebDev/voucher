from pydantic import BaseModel


class DeleteVoucherBranchRequest(BaseModel):
    voucher_id: int
    public_id: str
