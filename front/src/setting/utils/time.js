export function utcToTehran(utcStr) {
  if (!utcStr) return "";
  const [h, m, s] = utcStr.split(":").map(Number);
  const base = new Date(Date.UTC(2000, 0, 1, h, m, s || 0));
  const tehran = new Date(
    base.toLocaleString("en-US", { timeZone: "Asia/Tehran" })
  );
  return tehran.toTimeString().slice(0, 5);
}

export function tehranToUtc(localStr) {
  if (!localStr) return "";
  const [h, m] = localStr.split(":").map(Number);
  const local = new Date(2000, 0, 1, h, m);
  const utc = new Date(
    local.toLocaleString("en-US", { timeZone: "UTC" })
  );
  return utc.toTimeString().slice(0, 5);
}
