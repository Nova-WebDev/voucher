import { useQuery } from "@tanstack/react-query";
import { getVoucherReport } from "../api/voucherApi";

export default function useVoucherReport(meal_plan_id, branch_id) {
  return useQuery({
    queryKey: ["voucher-report", meal_plan_id, branch_id],
    queryFn: () => getVoucherReport({ meal_plan_id, branch_id }),
    enabled: !!meal_plan_id,
  });
}
