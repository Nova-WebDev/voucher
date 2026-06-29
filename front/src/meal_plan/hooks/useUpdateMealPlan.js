import { useMutation } from "@tanstack/react-query";
import { updateMealPlan } from "../api/mealPlanApi";

export function useUpdateMealPlan() {
  return useMutation({
    mutationFn: (data) => updateMealPlan(data),
  });
}
