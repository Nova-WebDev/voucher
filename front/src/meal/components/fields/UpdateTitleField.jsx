export const UpdateTitleField = ({ title, setTitle, titleError }) => {
  return (
    <div>
      <label className="block mb-1 text-sm text-gray-700 dark:text-white">
        نام غذا
      </label>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 text-sm bg-gray-100 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-sky-600"
      />

      {titleError && (
        <div className="mt-1 text-sm text-red-600 dark:text-red-400">
          {titleError}
        </div>
      )}
    </div>
  );
};
