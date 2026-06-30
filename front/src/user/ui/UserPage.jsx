import { useState } from "react";
import Table from "../../base/ui/Table";
import { userColumns } from "../table/columns";
import { userActions } from "../table/actions";
import { useUsersTableData } from "../hooks/useUsersTableData.js";
import { UserHeader } from "../components/UserHeader.jsx";
import { useBranchesData } from "../../branch/hooks/useBranchesData.js";

import UpdateUserModal from "../components/UpdateUserModal.jsx";

export const UserPage = () => {
  const table = useUsersTableData({
    page: 1,
    limit: 20,
    orderBy: "created_at",
    deorder: true,
    search: "",
  });

  const { branches } = useBranchesData();

  const [openUpdate, setOpenUpdate] = useState(false);

  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div className="h-full p-5">
      <UserHeader branches={branches} />

      <Table
        columns={userColumns}
        actions={userActions({
          onEdit: (row) => {
            setSelectedUser(row);
            setOpenUpdate(true);
          },
        })}
        table={table}
      />

      {openUpdate && selectedUser && (
        <UpdateUserModal
          public_id={selectedUser.public_id}
          user_role={selectedUser.role}
          initialUsername={selectedUser.username}
          initialPhone={selectedUser.phone}
          initialBranchId={selectedUser.branch_id}
          initialBranchRole={selectedUser.branch_role}
          branches={branches}
          onClose={() => setOpenUpdate(false)}
        />
      )}
    </div>
  );
};
