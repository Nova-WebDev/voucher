import { useState, useEffect } from "react";
import { useMeal } from "../../../meal/hooks/useMeal";
import { useMealImage } from "../../../meal/hooks/useMealImage";
import { useTimePolicies } from "../../../meal_plan_time_policy/hooks/useTimePolicies";

import darkFood from "../../../shared/assets/photo/dark_food.png";
import lightFood from "../../../shared/assets/photo/food.png";

import { useProfileStore } from "../../../user/store/profileStore";

import { useReserveRules } from "./useReserveRules";
import { ImageSection } from "./ImageSection";
import { InfoSection } from "./InfoSection";
import { ActionsSection } from "./ActionsSection";
import { Modals } from "./Modals";
import MealPlanDropdown from "../MealPlanDropdown";

export const MealPlanItemCard = ({ id, date, meal_id }) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [openReserveMembers, setOpenReserveMembers] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  const { meal, isLoading } = useMeal(meal_id);
  const role = useProfileStore((s) => s.role);
  const branch_role = useProfileStore((s) => s.branch_role);
  const { items: policies } = useTimePolicies();

  const img_id = meal?.img_id;
  const { imageUrl, isLoading: imgLoading, error } = useMealImage(img_id);

  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains("dark")
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

  const todayIso = new Date().toISOString().slice(0, 10);
  const canEdit = date >= todayIso && role === 20;
  const hasBranch = branch_role === 20;

  const { canReserve } = useReserveRules(date, policies);

  if (isLoading) {
    return (
      <div className="w-full h-48 p-4 bg-gray-200 rounded-xl dark:bg-gray-800 animate-pulse" />
    );
  }

  return (
    <div className="flex flex-col w-full gap-6 p-4 mx-auto transition-all bg-white border border-gray-200 shadow-md max-w-75 md:max-w-full dark:bg-gray-900 dark:border-gray-700 hover:shadow-xl rounded-2xl md:flex-row">
      <div className="relative m-3 md:m-auto md:w-36 md:h-36 lg:h-48 lg:w-48 rounded-2xl">
        <ImageSection
          imgLoading={imgLoading}
          finalImage={finalImage}
          meal={meal}
          canEdit={canEdit}
          setOpenDropdown={setOpenDropdown}
        />

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

      <div className="flex flex-col justify-between flex-1">
        <InfoSection meal={meal} />

        <ActionsSection
          meal_plan_id={id}
          canReserve={canReserve}
          hasBranch={hasBranch}
          setOpenReserveMembers={setOpenReserveMembers}
        />
      </div>

      <Modals
        openReserveMembers={openReserveMembers}
        openEditModal={openEditModal}
        setOpenReserveMembers={setOpenReserveMembers}
        setOpenEditModal={setOpenEditModal}
        id={id}
        date={date}
        meal_id={meal_id}
      />
    </div>
  );
};
