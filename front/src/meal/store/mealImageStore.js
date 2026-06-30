import { create } from "zustand";
import { get as idbGet, set as idbSet } from "idb-keyval";

function toBlobIfNeeded(value, mime = "image/png") {
  if (!value) return null;
  if (value instanceof Blob) return value;
  if (value instanceof ArrayBuffer) return new Blob([value], { type: mime });
  if (ArrayBuffer.isView(value)) return new Blob([value.buffer], { type: mime });
  if (typeof value === "string") {
    try {
      if (value.startsWith("data:")) {
        const parts = value.split(",");
        const meta = parts[0];
        const b64 = parts[1];
        const byteChars = atob(b64);
        const byteNumbers = new Array(byteChars.length);
        for (let i = 0; i < byteChars.length; i++) {
          byteNumbers[i] = byteChars.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const detectedType = meta.split(";")[0].split(":")[1] || mime;
        return new Blob([byteArray], { type: detectedType });
      } else {
        const b64 = value;
        const byteChars = atob(b64);
        const byteNumbers = new Array(byteChars.length);
        for (let i = 0; i < byteChars.length; i++) {
          byteNumbers[i] = byteChars.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        return new Blob([byteArray], { type: mime });
      }
    } catch {
      return null;
    }
  }
  return null;
}

export const useMealImageStore = create((set, get) => ({
  images: {},

  async getImage(img_id) {
    const state = get();
    if (state.images[img_id]) return state.images[img_id];

    const stored = await idbGet(`meal-img-${img_id}`);
    if (!stored) return null;

    const blob = toBlobIfNeeded(stored);
    if (!blob) return null;

    try {
      const url = URL.createObjectURL(blob);
      set({
        images: {
          ...state.images,
          [img_id]: url,
        },
      });
      return url;
    } catch (err) {
      console.error("mealImageStore.createObjectURL failed:", err);
      return null;
    }
  },

  async setImage(img_id, blob) {
    const realBlob = toBlobIfNeeded(blob) || blob;
    if (!(realBlob instanceof Blob)) return null;

    try {
      const url = URL.createObjectURL(realBlob);
      set({
        images: {
          ...get().images,
          [img_id]: url,
        },
      });
      await idbSet(`meal-img-${img_id}`, realBlob);
      return url;
    } catch (err) {
      console.error("mealImageStore.setImage failed:", err);
      return null;
    }
  },

  async loadImage(img_id) {
    const state = get();
    if (state.images[img_id]) return state.images[img_id];

    const stored = await idbGet(`meal-img-${img_id}`);
    if (!stored) return null;

    const blob = toBlobIfNeeded(stored);
    if (!blob) return null;

    try {
      const url = URL.createObjectURL(blob);
      set({
        images: {
          ...state.images,
          [img_id]: url,
        },
      });
      return url;
    } catch (err) {
      console.error("mealImageStore.loadImage failed:", err);
      return null;
    }
  },

  clearImages() {
    const imgs = get().images;
    Object.values(imgs).forEach((url) => {
      try {
        URL.revokeObjectURL(url);
      } catch (err) {
        console.error("revokeObjectURL failed:", err);
      }
    });
    set({ images: {} });
  },
}));
