import { Resturant as Restaurant, ResturantReviews, ReviewShortened, UpdateReviewResponse, User, UserReviews } from "../util/types";
import { deleteF, get, post, put } from "./fetch";

// docs: https://mealapp-psnv.onrender.com/api-docs/

// RESTURANT
export function getResturants() {
  return get<Restaurant[]>("/restaurants")
}

export function getResturant(id: string) {
  return get<Restaurant>(`/restaurants/${id}`)
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
export function getUserReviews(userId: string) {
  return get<UserReviews[]>(`/users/review/${userId}`)
}

export function getResturantReviews(resturantId: string) {
  return get<ResturantReviews[]>(`/restaurants/review/${resturantId}`)
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
  return put<UpdateReviewResponse>(`/reviews/${reviewId}`, body)
}

export type DeleteReviewResponse = {
  message: string,
  deletedReview: ReviewShortened
}

export function deleteReview(reviewId: string) {
  return deleteF<DeleteReviewResponse>(`/reviews/${reviewId}`)
}