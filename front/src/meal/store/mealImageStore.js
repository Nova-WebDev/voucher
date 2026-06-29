import { create } from "zustand";
import { get } from "idb-keyval";

export const useMealImageStore = create((set, getState) => ({
  images: {},

  async getImage(img_id) {
    const state = getState();
    if (state.images[img_id]) return state.images[img_id];

    const blob = await get(`meal-img-${img_id}`);
    if (!blob) return null;

    const url = URL.createObjectURL(blob);
    set({
      images: {
        ...state.images,
        [img_id]: url,
      },
    });

    return url;
  },

  async setImage(img_id, blob) {
    const url = URL.createObjectURL(blob);

    set({
      images: {
        ...getState().images,
        [img_id]: url,
      },
    });

    await set(`meal-img-${img_id}`, blob);

    return url;
  },

  async loadImage(img_id) {
    const state = getState();
    if (state.images[img_id]) return state.images[img_id];

    const blob = await get(`meal-img-${img_id}`);
    if (!blob) return null;

    const url = URL.createObjectURL(blob);
    set({
      images: {
        ...state.images,
        [img_id]: url,
      },
    });

    return url;
  },

  clearImages() {
    const imgs = getState().images;
    Object.values(imgs).forEach((url) => URL.revokeObjectURL(url));
    set({ images: {} });
  },
}));
