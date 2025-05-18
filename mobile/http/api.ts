import { Resturant as Restaurant, User } from "../util/types";
import { get, post } from "./fetch";

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