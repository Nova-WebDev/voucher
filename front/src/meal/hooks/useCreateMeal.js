import { useMutation } from "@tanstack/react-query";
import { createMeal } from "../api/mealsApi";

export function useCreateMeal() {
  return useMutation({
    mutationFn: (data) => createMeal(data),
  });
}
