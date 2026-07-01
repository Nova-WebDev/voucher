import { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

export default function MealPlanDropdown({ open, setOpen, id, date, meal_id, onEdit, onDelete }) {
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  if (!open) return null;

  return (
    <div
      ref={dropdownRef}
      className="absolute z-50 w-48 bg-white border border-gray-200 rounded-lg shadow-xl right-5 top-15 dark:bg-gray-800 dark:border-gray-700"
    >
      <div
        className="flex items-center gap-2 px-4 pt-2 pb-3 text-gray-700 cursor-pointer dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
        onClick={() => {
          onEdit({ id, date, meal_id });
          setOpen(false);
        }}
      >
        <FontAwesomeIcon icon={faPenToSquare} className="w-4 h-4" />
        <span>تغییر نوع غذا</span>
      </div>

      <div
        className="flex items-center gap-2 px-4 pt-2 pb-3 text-red-600 cursor-pointer dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30"
        onClick={() => {
          onDelete({ id, date, meal_id });
          setOpen(false);
        }}
      >
        <FontAwesomeIcon icon={faTrash} className="w-4 h-4" />
        <span>حذف غذا</span>
      </div>
    </div>
  );
}
