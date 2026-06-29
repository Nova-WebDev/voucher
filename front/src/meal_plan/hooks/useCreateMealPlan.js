import { useMutation } from "@tanstack/react-query";
import { createMealPlan } from "../api/mealPlanApi";

export function useCreateMealPlan() {
  return useMutation({
    mutationFn: (data) => createMealPlan(data),
  });
}
