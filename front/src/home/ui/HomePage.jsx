import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useProfileStore } from "../../user/store/profileStore";

export const HomePage = () => {
  const navigate = useNavigate();

  const role = useProfileStore((s) => s.role);
  const branch_role = useProfileStore((s) => s.branch_role);
  const isSet = useProfileStore((s) => s.isSet);

  useEffect(() => {
    if (!isSet) return;

    if (role === 20 || branch_role === 20) {
      navigate("/voucher");
    } else {
      navigate("/meal-plans");
    }
  }, [isSet, role, branch_role, navigate]);

  return null;
};
