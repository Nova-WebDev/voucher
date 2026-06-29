import { useEffect, useMemo, useState } from "react";
import { listTimePolicies } from "../api/mealPlanTimePolicyApi";
import { useMealPlanTimePolicyStore } from "../store/mealPlanTimePolicyStore";

export function useTimePolicies() {
  const { isSet, items, setItems } = useMealPlanTimePolicyStore();
  const [error, setError] = useState(null);

  const isLoading = !isSet;

  useEffect(() => {
    if (isSet) return;

    let active = true;

    listTimePolicies()
      .then((data) => {
        if (!active) return;
        setItems(data);
      })
      .catch((err) => {
        if (!active) return;
        setError(err);
      });

    return () => {
      active = false;
    };
  }, [isSet, setItems]);

  const data = useMemo(() => items, [items]);

  return {
    isLoading,
    error,
    items: data,
  };
}
