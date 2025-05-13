import { useQuery } from "@tanstack/react-query";
import { getResturant, getResturants, getUser, getUsers } from "./api";

export function useUsersQuery() {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers()
  })
}

export function useUserQuery(id: string) {
  return useQuery({
    queryKey: ["user", { id }],
    queryFn: () => getUser(id)
  })
}

export function useResturantsQuery() {
  return useQuery({
    queryKey: ["resturants"],
    queryFn: () => getResturants()
  })
}

export function useResturantQuery(id: string) {
  return useQuery({
    queryKey: ["resturant", {id}],
    queryFn: () => getResturant(id)
  })
}