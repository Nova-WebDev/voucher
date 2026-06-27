import { create } from "zustand";

export const useProfileStore = create((set) => ({
  phone: null,
  public_id: null,
  username: null,
  role: null,
  branch_id: null,
  branch_role: null,
  is_blocked: null,
  exp: null,
  isSet: false,

  setProfile: (profile) =>
    set({
      phone: profile.phone,
      public_id: profile.public_id,
      username: profile.username,
      role: profile.role,
      branch_id: profile.branch_id,
      branch_role: profile.branch_role,
      is_blocked: profile.is_blocked,
      exp: profile.exp,
      isSet: true, 
    }),

  clearProfile: () =>
    set({
      phone: null,
      public_id: null,
      username: null,
      role: null,
      branch_id: null,
      branch_role: null,
      is_blocked: null,
      exp: null,
      isSet: false, 
    }),
}));
