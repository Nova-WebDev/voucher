import { useState, useMemo } from "react";
import { RecurringDaysField } from "../components/recurring-setting/RecurringDaysField";
import { RecurringDayItem } from "../components/recurring-setting/RecurringDayItem";

export const RecurringSetting = () => {
  const [daysCount, setDaysCount] = useState(0);

  const recurringDays = useMemo(() => {
    const weekDays = [
      "یکشنبه",
      "دوشنبه",
      "سه‌شنبه",
      "چهارشنبه",
      "پنج‌شنبه",
      "جمعه",
      "شنبه",
    ];

    const today = new Date();
    const list = [];

    for (let i = 0; i < daysCount; i++) {
      const d = new Date();
      d.setDate(today.getDate() + i);

      list.push({
        date: d.toLocaleDateString("fa-IR"),
        weekday: weekDays[d.getDay()],
      });
    }

    return list;
  }, [daysCount]);

  return (
    <section className="p-6 mt-10 bg-white border border-gray-200 shadow-sm dark:bg-gray-800 rounded-xl dark:border-gray-700">
      <h2 className="text-xl font-bold text-[#7A2400] dark:text-gray-200 mb-4">
        روتین غذایی
      </h2>

      <RecurringDaysField daysCount={daysCount} setDaysCount={setDaysCount} />

      {daysCount > 0 && (
        <div className="mt-6 space-y-4">
          {recurringDays.map((item, i) => (
            <RecurringDayItem key={i} item={item} />
          ))}
        </div>
      )}

      <div className="flex justify-end mt-6">
        <button className="px-6 pt-2 pb-3 rounded-lg bg-[#7A2400] text-white font-semibold hover:bg-[#5a1a00] transition">
          ثبت روتین غذایی
        </button>
      </div>
    </section>
  );
};
