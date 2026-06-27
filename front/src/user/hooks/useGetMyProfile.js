import { useQuery } from "@tanstack/react-query";
import { getMyProfile } from "../api/userApi";

export function useGetMyProfile() {
  return useQuery({
    queryKey: ["my-profile"],
    queryFn: getMyProfile,
  });
}
