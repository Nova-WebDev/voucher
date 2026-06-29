import { useEffect, useState, useMemo } from "react";
import { getMeal } from "../api/mealsApi";
import { useMealStore } from "../store/mealStore";

export function useMeal(meal_id) {
  const { meals, addMeal } = useMealStore();
  const [error, setError] = useState(null);

  const meal = useMemo(() => meals[meal_id] || null, [meals, meal_id]);
  const isLoading = !meal;

  useEffect(() => {
    if (!meal_id) return;
    if (meal) return;

    let active = true;

    getMeal(meal_id)
      .then((item) => {
        if (!active) return;
        addMeal(item);
      })
      .catch((err) => {
        if (!active) return;
        setError(err);
      });

    return () => {
      active = false;
    };
  }, [meal_id, meal, addMeal]);

  return {
    isLoading,
    error,
    meal,
  };
}
