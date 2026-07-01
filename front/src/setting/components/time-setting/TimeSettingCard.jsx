import { BeforeDaysField } from "./BeforeDaysField";
import { UntilTimeField } from "./UntilTimeField";

export const TimeSettingCard = ({
  dayName,
  offsetValue,
  timeValue,
  onChangeOffset,
  onChangeTime,
}) => {
  return (
    <div className="p-4 border border-gray-200 rounded-lg dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
      <div className="mb-3 font-semibold text-gray-800 dark:text-gray-200">
        {dayName}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <BeforeDaysField value={offsetValue} onChange={onChangeOffset} />
        <UntilTimeField value={timeValue} onChange={onChangeTime} />
      </div>
    </div>
  );
};
