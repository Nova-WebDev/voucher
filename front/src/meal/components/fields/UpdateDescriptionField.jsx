export const UpdateDescriptionField = ({ description, setDescription }) => {
  return (
    <div>
      <label className="block mb-1 text-sm text-gray-700 dark:text-white">
        توضیحات
      </label>

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full h-24 p-2 text-sm bg-gray-100 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-sky-600"
      />
    </div>
  );
};
