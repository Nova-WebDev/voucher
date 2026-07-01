import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getWeekMealPlans } from "../api/mealPlanApi";
import { useMealPlanStore } from "../store/mealPlanStore";

export function useDayMealPlans(planDate) {
  const weekPlans = useMealPlanStore((s) => s.weekPlans);
  const setWeekPlans = useMealPlanStore((s) => s.setWeekPlans);

  const hasDay = weekPlans[planDate] !== undefined;

  const query = useQuery({
    queryKey: ["weekPlans", planDate],
    queryFn: () => getWeekMealPlans(planDate),
    enabled: !hasDay,
  });

  useEffect(() => {
    if (query.data) {
      setWeekPlans(query.data);
    }
  }, [query.data, setWeekPlans]);

  return weekPlans[planDate] || [];
}
