
export function redirectWithRules(targetUrl) {
  const currentUrl = window.location.pathname + window.location.search;

  const isAuthRoute =
    currentUrl === "/auth" ||
    currentUrl.startsWith("/auth/");

  const isRoot = currentUrl === "/";

  const url = new URL(targetUrl, window.location.origin);

  const hasRedirect = url.searchParams.has("redirect");

  if (isAuthRoute || isRoot) {
    window.location.assign(url.toString());
    return;
  }

  if (hasRedirect) {
    window.location.assign(url.toString());
    return;
  }

  url.searchParams.set("redirect", currentUrl);

  window.location.assign(url.toString());
}
