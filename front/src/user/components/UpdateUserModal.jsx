import { createPortal } from "react-dom";
import { useState } from "react";
import { ModalHeader } from "./ModalHeader";
import { useUpdateUser } from "../../user/hooks/useUpdateUser";

import { UsernameField } from "./fields/UsernameField";
import { PhoneField } from "./fields/PhoneField";
import { BranchField } from "./fields/BranchField";
import { RoleField } from "./fields/RoleField";

export const UpdateUserModal = ({
  public_id,
  user_role,
  initialUsername,
  initialPhone,
  initialBranchId,
  initialBranchRole,
  branches,
  onClose,
}) => {
  const [username, setUsername] = useState(initialUsername);
  const [phone, setPhone] = useState(initialPhone);
  const [branchId, setBranchId] = useState(initialBranchId);
  const [role, setRole] = useState(initialBranchRole);

  const [usernameError, setUsernameError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const updateMutation = useUpdateUser();

  const validate = () => {
    let ok = true;

    if (!username.trim()) {
      setUsernameError("یوزرنیم نمی‌تواند خالی باشد.");
      ok = false;
    } else {
      setUsernameError("");
    }

    if (!/^[0-9]+$/.test(phone)) {
      setPhoneError("شماره موبایل باید فقط عدد باشد.");
      ok = false;
    } else if (!phone.startsWith("09")) {
      setPhoneError("شماره موبایل باید با 09 شروع شود.");
      ok = false;
    } else if (phone.length !== 11) {
      setPhoneError("شماره موبایل باید 11 رقمی باشد.");
      ok = false;
    } else {
      setPhoneError("");
    }

    return ok;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    const finalRole = role ? role : 1;

    await updateMutation.mutateAsync({
      public_id,
      username,
      phone,
      branch_id: branchId || null,
      branch_role: finalRole,
    });

    onClose();
    window.location.reload();
  };

  const modal = (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 dark:bg-black/50 backdrop-blur-sm">
      <div
        className="
        w-full max-w-md rounded-lg overflow-hidden shadow-xl
        bg-[#F4F4F5] dark:bg-[#0D1525]
        border border-gray-300 dark:border-gray-700
      "
      >
        <ModalHeader title="ویرایش کاربر" onClose={onClose} />

        <div className="p-4 space-y-5" dir="rtl">
          <div>
            <UsernameField value={username} onChange={setUsername} />
            {usernameError && (
              <div className="mt-1 text-sm text-red-600 dark:text-red-400">
                {usernameError}
              </div>
            )}
          </div>

          {user_role !== 20 && (
            <div>
              <PhoneField value={phone} onChange={setPhone} />
              {phoneError && (
                <div className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {phoneError}
                </div>
              )}
            </div>
          )}

          <BranchField
            branches={branches}
            branchId={branchId}
            setBranchId={setBranchId}
          />

          {branchId && <RoleField role={role} setRole={setRole} />}
        </div>

        <div
          className="
          flex items-center justify-end gap-3 p-4
          bg-[#F4F4F5] dark:bg-[#0D1525] mb-2
        "
        >
          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md cursor-pointer hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
          >
            ذخیره تغییرات
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

export default UpdateUserModal;
