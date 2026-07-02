import { useQuery } from "@tanstack/react-query";
import { getBranchTeam } from "../api/userApi";

export default function useBranchTeam(branch_id, enabled = true) {
  return useQuery({
    queryKey: ["branch-team", branch_id],
    queryFn: () => getBranchTeam({ branch_id }),
    enabled: enabled && !!branch_id,
  });
}
