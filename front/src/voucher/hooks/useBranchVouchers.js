import { useQuery } from "@tanstack/react-query";
import { getBranchVouchers } from "../api/voucherApi";

export default function useBranchVouchers(meal_plan_id) {
  return useQuery({
    queryKey: ["branch-vouchers", meal_plan_id],
    queryFn: () => getBranchVouchers({ meal_plan_id }),
    enabled: !!meal_plan_id,
  });
}
