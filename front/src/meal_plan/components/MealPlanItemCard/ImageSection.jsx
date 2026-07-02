import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";

export const ImageSection = ({ imgLoading, finalImage, meal, canEdit, setOpenDropdown }) => {
  return (
    <>
      {imgLoading ? (
        <div className="w-full h-full bg-gray-300 animate-pulse dark:bg-gray-700 rounded-2xl" />
      ) : (
        <img
          src={finalImage}
          alt={meal.title}
          className="object-cover w-full h-full rounded-2xl"
        />
      )}

      {canEdit && (
        <button
          onClick={() => setOpenDropdown(true)}
          className="absolute p-2 text-white transition-opacity rounded-lg opacity-0 cursor-pointer top-3 right-3 bg-black/40 hover:opacity-100"
        >
          <FontAwesomeIcon icon={faEllipsisVertical} className="w-5 h-5" />
        </button>
      )}
    </>
  );
};
