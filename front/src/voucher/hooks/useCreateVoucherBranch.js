import { useMutation } from "@tanstack/react-query";
import { createVoucherBranch } from "../api/voucherApi";

export default function useCreateVoucherBranch() {
  return useMutation({ mutationFn: createVoucherBranch });
}
