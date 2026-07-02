import { useEffect, useRef, useState, useMemo } from "react";
import { createPortal } from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import useBranchTeam from "../../user/hooks/useBranchTeam";
import useBranchVouchers from "../../voucher/hooks/useBranchVouchers";
import useCreateVoucherBranch from "../../voucher/hooks/useCreateVoucherBranch";
import useDeleteVoucherBranch from "../../voucher/hooks/useDeleteVoucherBranch";

import { useProfileStore } from "../../user/store/profileStore";
import { getUsersByPublicIds } from "../../user/api/userApi";

import ModalHeader from "./ModalHeader";

export default function ReserveMembersModal({ id, onClose }) {
  const branch_id = useProfileStore((s) => s.branch_id);
  const myPublicId = useProfileStore((s) => s.public_id);

  const { data: teamData } = useBranchTeam(branch_id);
  const { data: voucherData } = useBranchVouchers(id);

  const createMutation = useCreateVoucherBranch();
  const deleteMutation = useDeleteVoucherBranch();

  const modalRef = useRef(null);

  const [search, setSearch] = useState("");
  const [teamUsers, setTeamUsers] = useState([]);
  const [members, setMembers] = useState({});
  const oldList = useMemo(() => {
    return extractReservedPublicIds(voucherData).filter(
      (pid) => pid !== myPublicId,
    );
  }, [voucherData, myPublicId]);

  const teamPublicIds = useMemo(() => teamData?.public_ids ?? [], [teamData]);
  useEffect(() => {
    if (teamPublicIds.length > 0) {
      getUsersByPublicIds(teamPublicIds).then((res) => {
        const users = res.data || [];
        setTeamUsers(users);

        const obj = {};
        users.forEach((u) => {
          obj[u.public_id] = false;
        });
        setMembers(obj);
      });
    }
  }, [teamPublicIds]);

  function extractReservedPublicIds(vData) {
    if (!vData) return [];

    if (Array.isArray(vData.public_ids)) {
      return vData.public_ids.filter(Boolean);
    }

    if (Array.isArray(vData.users)) {
      return vData.users
        .map((u) => u.public_id || u.user_public_id)
        .filter(Boolean);
    }

    if (Array.isArray(vData)) {
      return vData.map((r) => r.user_public_id || r.public_id).filter(Boolean);
    }

    const maybe = vData.user_public_id || vData.public_id || vData.id;
    return maybe ? [maybe] : [];
  }

  useEffect(() => {
    const reservedIds = extractReservedPublicIds(voucherData).filter(
      (pid) => pid !== myPublicId,
    );

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMembers((prev) => {
      let base = { ...prev };
      if (Object.keys(base).length === 0 && teamUsers.length > 0) {
        teamUsers.forEach((u) => {
          base[u.public_id] = false;
        });
      }

      if (Object.keys(base).length === 0) {
        reservedIds.forEach((id) => {
          base[id] = true;
        });
        return base;
      }

      const updated = { ...base };
      reservedIds.forEach((id) => {
        updated[id] = true;
      });

      return updated;
    });
  }, [voucherData, myPublicId, teamUsers]);

  useEffect(() => {
    function outside(e) {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", outside);
    return () => document.removeEventListener("mousedown", outside);
  }, [onClose]);

  if (teamUsers.length === 0 || Object.keys(members).length === 0) {
    return createPortal(
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
        <div className="text-lg text-white">در حال بارگذاری...</div>
      </div>,
      document.body,
    );
  }

  const filteredUsers = teamUsers.filter((u) =>
    (u.username || "").toLowerCase().includes(search.toLowerCase()),
  );

  const toggleMember = (id) => {
    setMembers((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleSubmit = async () => {
    const newList = Object.keys(members).filter((id) => members[id]);

    const added = newList.filter((x) => !oldList.includes(x));
    const removed = oldList.filter((x) => !newList.includes(x));

    try {
      if (added.length > 0) {
        await createMutation.mutateAsync({
          meal_plan_id: id,
          public_ids: added,
        });
      }

      if (removed.length > 0) {
        await deleteMutation.mutateAsync({
          meal_plan_id: id,
          public_ids: removed,
        });
      }

      onClose();
    } catch (err) {
      console.error("submit error:", err);
    }
  };

  const modal = (
    <div
      dir="RTL"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      style={{ pointerEvents: "auto" }}
    >
      <div
        ref={modalRef}
        className="w-full max-w-md rounded-xl overflow-hidden shadow-2xl bg-[#F4F4F5] dark:bg-[#0D1525] border border-gray-300 dark:border-gray-700 animate-[fadeIn_0.15s_ease-out]"
        style={{ pointerEvents: "auto" }}
      >
        <ModalHeader title="رزرو برای اعضا" onClose={onClose} />

        <div className="p-4">
          <div className="mb-3 flex items-center gap-2 bg-white dark:bg-[#111C2E] border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2">
            <FontAwesomeIcon
              icon={faSearch}
              className="w-4 h-4 text-gray-500"
            />
            <input
              placeholder="جستجو بر اساس نام..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full text-sm text-gray-700 bg-transparent dark:text-gray-200 focus:outline-none"
            />
          </div>

          <div className="overflow-y-auto border border-gray-300 rounded-lg max-h-64 dark:border-gray-700">
            {filteredUsers.length === 0 ? (
              <div className="p-4 text-sm text-gray-500 dark:text-gray-400">
                موردی یافت نشد
              </div>
            ) : (
              filteredUsers.map((user) => {
                if (user.public_id === myPublicId) return null;
                const isChecked = !!members[user.public_id];
                return (
                  <div
                    key={user.public_id}
                    onClick={() => toggleMember(user.public_id)}
                    className={`
                      px-4 py-3 flex items-center justify-between cursor-pointer text-sm
                      transition-all duration-150
                      ${
                        isChecked
                          ? "bg-orange-200 dark:bg-blue-900 text-gray-900 dark:text-white"
                          : "text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-[#1a2336]"
                      }
                    `}
                  >
                    <span className="font-medium">{user.username}</span>
                    <div
                      className={`
                        w-3 h-3 rounded-full transition-all
                        ${
                          isChecked
                            ? "bg-orange-600 dark:bg-blue-400"
                            : "bg-gray-400 dark:bg-gray-600"
                        }
                      `}
                    ></div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        <div className="flex items-center  gap-2 p-4 bg-[#F4F4F5] dark:bg-[#0D1525]">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
          >
            بستن
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-sm font-medium text-white bg-orange-600 rounded-lg hover:bg-orange-700 dark:bg-blue-700 dark:hover:bg-blue-800"
          >
            ثبت تغییرات
          </button>
          
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}
