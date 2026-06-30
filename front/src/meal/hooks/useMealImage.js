import { useEffect, useState } from "react";
import { getMealImage } from "../api/mealsApi";
import { useMealImageStore } from "../store/mealImageStore";

export function useMealImage(img_id) {
  const getImage = useMealImageStore((s) => s.getImage);
  const setImage = useMealImageStore((s) => s.setImage);

  const [imageUrl, setImageUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (img_id === undefined) return;

    if (img_id === null) {
      Promise.resolve().then(() => {
        setIsLoading(false);
        setImageUrl(null);
      });
      return;
    }

    let active = true;

    async function load() {
      try {
        const cached = await getImage(img_id);

        if (cached) {
          if (active) {
            setImageUrl(cached);
            setIsLoading(false);
          }
          return;
        }

        const res = await getMealImage(img_id);

        if (!res || !res.data) {
          throw new Error("empty response");
        }

        const blob = new Blob([res.data], { type: "image/png" });
        const url = await setImage(img_id, blob);

        if (active) {
          setImageUrl(url);
          setIsLoading(false);
        }
      } catch (err) {
        if (active) {
          setError(err);
          setIsLoading(false);
        }
      }
    }

    load();

    return () => {
      active = false;
    };
  }, [img_id, getImage, setImage]);

  return {
    isLoading,
    error,
    imageUrl,
  };
}
