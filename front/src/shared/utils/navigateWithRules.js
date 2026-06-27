
export function navigateWithRules(navigate, targetUrl) {
  const currentUrl = window.location.pathname + window.location.search;

  const isAuthRoute =
    currentUrl === "/auth" ||
    currentUrl.startsWith("/auth/");

  const isRoot = currentUrl === "/";

  const url = new URL(targetUrl, window.location.origin);

  const hasRedirect = url.searchParams.has("redirect");

  if (isAuthRoute || isRoot) {
    navigate(url.pathname + url.search);
    return;
  }

  if (hasRedirect) {
    navigate(url.pathname + url.search);
    return;
  }

  url.searchParams.set("redirect", currentUrl);

  navigate(url.pathname + url.search);
}
