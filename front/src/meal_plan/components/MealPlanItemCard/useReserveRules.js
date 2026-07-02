import { utcToTehran } from "../../../setting/utils/time";

export function useReserveRules(date, policies) {
  const todayIso = new Date().toISOString().slice(0, 10);
  const todayDate = new Date(todayIso);
  const planDate = new Date(date);

  const dayIndexMap = [6, 0, 1, 2, 3, 4, 5];
  const backendIndex = dayIndexMap[planDate.getDay()];
  const policy = policies.find((p) => p.day_index === backendIndex);

  if (!policy) {
    return { canReserve: date > todayIso };
  }

  const allowedDate = new Date(planDate);
  allowedDate.setDate(allowedDate.getDate() - policy.offset_days);

  const cutoffLocal = utcToTehran(policy.cutoff_time);
  const nowLocal = new Date()
    .toLocaleTimeString("en-US", { hour12: false, timeZone: "Asia/Tehran" })
    .slice(0, 5);

  const [ch, cm] = cutoffLocal.split(":").map(Number);
  const [nh, nm] = nowLocal.split(":").map(Number);

  const cutoffMinutes = ch * 60 + cm;
  const nowMinutes = nh * 60 + nm;

  let canReserve;
  if (todayDate < allowedDate) {
    canReserve = true;
  } else if (todayDate > allowedDate) {
    canReserve = false;
  } else {
    canReserve = nowMinutes <= cutoffMinutes;
  }

  return { canReserve };
}
