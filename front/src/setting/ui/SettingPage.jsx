import { RecurringSetting } from "./RecurringSetting"
import { TimeSetting } from "./TimeSetting"

export const SettingPage = () => {
  return (
    <div className="p-4 pt-6 md:p-6 md:pt-8 lg:p-8 lg:pt-10">
      <TimeSetting />
      <RecurringSetting />
    </div>
  )
}
