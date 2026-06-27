import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPen, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

export default function ProfileDropdown({ open, setOpen, openEditModal }) {
  if (!open) return null;

  return (
    <div className="absolute z-50 mt-3 overflow-hidden bg-white border border-gray-200 shadow-xl w-44 -right-13 dark:bg-gray-800 dark:border-gray-700 rounded-xl">
      
      <div
        className="flex items-center gap-2 px-4 py-2 text-gray-700 transition cursor-pointer dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
        onClick={() => {
          openEditModal(true);
          setOpen(false);
        }}
      >
        <FontAwesomeIcon icon={faUserPen} className="w-4 h-4 text-gray-600 dark:text-gray-300" />
        <span>ویرایش پروفایل</span>
      </div>

      <div
        className="flex items-center gap-2 px-4 py-2 text-red-600 transition cursor-pointer dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30"
        onClick={() => {
          console.log("logout clicked");
        }}
      >
        <FontAwesomeIcon icon={faRightFromBracket} className="w-4 h-4" />
        <span>خروج</span>
      </div>

    </div>
  );
}
