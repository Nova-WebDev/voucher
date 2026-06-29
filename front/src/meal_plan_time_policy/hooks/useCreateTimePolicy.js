import { useMutation } from "@tanstack/react-query";
import { createTimePolicy } from "../api/mealPlanTimePolicyApi";

export function useCreateTimePolicy() {
  return useMutation({
    mutationFn: (data) => createTimePolicy(data),
  });
}
