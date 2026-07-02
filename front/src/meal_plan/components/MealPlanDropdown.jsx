import { useEffect, useRef, useCallback } from "react";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useDeleteMealPlan } from "../../meal_plan/hooks/useDeleteMealPlan";
import { useMealPlanStore } from "../../meal_plan/store/mealPlanStore";

export default function MealPlanDropdown({ open, setOpen, id, date, meal_id, onEdit }) {
  const dropdownRef = useRef(null);

  const deleteMutation = useDeleteMealPlan();
  const deletePlanItem = useMealPlanStore((s) => s.deletePlanItem);

  const handleClickOutside = useCallback(
    (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    },
    [setOpen] 
  );

  useEffect(() => {
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, handleClickOutside]);

  if (!open) return null;

  const handleDelete = async () => {
    const theme = localStorage.getItem("theme") || "light";
    const isDark = theme === "dark";

    const confirm = await Swal.fire({
      title: "حذف غذا؟",
      text: "آیا مطمئن هستید که می‌خواهید این غذا را حذف کنید؟",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "حذف",
      cancelButtonText: "انصراف",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      background: isDark ? "#111A2C" : "#E9EFFB",
      color: isDark ? "#E9EFFB" : "#111A2C",
    });

    if (!confirm.isConfirmed) return;

    try {
      await deleteMutation.mutateAsync(id);

      deletePlanItem(date, id);

      await Swal.fire({
        title: "حذف شد",
        text: "غذا با موفقیت حذف شد.",
        icon: "success",
        timer: 1200,
        showConfirmButton: false,
        background: isDark ? "#111A2C" : "#E9EFFB",
        color: isDark ? "#E9EFFB" : "#111A2C",
      });
    } catch {
      await Swal.fire({
        title: "خطا",
        text: "مشکلی پیش آمد. دوباره تلاش کنید.",
        icon: "error",
        timer: 1500,
        showConfirmButton: false,
        background: isDark ? "#111A2C" : "#E9EFFB",
        color: isDark ? "#E9EFFB" : "#111A2C",
      });
    }
  };

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
          setOpen(false);
          handleDelete();
        }}
      >
        <FontAwesomeIcon icon={faTrash} className="w-4 h-4" />
        <span>حذف غذا</span>
      </div>
    </div>
  );
}
