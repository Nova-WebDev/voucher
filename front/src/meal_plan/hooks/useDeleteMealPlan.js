import { useMutation } from "@tanstack/react-query";
import { deleteMealPlan } from "../api/mealPlanApi";

export function useDeleteMealPlan() {
  return useMutation({
    mutationFn: (plan_id) => deleteMealPlan(plan_id),
  });
}
