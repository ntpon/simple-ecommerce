export type User = {
  _id: string
  firstName: string
  lastName: string
  image: {
    public_id: string
    url: string
  }
  email: string
  phoneNumber: string
  address: string
  createdAt: string
  updatedAt: string
}

export type Users = User[]

export type UserState = {
  users: Users | [] | undefined
  user: User | undefined
  isError: boolean
  isSuccess: boolean
  isLoading: boolean
  message: string
}

export type UserFormData = {
  firstName: string
  lastName: string
  email: string
  password?: string
  phoneNumber: string
  image?: string | File
  address: string
}
