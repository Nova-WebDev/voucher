import { useDayMealPlans } from "../hooks/useDayMealPlans";
import { MealPlanItemCard } from "./MealPlanItemCard";

export const MealPlanBody = ({ selectedDate }) => {
  const dayPlans = useDayMealPlans(selectedDate);

  if (!selectedDate) {
    return (
      <div className="p-4 text-gray-600 dark:text-gray-300">
        لطفاً یک روز را انتخاب کنید.
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full gap-6 p-4">
      {dayPlans.length === 0 ? (
        <div className="text-gray-600 dark:text-gray-300">
          برای این روز برنامه‌ای ثبت نشده است.
        </div>
      ) : (
        dayPlans.map((item) => (
          <MealPlanItemCard
            key={item.id}
            id={item.id}
            date={selectedDate}
            meal_id={item.meal_id}
          />
        ))
      )}
    </div>
  );
};
