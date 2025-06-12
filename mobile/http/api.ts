import { BaseReview, Resturant as Restaurant, ResturantReviews, ReviewShortened, UpdateReviewResponse, User, UserReviews } from "../util/types";
import { deleteF, get, post, postFormData, put } from "./fetch";

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

export function Login(body: LoginProps) {
  return post<{token: string, user: User}>("/users/login", body)
}

export type RegisterProps = {
  "name": string,
  "email": string,
  "password": string,
}

export function Register(body: RegisterProps) {
  return post<User>("/users/register", {
    ...body,
    confirm: body.password
  })
}

export type UpdateUser = {
  name?: string,
  email?: string,
  profile_image?: UploadMedia,
}

export function updateUser(token: string, userId: string, body: UpdateUser) {
  const formData = new FormData();
  if(body.name)
    formData.append("name", body.name);
  if(body.email)
    formData.append("email", body.email);
  if(body.profile_image)
    formData.append("profile_image", {
        uri: body.profile_image.uri,
        name: body.profile_image.name,
        type: body.profile_image.type,
      } as any);

  return postFormData<User>(`/users/${userId}`, formData, token, { method: 'PUT' })
}


function setUpvoteDownvotes(reviews: BaseReview[]) {
  for(const review of reviews) {
    let upvotes = 0;
    let downvotes = 0;

    for (const vote of review.votes) {
      if (vote.value === 1) upvotes++;
      else if (vote.value === -1) downvotes++;
    }

    review.upvotes = upvotes
    review.downvotes = downvotes
  }
}

// REVIEWS
export async function getUserReviews(userId: string) {
  const reviews = await get<UserReviews[]>(`/users/review/${userId}`)
  setUpvoteDownvotes(reviews)
  return reviews
}

export async function getResturantReviews(resturantId: string) {
  const reviews = await get<ResturantReviews[]>(`/restaurants/review/${resturantId}`)
  setUpvoteDownvotes(reviews)
  return reviews
}

export type UploadMedia = {
  uri: string,
  name: string,
  type: string
}

export type PostReviewBody = {
  user: string,
  restaurant: string,
  rating: number,
  comment: string,
  images: UploadMedia[],
  anonymous: boolean
}

export function postReview(token: string, body: PostReviewBody) {
  const formData = new FormData();
  
  formData.append("user", body.user);
  formData.append("restaurant", body.restaurant);
  formData.append("rating", body.rating.toString());
  formData.append("comment", body.comment);
  formData.append("anonymous", body.anonymous as any);

  body.images.forEach((image, index) => {
    formData.append("images", {
      uri: image.uri,
      name: image.name,
      type: image.type,
    } as any);
  });

  return postFormData<ReviewShortened>("/reviews", formData, token)
}

export type PutReviewBody = {
  "rating": number,
  "comment": string
}

export function updateReview(reviewId: string, body: PutReviewBody) {
  return put<UpdateReviewResponse>(`/reviews/${reviewId}`, body)
}

export type VoteReviewBody = {
  value: number
}

export type VoteReviewResponse = {
  message: string,
  upovtes: number,
  downvotes: number,
  userVote: number
}

export function voteReview(token: string, reviewId: string, body: VoteReviewBody) {
  return post<ReviewShortened>(`/reviews/${reviewId}/vote`, body, token, { method: 'PATCH' })
}

export type DeleteReviewResponse = {
  message: string,
  deletedReview: ReviewShortened
}

export function deleteReview(reviewId: string) {
  return deleteF<DeleteReviewResponse>(`/reviews/${reviewId}`)
}