import { useMutation } from "@tanstack/react-query";
import { deleteTimePolicy } from "../api/mealPlanTimePolicyApi";

export function useDeleteTimePolicy() {
  return useMutation({
    mutationFn: (policy_id) => deleteTimePolicy(policy_id),
  });
}
