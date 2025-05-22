import { useQuery } from "@tanstack/react-query";
import { getResturant, getResturantReviews, getResturants, getUser, getUserReviews, getUsers } from "./api";

// user
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

// resturant
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

// reviews
export function useUserReviewsQuery(userId: string) {
  return useQuery({
    queryKey: ['userReviews', { userId }],
    queryFn: () => getUserReviews(userId)
  })
}

export function useResturantReviewsQuery(resturantId: string) {
  return useQuery({
    queryKey: ['resturantReviews', { resturantId }],
    queryFn: () => getResturantReviews(resturantId)
  })
}