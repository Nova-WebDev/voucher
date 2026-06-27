import { useMutation } from "@tanstack/react-query";
import { updateUser } from "../api/userApi";

export function useUpdateUser() {
  return useMutation({ mutationFn: updateUser });
}
