import { create } from "zustand";

export const useRecurringMealPlanStore = create((set) => ({
  items: [],
  isLoaded: false,

  setItems: (items) => set({ items, isLoaded: true }),

  clear: () => set({ items: [], isLoaded: false }),
}));
