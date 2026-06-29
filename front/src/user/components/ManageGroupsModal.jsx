import { createPortal } from "react-dom";
import { useState } from "react";
import { ModalHeader } from "./ModalHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { useDeleteBranch } from "../../branch/hooks/useDeleteBranch";
import { useUpdateBranch } from "../../branch/hooks/useUpdateBranch";
import { useBranchStore } from "../../branch/store/branchStore";

export const ManageGroupsModal = ({ branches, onClose }) => {
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");

  const deleteBranchMutation = useDeleteBranch();
  const updateBranchMutation = useUpdateBranch();

  const setBranches = useBranchStore((s) => s.setBranches);

  const theme = localStorage.getItem("theme") || "light";
  const isDark = theme === "dark";
  const swalBg = isDark ? "#111A2C" : "#E9EFFB";
  const swalColor = isDark ? "#E9EFFB" : "#111A2C";

  const startEdit = (id, name) => {
    setEditingId(id);
    setEditValue(name);
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "حذف گروه؟",
      text: "آیا مطمئن هستید که می‌خواهید این گروه را حذف کنید؟",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "حذف",
      cancelButtonText: "انصراف",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      background: swalBg,
      color: swalColor,
    });

    if (!confirm.isConfirmed) return;

    try {
      await deleteBranchMutation.mutateAsync({ id });

      const updated = Object.entries(branches)
        .filter(([bid]) => bid !== id)
        .map(([bid, name]) => ({ id: bid, name }));

      setBranches(updated);

      await Swal.fire({
        title: "حذف شد",
        text: "گروه با موفقیت حذف شد.",
        icon: "success",
        timer: 1200,
        showConfirmButton: false,
        background: swalBg,
        color: swalColor,
      });
    } catch {
      await Swal.fire({
        title: "خطا",
        text: "مشکلی پیش آمد.",
        icon: "error",
        timer: 1500,
        showConfirmButton: false,
        background: swalBg,
        color: swalColor,
      });
    }
  };

  const handleSave = async (id) => {
    try {
      await updateBranchMutation.mutateAsync({
        id,
        name: editValue,
      });

      const updated = Object.entries(branches).map(([bid, name]) =>
        bid === id ? { id: bid, name: editValue } : { id: bid, name }
      );

      setBranches(updated);

      setEditingId(null);
      setEditValue("");
    } catch {
      await Swal.fire({
        title: "خطا",
        text: "مشکلی پیش آمد.",
        icon: "error",
        timer: 1500,
        showConfirmButton: false,
        background: swalBg,
        color: swalColor,
      });
    }
  };

  const modal = (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 dark:bg-black/50 backdrop-blur-sm">
      <div
        className="
        w-full max-w-md rounded-lg overflow-hidden shadow-xl
        bg-[#F4F4F5] dark:bg-[#0D1525]
        border border-gray-300 dark:border-gray-700
      "
      >
        <ModalHeader title="مدیریت گروه‌ها" onClose={onClose} />

        <div dir="RTL" className="p-4 space-y-3 overflow-y-auto max-h-80">

          {Object.entries(branches || {}).map(([id, name]) => (
            <div
              key={id}
              className="
                flex items-center justify-between
                bg-white dark:bg-[#111C2E]
                border border-gray-300 dark:border-gray-700
                px-3 py-2 rounded-md
              "
            >
              {editingId === id ? (
                <input
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="
                    flex-1 px-3 py-2 text-sm rounded-md
                    bg-white dark:bg-[#0D1525]
                    text-gray-800 dark:text-gray-100
                    border border-gray-300 dark:border-gray-700
                    focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-blue-600
                  "
                />
              ) : (
                <span className="text-sm text-gray-800 dark:text-gray-100">
                  {name}
                </span>
              )}

              <div className="flex items-center gap-4">

                {editingId === id ? (
                  <button
                    onClick={() => handleSave(id)}
                    className="px-3 py-2 mr-2 text-sm font-medium text-white bg-blue-600 rounded-sm cursor-pointer hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
                  >
                    Save
                  </button>
                ) : (
                  <FontAwesomeIcon
                    icon={faPen}
                    onClick={() => startEdit(id, name)}
                    className="w-4 h-4 text-blue-600 cursor-pointer dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                  />
                )}

                {editingId !== id && (
                  <FontAwesomeIcon
                    icon={faTrash}
                    onClick={() => handleDelete(id)}
                    className="w-4 h-4 text-red-600 cursor-pointer dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
                  />
                )}
              </div>
            </div>
          ))}

        </div>

        <div
          className="
          flex items-center justify-end p-4
          bg-[#F4F4F5] dark:bg-[#0D1525]
        "
        >
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
