import { useUser } from "../context/UserContext";
import { Resturant as Restaurant, Review, ReviewShortened, User } from "../util/types";
import { deleteF, get, post, put } from "./fetch";

// docs: https://mealapp-psnv.onrender.com/api-docs/

// RESTURANT
export function getResturants() {
  return get<Restaurant[]>("/restaurants")
}

export function getResturant(id: string) {
  return get<Restaurant[]>(`/restaurants/${id}`)
}

// USERS
export function getUsers() {
 return get<User[]>("/users")
}

export function getUser(id: string) {
  return get<User>(`/users/${id}`)
}

export type LoginProps = {
  email: string,
  password: string
}

export function login(body: LoginProps) {
  return post<{token: string, user: User}>("/users/login", body)
}

export type RegisterProps = {
  "name": "string",
  "email": "string",
  "password": "string",
}

export function register(body: RegisterProps) {
  return post<User>("/users/register", {
    ...body,
    confirm: body.password
  })
}

// REVIEWS
export type ReviewsSearchParams = {
  user?: string,
  restaurant?: string
}

export function getReviews(reviewsSearchParams: ReviewsSearchParams) {
  return get<Review[]>(`/reviews?${new URLSearchParams(reviewsSearchParams)}`)
}

export type PostReviewBody = {
  "user": string,
  "restaurant": string,
  "rating": number,
  "comment": string
}

export function postReview(token: string, body: PostReviewBody) {
  return post<ReviewShortened>("/reviews", body, token)
}

export type PutReviewBody = {
  "rating": number,
  "comment": string
}

export function updateReview(reviewId: string, body: PutReviewBody) {
  return put<Review>(`/reviews/${reviewId}`, body)
}

export type DeleteReviewResponse = {
  message: string,
  deletedReview: ReviewShortened
}

export function deleteReview(reviewId: string) {
  return deleteF<DeleteReviewResponse>(`/reviews/${reviewId}`)
}