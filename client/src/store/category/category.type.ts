export type Category = {
  _id: string
  name: string
  description: string
  createdAt: string
  updatedAt: string
}

export type Categories = Category[]

export type CategoryState = {
  categories: Categories | [] | undefined
  category: Category | undefined
  isError: boolean
  isSuccess: boolean
  isLoading: boolean
  message: string
}

export type CategoryFormData = {
  name: string
  description: string
}
