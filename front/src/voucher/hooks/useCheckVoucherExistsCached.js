import { useEffect } from "react";
import { checkVoucherExists } from "../api/voucherApi";
import { useVoucherStore } from "../store/voucherStore";

export default function useCheckVoucherExistsCached(meal_plan_id) {
  const exists = useVoucherStore((state) =>
    meal_plan_id ? state.vouchers[meal_plan_id] ?? null : null
  );
  const setVoucher = useVoucherStore((state) => state.setVoucher);

  useEffect(() => {
    if (!meal_plan_id) return;
    if (exists !== null) return;

    checkVoucherExists({ meal_plan_id }).then((res) => {
      const value = res.exists;
      setVoucher(meal_plan_id, value);
    });
  }, [meal_plan_id, exists, setVoucher]);

  return { exists };
}
