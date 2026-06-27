import { useMutation } from "@tanstack/react-query";
import { updateMyName } from "../api/userApi";

export function useUpdateMyName() {
  return useMutation({ mutationFn: updateMyName });
}
