export const InfoSection = ({ meal }) => {
  return (
    <div>
      <h3 className="text-xl font-extrabold text-right text-gray-800 dark:text-gray-100">
        {meal.title}
      </h3>

      <div className="w-full h-px my-3 bg-gray-200 dark:bg-gray-700" />

      <p className="text-sm leading-relaxed text-right text-gray-600 dark:text-gray-300">
        {meal.description || "—"}
      </p>
    </div>
  );
};
