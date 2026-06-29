import { create } from "zustand";

export const useMealStore = create((set, get) => ({
  isSet: false,

  meals: {},

  setMeals(items) {
    const mapped = {};
    items.forEach((m) => {
      mapped[m.id] = m;
    });

    set({
      meals: mapped,
      isSet: true,
    });
  },

  addMeal(item) {
    const current = get().meals;
    set({
      meals: {
        ...current,
        [item.id]: item,
      },
    });
  },

  clearMeals() {
    set({
      meals: {},
      isSet: false,
    });
  },
}));
