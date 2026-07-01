import { useQuery } from "@tanstack/react-query";
import { getMealPlanVouchersForAdmin } from "../api/voucherApi";

export default function useAdminMealPlanVouchers(meal_plan_id) {
  return useQuery({
    queryKey: ["admin-mealplan-vouchers", meal_plan_id],
    queryFn: () => getMealPlanVouchersForAdmin({ meal_plan_id }),
    enabled: !!meal_plan_id,
  });
}
