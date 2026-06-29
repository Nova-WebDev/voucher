import { create } from "zustand";

export const useMealPlanTimePolicyStore = create((set) => ({
  isSet: false,
  items: [],

  setItems(list) {
    set({
      items: list,
      isSet: true,
    });
  },

  clear() {
    set({
      items: [],
      isSet: false,
    });
  },
}));
