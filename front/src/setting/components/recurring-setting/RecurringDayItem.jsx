import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useMealsData } from "../../../meal/hooks/useMealsData";

export const RecurringDayItem = ({ item, selectedMealId, onChangeMealId }) => {
  const { meals, isLoading, error } = useMealsData();
  const mealList = Object.values(meals || {}).filter((m) => m.is_active);

  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  const handleSelect = (mealId) => {
    onChangeMealId(mealId);
    setOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="p-4 border border-gray-200 rounded-lg dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
      <div className="mb-2 font-semibold text-gray-800 dark:text-gray-100">
        {item.weekday} — {item.date}
      </div>

      <div ref={wrapperRef} className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center justify-between w-full px-4 py-2 text-right text-gray-800 bg-white border border-gray-300 rounded-lg  dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
        >
          <span>
            {selectedMealId
              ? mealList.find((m) => m.id === selectedMealId)?.title
              : "انتخاب غذا..."}
          </span>

          <FontAwesomeIcon
            icon={faChevronDown}
            className={`
              text-gray-600 dark:text-gray-300 
              transition-transform duration-200
              ${open ? "rotate-180" : "rotate-0"}
            `}
          />
        </button>

        {open && (
          <div
            className="absolute left-0 right-0 z-50 mt-2 overflow-y-auto bg-white border border-gray-300 rounded-lg shadow-lg  dark:bg-gray-800 dark:border-gray-600 max-h-60"
          >
            <div
              onClick={() => handleSelect(null)}
              className={`
                px-4 py-2 cursor-pointer 
                hover:bg-gray-100 dark:hover:bg-gray-700
                ${selectedMealId === null ? "bg-gray-200 dark:bg-gray-600" : ""}
                text-gray-800 dark:text-gray-100
              `}
            >
              انتخاب غذا...
            </div>

            {isLoading && (
              <div className="px-4 py-2 text-gray-600 dark:text-gray-300">
                در حال بارگذاری...
              </div>
            )}

            {error && (
              <div className="px-4 py-2 text-red-600 dark:text-red-400">
                خطا در دریافت غذاها
              </div>
            )}

            {!isLoading &&
              !error &&
              mealList.map((meal) => (
                <div
                  key={meal.id}
                  onClick={() => handleSelect(meal.id)}
                  className={`
                    px-4 py-2 cursor-pointer 
                    hover:bg-gray-100 dark:hover:bg-gray-700
                    ${selectedMealId === meal.id ? "bg-gray-200 dark:bg-gray-600" : ""}
                    text-gray-800 dark:text-gray-100
                  `}
                >
                  {meal.title}
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};
