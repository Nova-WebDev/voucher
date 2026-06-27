import { useQuery } from "@tanstack/react-query";
import { getUsersByPublicIds } from "../api/userApi";

export function useGetUsersByPublicIds(public_ids) {
  return useQuery({
    queryKey: ["users-by-public-ids", public_ids],
    queryFn: () => getUsersByPublicIds(public_ids),
    enabled: !!public_ids?.length,
  });
}
