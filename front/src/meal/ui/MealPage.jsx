import { useState } from "react";
import CreateMealModal from "../components/CreateMealModal";
import { MealCards } from "../components/MealCards";

export const MealPage = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="h-full p-5">
      <div className="flex items-center justify-between w-full mt-5 mb-5 md:mb-2 md:px-7">
        <button
          onClick={() => setOpen(true)}
          className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md cursor-pointer hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800"
        >
          تعریف غذای جدید
        </button>
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
          <span className="hidden md:block">غذا ها</span>
        </h3>
      </div>
      <MealCards />
      {open && <CreateMealModal onClose={() => setOpen(false)} />}
    </div>
  );
};
