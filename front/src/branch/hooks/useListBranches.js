import { useQuery } from "@tanstack/react-query";
import { listBranches } from "../api/branchApi";

export function useListBranches() {
  return useQuery({
    queryKey: ["branches-list"],
    queryFn: () => listBranches(),
  });
}
