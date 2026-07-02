import { useState, useMemo } from "react";
import { RecurringDaysField } from "../components/recurring-setting/RecurringDaysField";
import { RecurringDayItem } from "../components/recurring-setting/RecurringDayItem";
import { useRecurringMealPlans } from "../../meal_plan_recurring/hooks/useRecurringMealPlans";
import { useInsertRecurringMealPlans } from "../../meal_plan_recurring/hooks/useInsertRecurringMealPlans";
import Swal from "sweetalert2";

export const RecurringSetting = () => {
  const { data, loading } = useRecurringMealPlans();
  const insertMutation = useInsertRecurringMealPlans();

  const [daysCount, setDaysCount] = useState(0);
  const [userChanged, setUserChanged] = useState(false);
  const [overrides, setOverrides] = useState({});

  const effectiveDaysCount = userChanged
    ? daysCount
    : data && data.length > 0
    ? data.length
    : 0;

  const handleSetDaysCount = (val) => {
    setUserChanged(true);
    setDaysCount(val);
    setOverrides({});
  };

  const recurringDays = useMemo(() => {
    const today = new Date();
    const rows = data || [];

    if (effectiveDaysCount === 0) return [];

    const weekDays = [
      "یکشنبه",
      "دوشنبه",
      "سه‌شنبه",
      "چهارشنبه",
      "پنج‌شنبه",
      "جمعه",
      "شنبه",
    ];

    const dayMs = 1000 * 60 * 60 * 24;
    const len = effectiveDaysCount;

    const cycle = Array(len).fill(null);

    if (!userChanged && rows.length === len) {
      const sorted = [...rows].sort(
        (a, b) => new Date(a.target_date) - new Date(b.target_date)
      );

      sorted.forEach((r) => {
        const target = new Date(r.target_date);
        const diff = Math.floor((target.getTime() - today.getTime()) / dayMs) + 1;
        const idx = ((diff % len) + len) % len;
        cycle[idx] = r.meal_id;
      });
    }

    const list = [];

    for (let i = 0; i < len; i++) {
      const d = new Date();
      d.setDate(today.getDate() + i);

      list.push({
        index: i,
        date: d.toLocaleDateString("fa-IR"),
        weekday: weekDays[d.getDay()],
        meal_id: cycle[i],
      });
    }

    return list;
  }, [data, effectiveDaysCount, userChanged]);

  const handleChangeMealId = (index, mealId) => {
    setOverrides((prev) => ({
      ...prev,
      [index]: mealId,
    }));
  };

  const handleSubmit = async () => {
    const mapping = {};

    recurringDays.forEach((item) => {
      const key = item.index + 1;
      const value =
        overrides[item.index] !== undefined
          ? overrides[item.index]
          : item.meal_id || null;

      mapping[key] = value;
    });

    await insertMutation.mutateAsync({ mapping });

    const theme = localStorage.getItem("theme") || "light";
    const isDark = theme === "dark";

    Swal.fire({
      icon: "success",
      title: "روتین غذایی ذخیره شد",
      text: "تغییرات با موفقیت ثبت شد.",
      timer: 1800,
      showConfirmButton: false,
      background: isDark ? "#111A2C" : "#E9EFFB",
      color: isDark ? "#E9EFFB" : "#111A2C",
    });
  };

  if (loading) {
    return (
      <section className="p-6 mt-10 bg-white border border-gray-200 shadow-sm dark:bg-gray-800 rounded-xl dark:border-gray-700">
        <h2 className="text-xl font-bold text-[#7A2400] dark:text-gray-200 mb-4">
          روتین غذایی
        </h2>
        <RecurringDaysField
          daysCount={effectiveDaysCount}
          setDaysCount={handleSetDaysCount}
        />
        <div className="mt-6 space-y-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-20 p-4 bg-gray-200 rounded-lg dark:bg-gray-700 animate-pulse"
            />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="p-6 mt-10 bg-white border border-gray-200 shadow-sm dark:bg-gray-800 rounded-xl dark:border-gray-700">
      <h2 className="text-xl font-bold text-[#7A2400] dark:text-gray-200 mb-4">
        روتین غذایی
      </h2>

      <RecurringDaysField
        daysCount={effectiveDaysCount}
        setDaysCount={handleSetDaysCount}
      />

      {effectiveDaysCount > 0 && (
        <div className="mt-6 space-y-4">
          {recurringDays.map((item) => (
            <RecurringDayItem
              key={item.index}
              item={item}
              selectedMealId={
                overrides[item.index] !== undefined
                  ? overrides[item.index]
                  : item.meal_id
              }
              onChangeMealId={(mealId) =>
                handleChangeMealId(item.index, mealId)
              }
            />
          ))}
        </div>
      )}

      <div className="flex justify-end mt-6">
        <button
          onClick={handleSubmit}
          className="px-6 pt-2 pb-3 rounded-lg cursor-pointer bg-[#7A2400] text-white font-semibold hover:bg-[#5a1a00] transition"
        >
          ثبت روتین غذایی
        </button>
      </div>
    </section>
  );
};
