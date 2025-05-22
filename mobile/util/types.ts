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
  reviews: Array<Review>,
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
  reviews: Array<Review>,
  trusted_status: number,
  createdAt: string,
  updatedAt: string
}

export type Review = {
  _id: string,
  user: {
    _id: string,
    name: string
  },
  restaurant: {
    _id: string,
    name: string
  },
  rating: number,
  comment: string,
  created_at: string,
  __v: number
}