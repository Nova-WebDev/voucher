// fields/RoleField.jsx

export const RoleField = ({ role, setRole }) => {
  const selected = Number(role);

  return (
    <div dir="LTR">
      <label className="block mb-2 text-sm font-medium text-right text-gray-700 dark:text-gray-300">
        نقش کاربر در گروه
      </label>

      <div className="flex flex-col gap-3">

        <button
          type="button"
          onClick={() => setRole(1)}
          className={`
            flex items-center justify-between px-4 py-3 rounded-md border transition-all
            ${selected === 1
              ? "border-orange-600 bg-orange-600/10 dark:bg-orange-600/20"
              : "border border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-800"}
          `}
        >
          <span className={`text-sm ${selected === 1 ? "text-gray-900 dark:text-gray-100" : "text-gray-800 dark:text-gray-200"}`}>
            Member
          </span>

          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selected === 1 ? "border-orange-600" : "border-gray-400 dark:border-gray-500"}`}>
            <div className={selected === 1 ? "w-3 h-3 rounded-full bg-orange-600 transition-transform scale-100" : "w-3 h-3 rounded-full transition-transform scale-0"} />
          </div>
        </button>

        <button
          type="button"
          onClick={() => setRole(20)}
          className={`
            flex items-center justify-between px-4 py-3 rounded-md border transition-all
            ${selected === 20
              ? "border-blue-600 bg-blue-600/10 dark:bg-blue-600/20"
              : "border border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-800"}
          `}
        >
          <span className={`text-sm ${selected === 20 ? "text-gray-900 dark:text-gray-100" : "text-gray-800 dark:text-gray-200"}`}>
            Leader
          </span>

          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selected === 20 ? "border-blue-600" : "border-gray-400 dark:border-gray-500"}`}>
            <div className={selected === 20 ? "w-3 h-3 rounded-full bg-blue-600 transition-transform scale-100" : "w-3 h-3 rounded-full transition-transform scale-0"} />
          </div>
        </button>

      </div>
    </div>
  );
};

export default RoleField;
