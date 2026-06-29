import { createPortal } from "react-dom";
import { useState } from "react";
import { ModalHeader } from "./ModalHeader";
import { useCreateBranch } from "../../branch/hooks/useCreateBranch";
import { useBranchStore } from "../../branch/store/branchStore";

export const CreateGroupModal = ({ onClose }) => {
  const [name, setName] = useState("");
  const createGroup = useCreateBranch();

  const setBranches = useBranchStore((s) => s.setBranches);
  const branches = useBranchStore((s) => s.branches);

  const isPersian = (text) => /^[\u0600-\u06FF]/.test(text);

  const handleSubmit = () => {
    if (!name.trim()) return;

    createGroup.mutate(
      { name },
      {
        onSuccess: (data) => {
          const branch = data.data;

          const updated = {
            ...branches,
            [branch.id]: branch.name,
          };

          setBranches(
            Object.entries(updated).map(([id, name]) => ({
              id,
              name,
            }))
          );

          onClose();
        },
      }
    );
  };

  const modal = (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 dark:bg-black/50 backdrop-blur-sm">
      <div className="
        w-full max-w-md rounded-lg overflow-hidden shadow-xl
        bg-[#F4F4F5] dark:bg-[#0D1525]
        border border-gray-300 dark:border-gray-700
      ">
        <ModalHeader title="تعریف گروه" onClose={onClose} />

        <div className="p-4">
          <label className="block mt-1 mb-3 text-sm font-medium text-right text-gray-700 dark:text-gray-300">
            نام گروه
          </label>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`
              w-full px-3 py-2 text-sm rounded-md border
              border-gray-300 dark:border-gray-700
              bg-white dark:bg-[#111C2E]
              text-gray-800 dark:text-gray-100
              focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-sky-600
              ${isPersian(name) ? "text-right" : "text-left"}
            `}
          />
        </div>

        <div className="
          flex items-center justify-end gap-3 p-4
          bg-[#F4F4F5] dark:bg-[#0D1525] mb-2
        ">
          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-sm font-medium text-white bg-orange-600 rounded-md cursor-pointer hover:bg-orange-700 dark:bg-blue-700 dark:hover:bg-blue-800"
          >
            ثبت
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md cursor-pointer hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
          >
            بستن
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
};
