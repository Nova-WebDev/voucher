import { useState } from "react";
import { useProfileStore } from "../../user/store/profileStore";
import { useUpdateMyName } from "../../user/hooks/useUpdateMyName";

export default function EditProfileModal({ open, setOpen }) {
  const profile = useProfileStore((s) => s);
  const setProfile = useProfileStore((s) => s.setProfile);

  const [name, setName] = useState("");

  const updateNameMutation = useUpdateMyName();

  if (!open) return null;

  if (open && name === "" && profile.username) {
    setName(profile.username);
  }

  const handleSave = () => {
    updateNameMutation.mutate(name, {
      onSuccess: () => {
        setProfile({ ...profile, username: name });
        setOpen(false);
      },
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="p-6 bg-white border border-gray-300 shadow-xl dark:bg-gray-800 w-96 rounded-xl dark:border-gray-700">
        <h2 className="mb-4 text-lg font-bold text-gray-800 dark:text-gray-200">
          ویرایش پروفایل
        </h2>

        <div className="flex flex-col gap-3">
          <label className="text-sm text-gray-700 dark:text-gray-300">
            نام کاربری
          </label>

          <input
            type="text"
            className="w-full px-3 py-2 text-gray-800 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-600"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          {updateNameMutation.isError && (
            <div className="mt-1 text-sm text-red-600">
              خطا در ذخیره‌سازی
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            className="px-4 pt-2 pb-3 text-gray-800 bg-gray-200 rounded-lg dark:bg-gray-700 dark:text-gray-200"
            onClick={() => setOpen(false)}
          >
            بستن
          </button>

          <button
            className="px-4 pt-2 pb-3 text-white transition bg-orange-600 rounded-lg hover:bg-orange-700 disabled:opacity-50"
            onClick={handleSave}
            disabled={updateNameMutation.isPending}
          >
            {updateNameMutation.isPending ? "در حال ذخیره..." : "ذخیره"}
          </button>
        </div>
      </div>
    </div>
  );
}
