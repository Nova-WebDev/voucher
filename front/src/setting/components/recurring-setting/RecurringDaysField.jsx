export const RecurringDaysField = ({ daysCount, setDaysCount }) => {
  console.log("📌 RecurringDaysField render:", { daysCount });

  return (
    <div className="mb-6">
      <label className="font-medium text-gray-700 dark:text-gray-300">
        روتین چند روزه باشد؟
      </label>

      <input
        type="number"
        min={0}
        value={daysCount || ""}
        onChange={(e) => {
          console.log("🔄 Days count changed:", e.target.value);
          setDaysCount(Number(e.target.value) || 0);
        }}
        placeholder="مثلاً ۱۰"
        className="w-24 px-3 py-2 mr-2 text-gray-800 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-orange-500 dark:focus:ring-sky-600"
      />
    </div>
  );
};
