import { Outlet } from "react-router-dom";
import Loader from "../../base/loading/Loader";
import { useGetMyProfile } from "../../user/hooks/useGetMyProfile";
import { useProfileStore } from "../../user/store/profileStore";
import { useEffect } from "react";

export const DataSetter = () => {
  const { data, isLoading, error } = useGetMyProfile();
  const setProfile = useProfileStore((s) => s.setProfile);

  useEffect(() => {
    if (data?.data) {
      setProfile(data.data);
    }
  }, [data, setProfile]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="bg-red-100 border border-red-500 text-red-700 font-bold text-lg rounded-lg px-6 py-4 text-center shadow-md">
          خطا در دریافت پروفایل
        </div>
      </div>
    );
  }

  return <Outlet />;
};
