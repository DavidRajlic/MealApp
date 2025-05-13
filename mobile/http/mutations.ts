import { useMutation } from "@tanstack/react-query";
import { login, register } from "./api";


export function useRegisterMutation() {
  return useMutation({
    mutationFn: register
  })
}

export function useLoginMutation() {
  return useMutation({
    mutationFn: login
  })
}