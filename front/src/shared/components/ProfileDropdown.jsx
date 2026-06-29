import { useEffect, useRef } from "react";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPen, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useLogout } from "../../auth/hooks/useLogout";

export default function ProfileDropdown({ open, setOpen, openEditModal }) {
  const dropdownRef = useRef(null);
  const logoutMutation = useLogout();

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, setOpen]);

  if (!open) return null;

  const handleLogout = async () => {
    const theme = localStorage.getItem("theme") || "light";
    const isDark = theme === "dark";

    const confirm = await Swal.fire({
      title: "خروج از حساب؟",
      text: "آیا مطمئن هستید که می‌خواهید خارج شوید؟",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "خروج",
      cancelButtonText: "انصراف",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      background: isDark ? "#111A2C" : "#E9EFFB",
      color: isDark ? "#E9EFFB" : "#111A2C",
    });

    if (!confirm.isConfirmed) return;

    const refreshToken = localStorage.getItem("refresh_token");

    try {
      await logoutMutation.mutateAsync({ refresh_token: refreshToken });

      await Swal.fire({
        title: "خارج شدید",
        text: "با موفقیت از حساب خارج شدید.",
        icon: "success",
        timer: 1200,
        showConfirmButton: false,
        background: isDark ? "#111A2C" : "#E9EFFB",
        color: isDark ? "#E9EFFB" : "#111A2C",
      });
    } catch {
      await Swal.fire({
        title: "خطا",
        text: "مشکلی پیش آمد. دوباره تلاش کنید.",
        icon: "error",
        timer: 1500,
        showConfirmButton: false,
        background: isDark ? "#111A2C" : "#E9EFFB",
        color: isDark ? "#E9EFFB" : "#111A2C",
      });
    }
  };

  return (
    <div
      ref={dropdownRef}
      className="absolute z-50 mt-3 overflow-hidden bg-white border border-gray-200 rounded-lg shadow-xl w-44 -right-13 dark:bg-gray-800 dark:border-gray-700"
    >
      <div
        className="flex items-center gap-2 px-4 pt-2 pb-3 text-gray-700 transition cursor-pointer dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
        onClick={() => {
          openEditModal(true);
          setOpen(false);
        }}
      >
        <FontAwesomeIcon icon={faUserPen} className="w-4 h-4 text-gray-600 dark:text-gray-300" />
        <span>ویرایش پروفایل</span>
      </div>

      <div
        className="flex items-center gap-2 px-4 pt-2 pb-3 text-red-600 transition cursor-pointer dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30"
        onClick={handleLogout}
      >
        <FontAwesomeIcon icon={faRightFromBracket} className="w-4 h-4" />
        <span>خروج</span>
      </div>
    </div>
  );
}
