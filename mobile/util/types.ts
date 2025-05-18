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

export type User = {
  _id: string,
  name: string,
  email: string,
  reviews: Array<Review>,
  trusted_status: boolean,
  createdAt: string,
  updatedAt: string
}

export type Review = {
  _id: string,
  user: {
    _id: string
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