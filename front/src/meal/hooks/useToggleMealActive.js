import { useMutation } from "@tanstack/react-query";
import { toggleMealActive } from "../api/mealsApi";

export function useToggleMealActive() {
  return useMutation({
    mutationFn: ({ meal_id, is_active }) =>
      toggleMealActive(meal_id, is_active),
  });
}
