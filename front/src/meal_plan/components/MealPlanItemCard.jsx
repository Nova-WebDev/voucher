import { useState } from "react";
import { useMeal } from "../../meal/hooks/useMeal";
import { useMealImage } from "../../meal/hooks/useMealImage";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical, faUtensils, faUsers } from "@fortawesome/free-solid-svg-icons";

import MealPlanDropdown from "./MealPlanDropdown";
import ReserveMembersModal from "./ReserveMembersModal";
import EditMealPlanModal from "./EditMealPlanModal";

import darkFood from "../../shared/assets/photo/dark_food.png";
import lightFood from "../../shared/assets/photo/food.png";

export const MealPlanItemCard = ({ id, date, meal_id }) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [openReserveMembers, setOpenReserveMembers] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  const { meal, isLoading } = useMeal(meal_id);

  const img_id = meal?.img_id;
  const { imageUrl, isLoading: imgLoading, error } = useMealImage(img_id);

  const isDark = document.documentElement.classList.contains("dark");
  const fallbackImage = isDark ? darkFood : lightFood;
  const finalImage = error || !imageUrl ? fallbackImage : imageUrl;

  if (isLoading) {
    return <div className="w-full h-48 p-4 bg-gray-200 rounded-xl dark:bg-gray-800 animate-pulse" />;
  }

  return (
    <div className="flex flex-col w-full gap-6 p-4 mx-auto transition-all bg-white border border-gray-200 shadow-md max-w-75 md:max-w-full dark:bg-gray-900 dark:border-gray-700 hover:shadow-xl rounded-2xl md:flex-row">

      {/* عکس + سه‌نقطه + دراپ‌داون */}
      <div className="relative m-3 md:m-auto md:w-36 md:h-36 lg:h-48 lg:w-48 rounded-2xl">

        {/* عکس */}
        {imgLoading ? (
          <div className="w-full h-full bg-gray-300 animate-pulse dark:bg-gray-700 rounded-2xl" />
        ) : (
          <img
            src={finalImage}
            alt={meal.title}
            className="object-cover w-full h-full rounded-2xl"
          />
        )}

        {/* سه‌نقطه */}
        <button
          onClick={() => setOpenDropdown(true)}
          className="absolute p-2 text-white transition-opacity rounded-lg opacity-0 cursor-pointer top-3 right-3 bg-black/40 hover:opacity-100"
        >
          <FontAwesomeIcon icon={faEllipsisVertical} className="w-5 h-5" />
        </button>

        {/* دراپ‌داون */}
        <MealPlanDropdown
          open={openDropdown}
          setOpen={setOpenDropdown}
          id={id}
          date={date}
          meal_id={meal_id}
          onEdit={() => setOpenEditModal(true)}
          onDelete={(data) => console.log("DELETE:", data)}
        />
      </div>

      {/* متن و دکمه‌ها */}
      <div className="flex flex-col justify-between flex-1">
        <div>
          <h3 className="text-xl font-extrabold text-right text-gray-800 dark:text-gray-100">
            {meal.title}
          </h3>

          <div className="w-full h-px my-3 bg-gray-200 dark:bg-gray-700" />

          <p className="text-sm leading-relaxed text-right text-gray-600 dark:text-gray-300">
            {meal.description || "—"}
          </p>
        </div>

        <div className="flex flex-col justify-end w-full gap-3 mt-4 md:gap-2 md:flex-row md:w-auto">

          {/* بدون مودال */}
          <button
            className="flex items-center justify-center w-full gap-2 pt-2 pb-3 pl-5 pr-4 text-sm font-semibold text-white transition-all bg-green-700 rounded-md shadow-md cursor-pointer hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-700 hover:shadow-lg md:w-auto"
          >
            <FontAwesomeIcon icon={faUtensils} className="w-4 h-4" />
            ثبت رزرو غذا
          </button>

          {/* با مودال */}
          <button
            onClick={() => setOpenReserveMembers(true)}
            className="flex items-center justify-center w-full gap-2 pt-2 pb-3 pl-5 pr-4 text-sm font-semibold text-white transition-all bg-blue-700 rounded-md shadow-md cursor-pointer hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 hover:shadow-lg md:w-auto"
          >
            <FontAwesomeIcon icon={faUsers} className="w-4 h-4" />
            رزرو برای اعضا
          </button>

        </div>
      </div>

      {/* مودال رزرو اعضا */}
      {openReserveMembers && (
        <ReserveMembersModal
          id={id}
          date={date}
          meal_id={meal_id}
          onClose={() => setOpenReserveMembers(false)}
        />
      )}

      {/* مودال تغییر نوع غذا */}
      {openEditModal && (
        <EditMealPlanModal
          id={id}
          date={date}
          meal_id={meal_id}
          onClose={() => setOpenEditModal(false)}
        />
      )}
    </div>
  );
};
