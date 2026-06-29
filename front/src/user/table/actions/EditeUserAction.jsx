import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

const EditeUserAction = ({ row, onEdit }) => {
  return (
    <button
      onClick={() => onEdit(row)}
      className="flex items-center justify-center w-full gap-2 py-2 pl-5 pr-3 text-sm text-white bg-blue-600 rounded-md cursor-pointer md:w-auto hover:bg-blue-700"
    >
      <FontAwesomeIcon icon={faPen} />
      Edit
    </button>
  );
};

export default EditeUserAction;
