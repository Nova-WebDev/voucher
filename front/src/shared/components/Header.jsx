import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import profileImg from "../assets/photo/profile.png";
import { useProfileStore } from "../../user/store/profileStore";
import { useTheme } from "../../shared/hooks/useTheme";
import { useState } from "react";
import ProfileDropdown from "./ProfileDropdown";
import EditProfileModal from "./EditProfileModal";

export const Header = ({ isOpen, setIsOpen }) => {
  const username = useProfileStore((s) => s.username);
  const { theme, setTheme } = useTheme();

  const [openDropdown, setOpenDropdown] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <>
      <div className="flex items-center justify-between px-6 py-4 bg-[#7A2400] border-b border-[#5a1a00] dark:bg-gray-900 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <h1 className="hidden text-lg font-bold text-white md:block dark:text-gray-200">
            Hooman Holding
          </h1>

          <button
            className="p-2 text-white md:hidden dark:text-gray-200"
            onClick={() => setIsOpen(!isOpen)}
          >
            <FontAwesomeIcon icon={faBars} className="w-6 h-6" />
          </button>
        </div>

        <div className="flex items-center gap-5">
          <button
            onClick={toggleTheme}
            className="flex items-center justify-center w-10 h-10 text-white transition rounded-full bg-white/20 dark:bg-gray-700 dark:text-gray-200 hover:bg-white/30 dark:hover:bg-gray-600"
          >
            <FontAwesomeIcon
              icon={theme === "dark" ? faSun : faMoon}
              className="w-5 h-5"
            />
          </button>

          <div className="relative">
            <div
              className="flex items-center gap-3 cursor-pointer select-none"
              onClick={() => setOpenDropdown((prev) => !prev)}
            >
              <img
                src={profileImg}
                alt="profile"
                className="object-cover w-10 h-10 border rounded-full border-white/40 dark:border-gray-600"
              />

              <span className="font-semibold text-white dark:text-gray-200">
                {username || "کاربر"}
              </span>
            </div>

            <ProfileDropdown
              open={openDropdown}
              setOpen={setOpenDropdown}
              openEditModal={setOpenEditModal}
            />
          </div>
        </div>
      </div>

      <EditProfileModal open={openEditModal} setOpen={setOpenEditModal} />
    </>
  );
};
