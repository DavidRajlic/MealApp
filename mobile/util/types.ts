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
  reviews: Array<{}>,
  image?: string
}

export type User = {
  _id: string,
  name: string,
  email: string,
  reviews: Array<{}>,
  trusted_status: boolean,
  createdAt: string,
  updatedAt: string
}