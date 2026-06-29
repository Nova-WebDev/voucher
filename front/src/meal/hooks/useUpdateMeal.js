import { useMutation } from "@tanstack/react-query";
import { updateMeal } from "../api/mealsApi";

export function useUpdateMeal() {
  return useMutation({
    mutationFn: (data) => updateMeal(data),
  });
}
