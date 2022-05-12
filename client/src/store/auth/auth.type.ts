export type AuthState = {
  user: null | AuthUser
  isError: boolean
  isLoading: boolean
  isSuccess: boolean
  message: string | undefined
}

export type AuthUser = {
  token: string
  user: {
    firstName: string
    lastName: string
    role: "admin" | "user"
  }
}

export type UserData = {
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  password: string
}

export type UserLogin = {
  email: string
  password: string
}
