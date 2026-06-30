import { BranchNameCell, BranchRoleCell } from "./BranchCells";

export const userColumns = [
  {
    label: "نام کاربری",
    orderBy: "username",
    render: (row) => (
      <span className="flex items-center gap-2">
        {row.username}

        {row.role === 20 && (
          <span
            className="
              px-2 py-0.5 relative top-0.5 mx-1
              text-[10px] font-medium leading-none
              rounded-md
              bg-red-100 text-red-700 border border-red-300/40
              dark:bg-blue-900 dark:text-blue-200 dark:border-blue-700/40
            "
            style={{ lineHeight: '1' }}
          >
            Admin
          </span>
        )}
      </span>
    ),
  },

  {
    label: "شماره موبایل",
    orderBy: "phone",
    render: (row) => row.phone,
  },

  {
    label: "گروه",
    orderBy: "branch_id",
    render: (row) => <BranchNameCell branchId={row.branch_id} />,
  },

  {
    label: "نقش کاربر در گروه",
    orderBy: "branch_role",
    render: (row) => (
      <BranchRoleCell
        branchId={row.branch_id}
        branchRole={row.branch_role}
      />
    ),
  },
];
