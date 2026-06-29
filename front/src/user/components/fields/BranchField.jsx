import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

export const BranchField = ({ branches, branchId, setBranchId }) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef(null);
  const dropdownRef = useRef(null);
  const [pos, setPos] = useState(null);

  useEffect(() => {
    function outside(e) {
      if (
        ref.current &&
        !ref.current.contains(e.target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", outside);
    return () => document.removeEventListener("mousedown", outside);
  }, []);

  const filtered = Object.entries(branches || {}).filter(([, name]) =>
    name.toLowerCase().includes(search.toLowerCase())
  );

  const toggle = () => {
    setOpen(!open);
    if (!open && ref.current) {
      const r = ref.current.getBoundingClientRect();
      setPos({
        left: r.left,
        top: r.bottom + 6,
        width: r.width,
      });
    }
  };

  return (
    <>
      <div className="relative" ref={ref}>
        <label className="block mb-2 text-sm font-medium text-right text-gray-700 dark:text-gray-300">
          انتخاب گروه (اختیاری)
        </label>

        <button
          onClick={toggle}
          className="
            w-full px-4 py-3 text-sm rounded-md border
            border-gray-300 dark:border-gray-700
            bg-white dark:bg-[#111C2E]
            text-gray-800 dark:text-gray-100
            flex items-center justify-between
            shadow-sm hover:shadow-md transition-all
            focus:outline-none
            focus:ring-2 focus:ring-orange-500 dark:focus:ring-sky-600
          "
        >
          <span className="truncate">
            {branchId ? branches[branchId] : "انتخاب کنید"}
          </span>

          <FontAwesomeIcon
            icon={faChevronDown}
            className={`w-4 h-4 ml-2 transition-transform ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      {open &&
        pos &&
        createPortal(
          <div
            ref={dropdownRef}
            style={{
              position: "fixed",
              left: pos.left,
              top: pos.top,
              width: pos.width,
              zIndex: 99999,
            }}
            className="
              rounded-xl shadow-xl
              bg-white dark:bg-[#111C2E]
              border border-gray-300 dark:border-gray-700
              overflow-hidden
              animate-[fadeIn_0.15s_ease-out]
            "
          >
            <div className="px-3 py-2 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-[#0D1525]">
              <input
                placeholder="جستجو..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="
                  w-full px-3 py-2 text-sm rounded-md border
                  border-gray-300 dark:border-gray-700
                  bg-white dark:bg-[#111C2E]
                  text-gray-800 dark:text-gray-100
                  focus:outline-none
                  focus:ring-2 focus:ring-orange-500 dark:focus:ring-sky-600
                "
              />
            </div>

            <div className="overflow-y-auto max-h-48">
              {filtered.length === 0 ? (
                <div className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                  موردی یافت نشد
                </div>
              ) : (
                filtered.map(([id, name]) => (
                  <div
                    key={id}
                    onClick={() => {
                      setBranchId(id);
                      setOpen(false);
                      setSearch("");
                    }}
                    className={`
                      px-4 py-3 cursor-pointer text-sm flex items-center justify-between
                      transition-all
                      ${
                        branchId === id
                          ? "bg-orange-600 text-white"
                          : "text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-[#1a2336]"
                      }
                    `}
                  >
                    <span className="truncate">{name}</span>

                    {branchId === id && (
                      <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>,
          document.body
        )}
    </>
  );
};
