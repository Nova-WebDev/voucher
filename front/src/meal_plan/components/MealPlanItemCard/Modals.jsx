import ReserveMembersModal from "../ReserveMembersModal";
import EditMealPlanModal from "../EditMealPlanModal";

export const Modals = ({
  openReserveMembers,
  openEditModal,
  setOpenReserveMembers,
  setOpenEditModal,
  id,
  date,
  meal_id,
}) => {
  return (
    <>
      {openReserveMembers && (
        <ReserveMembersModal
          id={id}
          onClose={() => setOpenReserveMembers(false)}
        />
      )}

      {openEditModal && (
        <EditMealPlanModal
          id={id}
          date={date}
          meal_id={meal_id}
          onClose={() => setOpenEditModal(false)}
        />
      )}
    </>
  );
};
