import { useMutation } from "@tanstack/react-query";
import { updateTimePolicy } from "../api/mealPlanTimePolicyApi";

export function useUpdateTimePolicy() {
  return useMutation({
    mutationFn: (data) => updateTimePolicy(data),
  });
}
