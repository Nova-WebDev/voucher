import { useMutation } from "@tanstack/react-query";
import { updateBranch } from "../api/branchApi";

export function useUpdateBranch() {
  return useMutation({
    mutationFn: (data) => updateBranch(data),
  });
}
