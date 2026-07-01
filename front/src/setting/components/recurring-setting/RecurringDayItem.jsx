import { useMealsData } from "../../../meal/hooks/useMealsData";

export const RecurringDayItem = ({ item, selectedMealId, onChangeMealId }) => {
  const { meals, isLoading, error } = useMealsData();

  console.log("📌 RecurringDayItem render:", { item, selectedMealId });
  console.log("📌 useMealsData meals:", meals);

  const mealList = Object.values(meals || {}).filter((m) => m.is_active);
  console.log("📌 Active mealList:", mealList);

  const handleChange = (e) => {
    const val = e.target.value ? Number(e.target.value) : null;
    console.log("🔄 Meal selected:", val);
    onChangeMealId(val);
  };

  return (
    <div className="p-4 border border-gray-200 rounded-lg dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
      <div className="mb-2 font-semibold text-gray-800 dark:text-gray-200">
        {item.weekday} — {item.date}
      </div>

      <select
        value={selectedMealId || ""}
        onChange={handleChange}
        className="w-full px-4 py-2 text-gray-800 bg-white border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
      >
        <option value="">انتخاب غذا...</option>

        {isLoading && <option value="">در حال بارگذاری...</option>}

        {error && <option value="">خطا در دریافت غذاها</option>}

        {!isLoading &&
          !error &&
          mealList.map((meal) => (
            <option key={meal.id} value={meal.id}>
              {meal.title}
            </option>
          ))}
      </select>
    </div>
  );
};
