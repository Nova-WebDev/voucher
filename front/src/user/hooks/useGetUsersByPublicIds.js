import { useEffect } from "react";
import { getUsersByPublicIds } from "../api/userApi";
import { useUsersStore } from "../store/useUsersStore";

export function useGetUsersByPublicIds(public_ids) {
  const usersMap = useUsersStore((state) => state.users);
  const upsertUser = useUsersStore((state) => state.upsertUser);

  const allExistInStore =
    Array.isArray(public_ids) &&
    public_ids.length > 0 &&
    public_ids.every((id) => usersMap[id]);

  useEffect(() => {
    if (!public_ids || public_ids.length === 0) return;
    if (allExistInStore) return;

    getUsersByPublicIds(public_ids).then((res) => {
      res.data.forEach((user) => {
        upsertUser(user);
      });
    });
  }, [public_ids, allExistInStore, upsertUser]);

  const users = Array.isArray(public_ids)
    ? public_ids.map((id) => usersMap[id] || null)
    : [];

  return { users };
}
