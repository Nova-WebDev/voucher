export const UsernameField = ({ value, onChange }) => {
  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-right text-gray-700 dark:text-gray-300">
        یوزرنیم
      </label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          w-full px-3 py-2 text-sm rounded-md border
          border-gray-300 dark:border-gray-700
          bg-white dark:bg-[#111C2E]
          text-gray-800 dark:text-gray-100
          focus:outline-none
          focus:ring-2 focus:ring-orange-500 dark:focus:ring-sky-600
        "
      />
    </div>
  );
};
