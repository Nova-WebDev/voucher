import { create } from "zustand";

export const useUsersStore = create((set, get) => ({
  users: {},

  upsertUser: (user) =>
    set((state) => ({
      users: {
        ...state.users,
        [user.public_id]: {
          public_id: user.public_id,
          phone: user.phone,
          username: user.username,
          role: user.role,
          branch_id: user.branch_id,
          branch_role: user.branch_role,
          is_blocked: user.is_blocked,
        },
      },
    })),

  updateUserField: (public_id, field, value) =>
    set((state) => {
      const existing = state.users[public_id];
      if (!existing) return state;
      return {
        users: {
          ...state.users,
          [public_id]: {
            ...existing,
            [field]: value,
          },
        },
      };
    }),

  getUser: (public_id) => get().users[public_id] || null,

  clearUsers: () => set({ users: {} }),
}));
