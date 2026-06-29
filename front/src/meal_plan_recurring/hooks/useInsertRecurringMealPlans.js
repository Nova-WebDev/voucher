import { useMutation, useQueryClient } from "@tanstack/react-query";
import { insertRecurringMealPlans } from "../api/mealPlanRecurringApi";

export function useInsertRecurringMealPlans() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: insertRecurringMealPlans,
    onSuccess: () => {
      queryClient.invalidateQueries(["recurring-meal-plans"]);
    },
  });
}
