import { useMutation } from "@tanstack/react-query";
import { createVoucher } from "../api/voucherApi";

export default function useCreateVoucher() {
  return useMutation({ mutationFn: createVoucher });
}
