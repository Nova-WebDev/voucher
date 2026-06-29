import { useState } from "react";
import { CreateGroupModal } from "./CreateGroupModal";
import { ManageGroupsModal } from "./ManageGroupsModal.jsx";
import { CreateUserModal } from "./CreateUserModal.jsx";

export const UserHeader = ({ branches }) => {
  const [openGroupModal, setOpenGroupModal] = useState(false);
  const [openManageModal, setOpenManageModal] = useState(false);
  const [openUserModal, setOpenUserModal] = useState(false);

  return (
    <div className="flex items-center justify-between w-full mt-5 mb-5 md:mb-2 md:px-7">
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => setOpenGroupModal(true)}
          className="px-4 pt-2 pb-3 text-sm font-medium text-white transition bg-orange-600 rounded-md cursor-pointer hover:bg-orange-700 dark:bg-orange-700 dark:hover:bg-orange-800 whitespace-nowrap"
        >
          تعریف گروه
        </button>

        <button
          onClick={() => setOpenManageModal(true)}
          className="px-4 pt-2 pb-3 text-sm font-medium text-white transition bg-green-600 rounded-md cursor-pointer hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 whitespace-nowrap"
        >
          مدیریت گروه
        </button>

        <button
          onClick={() => setOpenUserModal(true)}
          className="px-4 pt-2 pb-3 text-sm font-medium text-white transition bg-blue-600 rounded-md cursor-pointer hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 whitespace-nowrap"
        >
          تعریف کاربر جدید
        </button>
      </div>

      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
        <span className="hidden md:block">کاربران</span>
      </h3>

      {openGroupModal && (
        <CreateGroupModal onClose={() => setOpenGroupModal(false)} />
      )}

      {openManageModal && (
        <ManageGroupsModal
          branches={branches}
          onClose={() => setOpenManageModal(false)}
        />
      )}

      {openUserModal && (
        <CreateUserModal
          branches={branches}
          onClose={() => setOpenUserModal(false)}
        />
      )}
    </div>
  );
};
