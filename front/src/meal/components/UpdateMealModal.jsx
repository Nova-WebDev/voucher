import { createPortal } from "react-dom";
import { useState, useRef } from "react";
import { ModalHeader } from "../components/ModalHeader";
import { useUpdateMeal } from "../hooks/useUpdateMeal";
import { UpdateImageField } from "./fields/UpdateImageField";
import { UpdateTitleField } from "./fields/UpdateTitleField";
import { UpdateDescriptionField } from "./fields/UpdateDescriptionField";
import { useMealStore } from "../store/mealStore";

export const UpdateMealModal = ({ meal, initialImage, onClose }) => {
  const [title, setTitle] = useState(meal.title);
  const [description, setDescription] = useState(meal.description || "");

  const fileRef = useRef(null);
  const [titleError, setTitleError] = useState("");

  const updateMealMutation = useUpdateMeal();
  const updateMeal = useMealStore((s) => s.updateMeal);

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

    const payload = {
      meal_id: meal.id,
      title,
      description,
    };

    if (file) {
      payload.file = file;
    }

    const result = await updateMealMutation.mutateAsync(payload);
    updateMeal(result.data);

    onClose();
  };

  const modal = (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 dark:bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-lg overflow-hidden shadow-xl bg-[#F4F4F5] dark:bg-[#0D1525] border border-gray-300 dark:border-gray-700">

        <ModalHeader title="ویرایش غذا" onClose={onClose} />

        <div className="p-4 space-y-5" dir="rtl">
          <UpdateImageField initialImage={initialImage} fileRef={fileRef} />
          <UpdateTitleField
            title={title}
            setTitle={setTitle}
            titleError={titleError}
          />
          <UpdateDescriptionField
            description={description}
            setDescription={setDescription}
          />
        </div>

        <div className="flex items-center justify-end gap-3 p-4 bg-[#F4F4F5] dark:bg-[#0D1525] mb-2">
          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
          >
            ذخیره تغییرات
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
