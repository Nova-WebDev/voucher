import { useMutation } from "@tanstack/react-query";
import { blockUser } from "../api/userApi";

export function useBlockUser() {
  return useMutation({ mutationFn: blockUser });
}
