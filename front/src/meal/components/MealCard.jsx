import { useMeal } from "../hooks/useMeal";
import { useMealImage } from "../hooks/useMealImage";
import { useToggleMealActive } from "../hooks/useToggleMealActive";
import { useMealStore } from "../store/mealStore";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faBan,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";

import darkFood from "../../shared/assets/photo/dark_food.png";
import lightFood from "../../shared/assets/photo/food.png";

import { useEffect, useState } from "react";
import { UpdateMealModal } from "./UpdateMealModal";

export const MealCard = ({ meal_id }) => {
  const { meal, isLoading } = useMeal(meal_id);
  const [openUpdate, setOpenUpdate] = useState(false);

  const img_id = meal?.img_id;
  const { imageUrl, isLoading: imgLoading, error } = useMealImage(img_id);

  const toggleActiveMutation = useToggleMealActive();
  const updateMeal = useMealStore((s) => s.updateMeal);

  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains("dark"),
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });

    observer.observe(document.documentElement, { attributes: true });

    return () => observer.disconnect();
  }, []);

  const fallbackImage = isDark ? darkFood : lightFood;
  const finalImage = error || !imageUrl ? fallbackImage : imageUrl;

  const handleToggleActive = async () => {
    const result = await toggleActiveMutation.mutateAsync({
      meal_id: meal.id,
      is_active: !meal.is_active,
    });
    if (result.data?.status === "ok") {
      updateMeal({
        ...meal,
        is_active: !meal.is_active,
      });
    }
  };

  if (isLoading) {
    return (
      <div className="p-4 bg-gray-200 rounded-xl dark:bg-gray-800 animate-pulse aspect-square" />
    );
  }

  return (
    <>
      <div className="flex flex-col p-4 transition-shadow bg-white border border-gray-200 shadow-sm rounded-xl dark:bg-gray-900 dark:border-gray-700 hover:shadow-md aspect-square">
        <div className="w-full overflow-hidden bg-gray-100 rounded-lg aspect-square dark:bg-gray-800">
          {imgLoading ? (
            <div className="w-full h-full bg-gray-300 animate-pulse dark:bg-gray-700" />
          ) : (
            <img
              src={finalImage}
              alt={meal.title}
              className="object-cover w-full h-full"
            />
          )}
        </div>

        <h3 className="mt-3 text-base font-bold text-gray-800 truncate dark:text-gray-100">
          {meal.title}
        </h3>

        <p className="mt-1 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
          {meal.description || "—"}
        </p>

        <div className="flex flex-col gap-2 pt-3 mt-auto">
          <button
            onClick={() => setOpenUpdate(true)}
            className="flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-md cursor-pointer hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
          >
            <FontAwesomeIcon icon={faPenToSquare} className="w-4 h-4" />
            Update
          </button>

          <button
            onClick={handleToggleActive}
            className={`flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-white rounded-md cursor-pointer
              ${
                meal.is_active
                  ? "bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800"
                  : "bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800"
              }`}
          >
            <FontAwesomeIcon
              icon={meal.is_active ? faBan : faCheckCircle}
              className="w-4 h-4"
            />
            {meal.is_active ? "Deactive" : "Active"}
          </button>
        </div>
      </div>

      {openUpdate && (
        <UpdateMealModal
          meal={meal}
          initialImage={imageUrl}
          onClose={() => setOpenUpdate(false)}
        />
      )}
    </>
  );
};
