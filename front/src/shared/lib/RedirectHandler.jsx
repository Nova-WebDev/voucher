import { useEffect } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { navigateWithRules } from "../utils/navigateWithRules";

export default function RedirectHandler() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const url = new URL(
      window.location.origin + location.pathname + location.search
    );

    const redirect = url.searchParams.get("redirect");
    if (!redirect) return;

    url.searchParams.delete("redirect");
    window.history.replaceState({}, "", url.pathname + url.search);

    navigateWithRules(navigate, redirect);
  }, [location.pathname, location.search, navigate]);

  return <Outlet />;
}
