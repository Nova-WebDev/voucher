import { useState } from "react";
import AddMealPlanModal from "./AddMealPlanModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useProfileStore } from "../../user/store/profileStore";

export const MealPlanFooter = ({ selectedDate }) => {
  const [open, setOpen] = useState(false);

  const role = useProfileStore((s) => s.role);

  if (role !== 20) return null;

  const todayIso = new Date().toISOString().slice(0, 10);
  const isDisabled = selectedDate <= todayIso;

  return (
    <>
      <div className="flex justify-center my-7">
        <button
          disabled={isDisabled}
          onClick={() => setOpen(true)}
          className={`
            px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition
            ${isDisabled 
              ? "bg-gray-400 text-gray-200 cursor-not-allowed opacity-60" 
              : "bg-purple-600 text-white hover:bg-purple-700"
            }
          `}
        >
          <FontAwesomeIcon icon={faPlus} className="w-4 h-4" />
          افزودن غذای جدید
        </button>
      </div>

      {open && (
        <AddMealPlanModal
          date={selectedDate}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
};
