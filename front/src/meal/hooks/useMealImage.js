import { useEffect, useState } from "react";
import { getMealImage } from "../api/mealsApi";
import { useMealImageStore } from "../store/mealImageStore";

export function useMealImage(img_id) {
  const { getImage, setImage } = useMealImageStore();

  const [imageUrl, setImageUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!img_id) return;

    let active = true;

    async function load() {
      const cached = await getImage(img_id);

      if (cached) {
        if (active) {
          setImageUrl(cached);
          setIsLoading(false);
        }
        return;
      }

      try {
        const res = await getMealImage(img_id);
        const blob = res.data;
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
