import { useState, useEffect, useRef } from "react";
import darkFood from "../../../shared/assets/photo/dark_food.png";
import lightFood from "../../../shared/assets/photo/food.png";

export const ImageField = ({ fileRef, fileError }) => {
  const [preview, setPreview] = useState(null);

  const theme = localStorage.getItem("theme") || "light";
  const isDark = theme === "dark";

  const defaultImage = isDark ? darkFood : lightFood;

  const internalRef = useRef(null);

  const inputRef = fileRef ?? internalRef;

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) {
      setPreview(null);
      return;
    }

    const url = URL.createObjectURL(file);
    setPreview(url);
  };

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  return (
    <div className="flex flex-col items-center justify-center">

      <div
        onClick={handleClick}
        className="flex items-center justify-center w-40 h-40 overflow-hidden transition bg-gray-200 border border-gray-300 cursor-pointer  rounded-xl dark:bg-gray-700 dark:border-gray-600 hover:opacity-90"
      >
        <img
          src={preview || defaultImage}
          alt="meal preview"
          className="object-cover w-full h-full"
        />
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
      />

      {fileError && (
        <div className="mt-1 text-sm text-red-600 dark:text-red-400">
          {fileError}
        </div>
      )}
    </div>
  );
};
