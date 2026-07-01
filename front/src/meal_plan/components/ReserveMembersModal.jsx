import { createPortal } from "react-dom";
import ModalHeader from "./ModalHeader";

export default function ReserveMembersModal({ id, date, meal_id, onClose }) {
  const modal = (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-lg overflow-hidden shadow-xl bg-[#F4F4F5] dark:bg-[#0D1525] border border-gray-300 dark:border-gray-700">

        <ModalHeader title="رزرو برای اعضا" onClose={onClose} />

        <div className="p-4 text-right text-gray-700 dark:text-gray-300">
          <p>رزرو برای اعضا در تاریخ: {date}</p>
          <p className="mt-2">Meal ID: {meal_id}</p>
          <p className="mt-2">Plan ID: {id}</p>
        </div>

        <div className="flex items-center justify-end gap-3 p-4 bg-[#F4F4F5] dark:bg-[#0D1525] mb-2">
          <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800">
            ادامه رزرو
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
          >
            بستن
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}
