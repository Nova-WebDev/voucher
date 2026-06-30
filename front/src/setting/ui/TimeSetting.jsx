import { TimeSettingCard } from "../components/time-setting/TimeSettingCard";

export const TimeSetting = () => {
  const weekDays = [
    "شنبه",
    "یکشنبه",
    "دوشنبه",
    "سه‌شنبه",
    "چهارشنبه",
    "پنج‌شنبه",
    "جمعه",
  ];

  return (
    <section className="p-6 bg-white border border-gray-200 shadow-sm dark:bg-gray-800 rounded-xl dark:border-gray-700">
      <h2 className="text-xl font-bold text-[#7A2400] dark:text-gray-200 mb-4">
        زمان‌بندی انتخاب غذا
      </h2>

      <div className="space-y-4">
        {weekDays.map((day, i) => (
          <TimeSettingCard key={i} dayName={day} />
        ))}
      </div>

      <div className="flex justify-end mt-6">
        <button className="px-6 pt-2 pb-3 rounded-lg bg-[#7A2400] text-white font-semibold hover:bg-[#5a1a00] transition">
          ثبت تغییرات زمان‌بندی
        </button>
      </div>
    </section>
  );
};
