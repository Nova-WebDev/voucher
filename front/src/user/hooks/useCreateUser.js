import { useMutation } from "@tanstack/react-query";
import { createUser } from "../api/userApi";

export function useCreateUser() {
  return useMutation({ mutationFn: createUser });
}
