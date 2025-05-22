import { useQuery } from "@tanstack/react-query";
import { getResturant, getResturants, getReviews, getUser, getUsers, ReviewsSearchParams } from "./api";

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
export function useReviewsQuery(reviewsSearchParams: ReviewsSearchParams) {
  return useQuery({
    queryKey: ['reviews', reviewsSearchParams],
    queryFn: () => getReviews(reviewsSearchParams)
  })
}