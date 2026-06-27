export default function EditProfileModal({ open, setOpen }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="p-6 bg-white border border-gray-300 shadow-xl dark:bg-gray-800 w-96 rounded-xl dark:border-gray-700">
        <h2 className="mb-4 text-lg font-bold text-gray-800 dark:text-gray-200">
          ویرایش پروفایل
        </h2>

        <div className="text-gray-600 dark:text-gray-300">
          اینجا فرم ویرایش پروفایل قرار می‌گیرد...
        </div>

        <div className="flex justify-end mt-6">
          <button
            className="px-4 py-2 text-gray-800 bg-gray-200 rounded-lg dark:bg-gray-700 dark:text-gray-200"
            onClick={() => setOpen(false)}
          >
            بستن
          </button>
        </div>
      </div>
    </div>
  );
}
