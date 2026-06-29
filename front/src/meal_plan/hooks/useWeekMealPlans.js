import { useQuery } from "@tanstack/react-query";
import { getWeekMealPlans } from "../api/mealPlanApi";

export function useWeekMealPlans(plan_date) {
  return useQuery({
    queryKey: ["week-meal-plans", plan_date],
    queryFn: () => getWeekMealPlans(plan_date),
    enabled: !!plan_date,
  });
}
