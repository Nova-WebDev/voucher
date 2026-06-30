import { createPortal } from "react-dom";
import { useState, useRef } from "react";
import { ModalHeader } from "../components/ModalHeader";
import { useCreateMeal } from "../hooks/useCreateMeal";

import { ImageField } from "./fields/ImageField";
import { TitleField } from "./fields/TitleField";
import { DescriptionField } from "./fields/DescriptionField";

import { useMealStore } from "../store/mealStore";

export const CreateMealModal = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const fileRef = useRef(null);

  const [titleError, setTitleError] = useState("");

  const createMealMutation = useCreateMeal();
  const addMeal = useMealStore((s) => s.addMeal);

  const validate = () => {
    let ok = true;

    if (!title.trim()) {
      setTitleError("نام غذا نمی‌تواند خالی باشد.");
      ok = false;
    } else {
      setTitleError("");
    }

    return ok;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    const file = fileRef.current?.files?.[0] || null;

    const result = await createMealMutation.mutateAsync({
      title,
      description,
      file,
    });


    addMeal(result.data);


    onClose();
  };

  const modal = (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 dark:bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-lg overflow-hidden shadow-xl bg-[#F4F4F5] dark:bg-[#0D1525] border border-gray-300 dark:border-gray-700">

        <ModalHeader title="تعریف غذای جدید" onClose={onClose} />

        <div className="p-4 space-y-5" dir="rtl">
          <ImageField fileRef={fileRef} />
          <TitleField title={title} setTitle={setTitle} titleError={titleError} />
          <DescriptionField description={description} setDescription={setDescription} />
        </div>

        <div className="flex items-center justify-end gap-3 p-4 bg-[#F4F4F5] dark:bg-[#0D1525] mb-2">
          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
          >
            ثبت غذا
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
          >
            بستن
          </button>
        </div>

      </div>
    </div>
  );

  return createPortal(modal, document.body);
};

export default CreateMealModal;
