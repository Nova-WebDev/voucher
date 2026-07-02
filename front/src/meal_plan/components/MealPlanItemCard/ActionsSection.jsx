import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils, faUsers, faCircleXmark } from "@fortawesome/free-solid-svg-icons";

import useCheckVoucherExistsCached from "../../../voucher/hooks/useCheckVoucherExistsCached";
import useCreateVoucher from "../../../voucher/hooks/useCreateVoucher";
import useDeleteVoucher from "../../../voucher/hooks/useDeleteVoucher";
import { useVoucherStore } from "../../../voucher/store/voucherStore";

export const ActionsSection = ({
  meal_plan_id,
  canReserve,
  hasBranch,
  setOpenReserveMembers,
}) => {
  const { exists } = useCheckVoucherExistsCached(meal_plan_id);

  const createMutation = useCreateVoucher();
  const deleteMutation = useDeleteVoucher();
  const setVoucher = useVoucherStore((s) => s.setVoucher);

  const handleCreate = () => {
    createMutation.mutate(
      { meal_plan_id },
      {
        onSuccess: () => {
          setVoucher(meal_plan_id, true);
        },
      }
    );
  };

  const handleDelete = () => {
    deleteMutation.mutate(
      { meal_plan_id },
      {
        onSuccess: () => {
          setVoucher(meal_plan_id, false);
        },
      }
    );
  };

  const isReserved = exists === true;

  const mainButtonDisabled = !canReserve;

  const mainButtonClass = mainButtonDisabled
    ? "bg-gray-400 text-gray-200 cursor-not-allowed opacity-60"
    : isReserved
    ? "bg-red-600 text-white hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 cursor-pointer"
    : "bg-green-700 text-white hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-700 cursor-pointer";

  return (
    <div className="flex flex-col justify-end w-full gap-3 mt-4 md:gap-2 md:flex-row md:w-auto">
      <button
        disabled={mainButtonDisabled}
        onClick={() => {
          if (!canReserve) return;
          if (isReserved) handleDelete();
          else handleCreate();
        }}
        className={`
          flex items-center justify-center w-full gap-2 pt-2 pb-3 pl-5 pr-4 
          text-sm font-semibold rounded-md shadow-md md:w-auto
          ${mainButtonClass}
        `}
      >
        <FontAwesomeIcon
          icon={isReserved ? faCircleXmark : faUtensils}
          className="w-4 h-4"
        />
        {isReserved ? "لغو رزرو غذا" : "ثبت رزرو غذا"}
      </button>

      {hasBranch && (
        <button
          disabled={!canReserve}
          onClick={() => canReserve && setOpenReserveMembers(true)}
          className={`
            flex items-center justify-center w-full gap-2 pt-2 pb-3 pl-5 pr-4 
            text-sm font-semibold rounded-md shadow-md md:w-auto
            ${
              canReserve
                ? "bg-blue-700 text-white hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 cursor-pointer"
                : "bg-gray-400 text-gray-200 cursor-not-allowed opacity-60"
            }
          `}
        >
          <FontAwesomeIcon icon={faUsers} className="w-4 h-4" />
          رزرو برای اعضا
        </button>
      )}
    </div>
  );
};
