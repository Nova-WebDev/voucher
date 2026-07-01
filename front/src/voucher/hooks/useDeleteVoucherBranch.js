import { useMutation } from "@tanstack/react-query";
import { deleteVoucherBranch } from "../api/voucherApi";

export default function useDeleteVoucherBranch() {
  return useMutation({ mutationFn: deleteVoucherBranch });
}
