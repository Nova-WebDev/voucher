import { useQuery } from "@tanstack/react-query";
import { getUsersPaginated } from "../api/userApi";

export function useGetUsersPaginated(params) {
  return useQuery({
    queryKey: ["users-paginated", params],
    queryFn: () => getUsersPaginated(params),
  });
}
