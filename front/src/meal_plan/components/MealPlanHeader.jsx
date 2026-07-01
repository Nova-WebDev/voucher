import { useState, useMemo, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

export const MealPlanHeader = ({ selectedDate, setSelectedDate }) => {
  const today = useMemo(() => new Date(), []);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  const [weekOffset, setWeekOffset] = useState(0);
  const [mobileOffset, setMobileOffset] = useState(0);

  useEffect(() => {
    const handler = () => {
      const mobile = window.innerWidth < 640;
      setIsMobile(mobile);

      if (mobile) {
        setMobileOffset(0);
      } else {
        setWeekOffset(0);
      }
    };

    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  const pcDays = useMemo(() => {
    const startOfWeek = new Date();
    const weekday = today.getDay();
    const diffToSaturday = (weekday + 1) % 7;
    startOfWeek.setDate(today.getDate() - diffToSaturday + weekOffset * 7);

    const list = [];

    for (let i = 0; i < 7; i++) {
      const d = new Date(startOfWeek);
      d.setDate(startOfWeek.getDate() + i);

      const iso = d.toISOString().split("T")[0];
      const isPast = d < today;
      const isSelected = selectedDate === iso;

      list.push({
        date: d,
        iso,
        label: d.toLocaleDateString("fa-IR"),
        weekday: d.toLocaleDateString("fa-IR", { weekday: "long" }),
        isPast,
        isSelected,
      });
    }

    return list;
  }, [weekOffset, selectedDate, today]);

  const canGoPrevPC = weekOffset > -1;
  const canGoNextPC = weekOffset < 1;

  const goPrevPC = () => {
    if (!canGoPrevPC) return;
    setWeekOffset(weekOffset - 1);
  };

  const goNextPC = () => {
    if (!canGoNextPC) return;
    setWeekOffset(weekOffset + 1);
  };

  const mobileDays = useMemo(() => {
    const list = [];

    for (let i = -1; i <= 1; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i + mobileOffset * 3);

      const iso = d.toISOString().split("T")[0];
      const isPast = d < today;
      const isSelected = selectedDate === iso;

      list.push({
        date: d,
        iso,
        label: d.toLocaleDateString("fa-IR"),
        weekday: d.toLocaleDateString("fa-IR", { weekday: "long" }),
        isPast,
        isSelected,
      });
    }

    return list;
  }, [mobileOffset, selectedDate, today]);

  const canGoPrevMobile = mobileOffset > -2;
  const canGoNextMobile = mobileOffset < 2;

  const goPrevMobile = () => {
    if (!canGoPrevMobile) return;
    setMobileOffset(mobileOffset - 1);
  };

  const goNextMobile = () => {
    if (!canGoNextMobile) return;
    setMobileOffset(mobileOffset + 1);
  };

  const handleSelect = (d) => {
    setSelectedDate(d.iso);
  };

  const visibleDays = isMobile ? mobileDays : pcDays;

  return (
    <div className="pb-6 mb-6">
      <div className="flex items-center justify-between mb-">
        <button
          onClick={isMobile ? goPrevMobile : goPrevPC}
          disabled={isMobile ? !canGoPrevMobile : !canGoPrevPC}
          className={`p-2 transition ${
            (isMobile ? canGoPrevMobile : canGoPrevPC)
              ? "cursor-pointer text-gray-700 dark:text-gray-300"
              : "opacity-40 cursor-not-allowed"
          }`}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>

        <div className="text-lg font-bold text-gray-800 dark:text-gray-200">
          انتخاب روز
        </div>

        <button
          onClick={isMobile ? goNextMobile : goNextPC}
          disabled={isMobile ? !canGoNextMobile : !canGoNextPC}
          className={`p-2 transition ${
            (isMobile ? canGoNextMobile : canGoNextPC)
              ? "cursor-pointer text-gray-700 dark:text-gray-300"
              : "opacity-40 cursor-not-allowed"
          }`}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
      </div>

      <div className={`grid gap-2 ${isMobile ? "grid-cols-3" : "grid-cols-7"}`}>
        {visibleDays.map((d, i) => (
          <div
            key={i}
            onClick={() => handleSelect(d)}
            className={`p-2 rounded-lg text-center cursor-pointer transition shadow-lg ${
              d.isSelected
                ? "bg-orange-600 dark:bg-blue-600 text-white"
                : d.isPast
                ? "bg-gray-300 opacity-50 dark:bg-gray-600 text-gray-700 dark:text-gray-300"
                : "bg-orange-200 dark:bg-[#1b2b49] text-gray-800 dark:text-gray-200"
            }`}
          >
            <div className="text-sm">{d.weekday}</div>
            <div className="text-xs">{d.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
