import { create } from "zustand";

export const useBranchStore = create((set) => ({
  isSet: false,
  branches: {},

  setBranches(items) {
    const mapped = {};
    items.forEach((b) => {
      mapped[b.id] = b.name;
    });

    set({
      branches: mapped,
      isSet: true,
    });
  },

  clearBranches() {
    set({
      branches: {},
      isSet: false,
    });
  },
}));
