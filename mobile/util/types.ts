export type GpsLocation = {
  latitude: number,
  longitude: number
}

export type Resturant = {
  _id: string,
  name: string,
  price: number,
  additional_payment: number,
  location: GpsLocation,
  averageRating: number,
  image?: string
}

export enum UserRole {
  USER = "user",
  ADMIN = "admin",
  MODERATOR = "moderator"
}

export type User = {
  _id: string,
  name: string,
  role: UserRole
  email: string,
  trusted_status: number,
  createdAt: string,
  updatedAt: string,
  profile_image: string | null
}

export type Vote = {
  user: string,
  value: number,
  _id: string
}

export type BaseReview = {
  _id: string,
  rating: number,
  comment: string,
  created_at: string,
  __v: number,
  anonymous: boolean,
  images: string[],
  votes: Vote[],
  upvotes: number,
  downvotes: number
}

export interface ResturantReviews extends BaseReview {
  user: User,
  restaurant: string
}

export interface UserReviews extends BaseReview {
  user: string,
  restaurant: Resturant
} 

export interface UpdateReviewResponse extends BaseReview {
  user: {
    _id: string,
    name: string
  },
  restaurant: {
    _id: string,
    name: string
  },
}

export type ReviewShortened = {
  _id: string,
  user: string,
  restaurant: string,
  rating: number,
  comment: string,
  created_at: string,
  __v: number
}