export const RecurringDayItem = ({ item }) => {
  return (
    <div className="p-4 border border-gray-200 rounded-lg dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
      <div className="mb-2 font-semibold text-gray-800 dark:text-gray-200">
        {item.weekday} — {item.date}
      </div>

      <select className="w-full px-4 py-2 text-gray-800 bg-white border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200">
        <option>انتخاب غذا...</option>
      </select>
    </div>
  );
};
