import { useEffect, useState } from "react";
import { TimeSettingCard } from "../components/time-setting/TimeSettingCard";
import { useTimePolicies } from "../../meal_plan_time_policy/hooks/useTimePolicies";
import { useCreateTimePolicy } from "../../meal_plan_time_policy/hooks/useCreateTimePolicy";
import { useUpdateTimePolicy } from "../../meal_plan_time_policy/hooks/useUpdateTimePolicy";
import { useDeleteTimePolicy } from "../../meal_plan_time_policy/hooks/useDeleteTimePolicy";
import { useMealPlanTimePolicyStore } from "../../meal_plan_time_policy/store/mealPlanTimePolicyStore";
import { tehranToUtc, utcToTehran } from "../utils/time";
import Swal from "sweetalert2";

export const TimeSetting = () => {
  const { items, isLoading } = useTimePolicies();
  const { setItems } = useMealPlanTimePolicyStore();
  const createMutation = useCreateTimePolicy();
  const updateMutation = useUpdateTimePolicy();
  const deleteMutation = useDeleteTimePolicy();

  const [formState, setFormState] = useState(
    Array.from({ length: 7 }, () => ({
      offset_days: "",
      cutoff_time: "",
    }))
  );

  const weekDays = [
    "شنبه",
    "یکشنبه",
    "دوشنبه",
    "سه‌شنبه",
    "چهارشنبه",
    "پنج‌شنبه",
    "جمعه",
  ];

  useEffect(() => {
    if (!items || items.length === 0) return;

    const dayIndexMap = [5, 6, 0, 1, 2, 3, 4];
    const next = Array.from({ length: 7 }, () => ({
      offset_days: "",
      cutoff_time: "",
    }));

    for (let uiIndex = 0; uiIndex < 7; uiIndex++) {
      const backendIndex = dayIndexMap[uiIndex];
      const policy = items.find((p) => p.day_index === backendIndex);

      if (policy) {
        next[uiIndex] = {
          offset_days: String(policy.offset_days ?? ""),
          cutoff_time: utcToTehran(policy.cutoff_time),
        };
      }
    }

    setTimeout(() => {
      setFormState(next);
    }, 0);
  }, [items]);

  const handleChangeOffset = (uiIndex, val) => {
    setFormState((prev) => {
      const next = [...prev];
      next[uiIndex].offset_days = val;
      return next;
    });
  };

  const handleChangeTime = (uiIndex, val) => {
    setFormState((prev) => {
      const next = [...prev];
      next[uiIndex].cutoff_time = val;
      return next;
    });
  };

  const handleSubmit = async () => {
    const dayIndexMap = [5, 6, 0, 1, 2, 3, 4];
    const newItems = [...items];

    for (let uiIndex = 0; uiIndex < 7; uiIndex++) {
      const backendIndex = dayIndexMap[uiIndex];
      const oldPolicy = items.find((p) => p.day_index === backendIndex);
      const { offset_days, cutoff_time } = formState[uiIndex];

      const hasNewData = offset_days !== "" && cutoff_time !== "";
      const hasOldData = !!oldPolicy;

      const newOffsetNum = hasNewData ? Number(offset_days) : null;
      const newTimeUtc = hasNewData ? tehranToUtc(cutoff_time) : null;

      if (!hasOldData && hasNewData) {
        const created = await createMutation.mutateAsync({
          day_index: backendIndex,
          offset_days: newOffsetNum,
          cutoff_time: newTimeUtc,
        });
        newItems.push(created);
        continue;
      }

      if (hasOldData && !hasNewData) {
        await deleteMutation.mutateAsync(oldPolicy.id);
        const idx = newItems.findIndex((p) => p.id === oldPolicy.id);
        if (idx !== -1) newItems.splice(idx, 1);
        continue;
      }

      if (hasOldData && hasNewData) {
        const changed =
          newOffsetNum !== oldPolicy.offset_days ||
          newTimeUtc !== oldPolicy.cutoff_time;

        if (changed) {
          const updated = await updateMutation.mutateAsync({
            day_index: backendIndex,
            offset_days: newOffsetNum,
            cutoff_time: newTimeUtc,
          });

          const idx = newItems.findIndex((p) => p.id === oldPolicy.id);
          if (idx !== -1) newItems[idx] = updated;
        }
      }
    }

    setItems(newItems);

    const theme = localStorage.getItem("theme") || "light";
    const isDark = theme === "dark";

    Swal.fire({
      icon: "success",
      title: "تغییرات ذخیره شد",
      text: "تنظیمات زمان‌بندی با موفقیت ثبت شد.",
      timer: 1800,
      showConfirmButton: false,
      background: isDark ? "#111A2C" : "#E9EFFB",
      color: isDark ? "#E9EFFB" : "#111A2C",
    });
  };

  if (isLoading) {
    return (
      <section className="p-6 bg-white border border-gray-200 shadow-sm dark:bg-gray-800 rounded-xl dark:border-gray-700">
        <h2 className="text-xl font-bold text-[#7A2400] dark:text-gray-200 mb-4">
          زمان‌بندی انتخاب غذا
        </h2>

        <div className="space-y-4">
          {weekDays.map((_, i) => (
            <div
              key={i}
              className="h-24 p-4 bg-gray-200 rounded-lg dark:bg-gray-700 animate-pulse"
            />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="p-6 bg-white border border-gray-200 shadow-sm dark:bg-gray-800 rounded-xl dark:border-gray-700">
      <h2 className="text-xl font-bold text-[#7A2400] dark:text-gray-200 mb-4">
        زمان‌بندی انتخاب غذا
      </h2>

      <div className="space-y-4">
        {weekDays.map((dayName, uiIndex) => (
          <TimeSettingCard
            key={uiIndex}
            dayName={dayName}
            offsetValue={formState[uiIndex].offset_days}
            timeValue={formState[uiIndex].cutoff_time}
            onChangeOffset={(val) => handleChangeOffset(uiIndex, val)}
            onChangeTime={(val) => handleChangeTime(uiIndex, val)}
          />
        ))}
      </div>

      <div className="flex justify-end mt-6">
        <button
          onClick={handleSubmit}
          className="px-6 pt-2 pb-3 cursor-pointer rounded-lg bg-[#7A2400] text-white font-semibold hover:bg-[#5a1a00] transition"
        >
          ثبت تغییرات زمان‌بندی
        </button>
      </div>
    </section>
  );
};
