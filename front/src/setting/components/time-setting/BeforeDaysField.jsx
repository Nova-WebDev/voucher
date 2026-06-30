export const BeforeDaysField = () => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-gray-700 dark:text-gray-300">
        چند روز قبل؟
      </label>

      <input
        type="number"
        min={0}
        placeholder="مثلاً ۲ روز قبل"
        className="px-4 py-2 text-gray-800 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-orange-500 dark:focus:ring-sky-600"
      />
    </div>
  );
};
