import { create } from "zustand";

export const useMealPlanStore = create((set, get) => ({
  weekPlans: {},

  setWeekPlans: (plans) => {
    set((state) => ({
      weekPlans: {
        ...state.weekPlans,
        ...plans,
      },
    }));
  },

  getDayPlans: (isoDate) => {
    return get().weekPlans[isoDate] || [];
  },

  updateDayPlans: (isoDate, items) => {
    set((state) => ({
      weekPlans: {
        ...state.weekPlans,
        [isoDate]: items,
      },
    }));
  },

  addPlanItem: (isoDate, item) => {
    const day = get().weekPlans[isoDate] || [];
    set((state) => ({
      weekPlans: {
        ...state.weekPlans,
        [isoDate]: [...day, item],
      },
    }));
  },

  updatePlanItem: (isoDate, planId, newItem) => {
    const day = get().weekPlans[isoDate] || [];
    const updated = day.map((x) => (x.id === planId ? newItem : x));
    set((state) => ({
      weekPlans: {
        ...state.weekPlans,
        [isoDate]: updated,
      },
    }));
  },

  deletePlanItem: (isoDate, planId) => {
    const day = get().weekPlans[isoDate] || [];
    const filtered = day.filter((x) => x.id !== planId);
    set((state) => ({
      weekPlans: {
        ...state.weekPlans,
        [isoDate]: filtered,
      },
    }));
  },
}));
