import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import ModalHeader from "./ModalHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useMealsData } from "../../meal/hooks/useMealsData";
import { useCreateMealPlan } from "../../meal_plan/hooks/useCreateMealPlan";
import { useMealPlanStore } from "../../meal_plan/store/mealPlanStore";

export default function AddMealPlanModal({ date, onClose }) {
  const { meals, isLoading, error } = useMealsData();
  const createMutation = useCreateMealPlan();
  const addPlanItem = useMealPlanStore((s) => s.addPlanItem);

  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState(null);

  const wrapperRef = useRef(null);
  const dropdownRef = useRef(null);

  const [selectedMealId, setSelectedMealId] = useState(null);

  const mealList = Object.values(meals || {}).filter((m) => m.is_active);

  const toPersianDate = (iso) => {
    return new Date(iso).toLocaleDateString("fa-IR");
  };

  const handleSelect = (mealId) => {
    setSelectedMealId(mealId);
    setOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleOpen = () => {
    setOpen(!open);
    if (!open && wrapperRef.current) {
      const rect = wrapperRef.current.getBoundingClientRect();
      setCoords({
        top: rect.bottom + 4,
        left: rect.left,
        width: rect.width,
      });
    }
  };

  const handleSubmit = async () => {
    const created = await createMutation.mutateAsync({
      plan_date: date,
      meal_id: selectedMealId,
    });

    addPlanItem(date, created);

    onClose();
  };

  const dropdown =
    open && coords
      ? createPortal(
          <div
            ref={dropdownRef}
            style={{
              position: "fixed",
              top: coords.top,
              left: coords.left,
              width: coords.width,
              zIndex: 999999,
            }}
            className="overflow-y-auto text-right bg-white border border-gray-300 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-600 max-h-60"
          >
            <div
              onClick={() => handleSelect(null)}
              className={`
                px-4 py-2 cursor-pointer 
                hover:bg-gray-100 dark:hover:bg-gray-700
                ${selectedMealId === null ? "bg-gray-200 dark:bg-gray-600" : ""}
                text-gray-800 dark:text-gray-100 text-right
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
                    text-gray-800 dark:text-gray-100 text-right
                  `}
                >
                  {meal.title}
                </div>
              ))}
          </div>,
          document.body
        )
      : null;

  const modal = (
    <div
      dir="RTL"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
    >
      <div className="w-full max-w-md rounded-lg overflow-hidden shadow-xl bg-[#F4F4F5] dark:bg-[#0D1525] border border-gray-300 dark:border-gray-700">
        <ModalHeader title="افزودن غذای جدید" onClose={onClose} />

        <div className="p-4 text-right text-gray-700 dark:text-gray-300">
          <div className="mb-6 font-semibold">
            تاریخ انتخاب‌شده:{" "}
            <span className="text-blue-700 dark:text-blue-300">
              {toPersianDate(date)}
            </span>
          </div>

          <label className="block mb-4 font-medium text-gray-800 dark:text-gray-200">
            انتخاب نوع غذا:
          </label>

          <div ref={wrapperRef} className="relative">
            <button
              onClick={handleOpen}
              className="flex items-center justify-between w-full px-4 py-2 text-right text-gray-800 bg-white border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
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
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 bg-[#F4F4F5] dark:bg-[#0D1525] mb-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
          >
            بستن
          </button>

          <button
            disabled={selectedMealId === null}
            onClick={handleSubmit}
            className={`px-4 py-2 text-sm font-medium text-white rounded-md transition ${
              selectedMealId === null
                ? "bg-gray-400 cursor-not-allowed opacity-30"
                : "bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800"
            }`}
          >
            افزودن غذا
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {createPortal(modal, document.body)}
      {dropdown}
    </>
  );
}
