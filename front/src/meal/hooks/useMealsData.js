import { useEffect, useState, useMemo } from "react";
import { listMeals } from "../api/mealsApi";
import { useMealStore } from "../store/mealStore";

export function useMealsData() {
  const { isSet, meals, setMeals } = useMealStore();
  const [error, setError] = useState(null);

  const isLoading = !isSet;

  useEffect(() => {
    if (isSet) return;

    let active = true;

    listMeals()
      .then((items) => {
        if (!active) return;
        setMeals(items);
      })
      .catch((err) => {
        if (!active) return;
        setError(err);
      });

    return () => {
      active = false;
    };
  }, [isSet, setMeals]);

  const data = useMemo(() => meals, [meals]);

  return {
    isLoading,
    error,
    meals: data,
  };
}
