import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function ModalHeader({ title, onClose }) {
  return (
    <div className="flex items-center justify-between px-4 py-3 border-b border-gray-300 dark:border-gray-700 bg-[#F4F4F5] dark:bg-[#0D1525]">
      <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">{title}</h2>

      <button
        onClick={onClose}
        className="p-2 text-gray-700 transition rounded-md hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-gray-700"
      >
        <FontAwesomeIcon icon={faXmark} className="w-5 h-5" />
      </button>
    </div>
  );
}
