import { MealCard } from "./MealCard";
import { useMealsData } from "../hooks/useMealsData";

export const MealCards = () => {
  const { meals, isLoading, error } = useMealsData();

  if (isLoading) {
    return (
      <div className="p-4 text-gray-700 dark:text-gray-300">
        در حال بارگذاری لیست غذاها...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-600 dark:text-red-400">
        خطا در دریافت لیست غذاها
      </div>
    );
  }

  const mealList = Object.values(meals);

  if (mealList.length === 0) {
    return (
      <div className="p-4 text-gray-700 dark:text-gray-300">
        هیچ غذایی ثبت نشده است.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 px-4 mt-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 md:px-7">
      {mealList.map((meal) => (
        <MealCard key={meal.id} meal_id={meal.id} />
      ))}
    </div>
  );
};
