import { create } from "zustand";

export const useVoucherStore = create((set, get) => ({
  vouchers: {},

  setVoucher: (meal_plan_id, value) =>
    set((state) => ({
      vouchers: {
        ...state.vouchers,
        [meal_plan_id]: value,
      },
    })),

  getVoucher: (meal_plan_id) => {
    return get().vouchers[meal_plan_id] ?? null;
  },

  deleteVoucher: (meal_plan_id) =>
    set((state) => {
      const updated = { ...state.vouchers };
      delete updated[meal_plan_id];
      return { vouchers: updated };
    }),

  hasVoucher: (meal_plan_id) => {
    return Object.prototype.hasOwnProperty.call(get().vouchers, meal_plan_id);
  },

  clearVouchers: () => set({ vouchers: {} }),
}));
