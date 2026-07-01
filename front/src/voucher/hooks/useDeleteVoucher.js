import { useMutation } from "@tanstack/react-query";
import { deleteVoucher } from "../api/voucherApi";

export default function useDeleteVoucher() {
  return useMutation({ mutationFn: deleteVoucher });
}
