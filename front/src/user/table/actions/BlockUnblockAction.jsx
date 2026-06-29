import { useState } from "react";
import { useBlockUser } from "../../../user/hooks/useBlockUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan, faUnlock, faSpinner } from "@fortawesome/free-solid-svg-icons";

export default function BlockUnblockAction({ row }) {
  const mutation = useBlockUser();

  const [blocked, setBlocked] = useState(row.is_blocked);
  const isLoading = mutation.isPending;

  const isAdmin = row.role === 20;

  const handleClick = () => {
    if (isAdmin) return; 

    mutation.mutate(
      {
        public_id: row.public_id,
        block: !blocked,
      },
      {
        onSuccess: () => {
          setBlocked(!blocked);
        },
      }
    );
  };

  return (
    <button
      disabled={isLoading || isAdmin}
      onClick={handleClick}
      className={`
        flex items-center justify-center gap-2
        w-full md:w-auto
        pl-5 pr-3 py-2 rounded-lg text-sm font-medium
        transition-all duration-200 shadow-sm

        ${
          isAdmin
            ? "bg-gray-300 text-gray-700 opacity-80 cursor-not-allowed dark:bg-gray-700 dark:text-gray-300"
            : blocked
            ? "bg-green-600 hover:bg-green-700 text-white cursor-pointer"
            : "bg-red-600 hover:bg-red-700 text-white cursor-pointer"
        }

        ${isLoading ? "opacity-40 cursor-not-allowed" : ""}
      `}
    >
      {isLoading ? (
        <>
          <FontAwesomeIcon icon={faSpinner} spin />
          <span className="animate-pulse">Processing...</span>
        </>
      ) : (
        <>
          <FontAwesomeIcon
            icon={blocked ? faUnlock : faBan}
            className={isAdmin ? "opacity-40" : ""}
          />
          <span className={isAdmin ? "opacity-40" : ""}>
            {isAdmin ? "Block" : blocked ? "Unblock" : "Block"}
          </span>
        </>
      )}
    </button>
  );
}
