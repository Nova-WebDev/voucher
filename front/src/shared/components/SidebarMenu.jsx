import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBowlFood,
  faListCheck,
  faGear,
  faTicket,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import Separator from "../../base/ui/Separator";
import { useProfileStore } from "../../user/store/profileStore";

export const SidebarMenu = () => {
  const role = useProfileStore((s) => s.role);
  const branch_role = useProfileStore((s) => s.branch_role);

  const menu = [
    {
      to: "/voucher",
      label: "ژتن‌ها و گزارش‌ها",
      icon: faTicket,
      visible: role === 20 || branch_role === 20,
    },
    {
      to: "/meals",
      label: "تعریف غذاها",
      icon: faListCheck,
      visible: role === 20,
    },
    {
      to: "/users",
      label: "مدیریت کاربران",
      icon: faUsers,
      visible: role === 20,
    },
    {
      to: "/meal-plans",
      label: "رزرو غذا",
      icon: faBowlFood,
      visible: true,
    },
    {
      to: "/setting",
      label: "تنظیمات",
      icon: faGear,
      visible: role === 20,
    },
  ];

  return (
    <div className="w-full h-full bg-[#F4F4F5] dark:bg-[#111A2C] border-l border-gray-300 dark:border-gray-700 pt-6 px-3">

      <div className="pr-1 mb-5 mr-2 text-lg font-bold tracking-wide text-gray-700 dark:text-gray-300">
        منوی اصلی
      </div>

      <Separator width="90%" />

      <div className="flex flex-col gap-2 mt-3">
        {menu
          .filter((item) => item.visible)
          .map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `
                flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition
                text-gray-800 dark:text-gray-200
                hover:bg-gray-200 dark:hover:bg-gray-700
                ${isActive ? "bg-orange-200 text-gray-700 hover:bg-orange-200 dark:bg-gray-700 font-bold" : ""}
                `
              }
            >
              <FontAwesomeIcon icon={item.icon} className="w-5 h-5" />
              <span>{item.label}</span>
            </NavLink>
          ))}
      </div>
    </div>
  );
};
