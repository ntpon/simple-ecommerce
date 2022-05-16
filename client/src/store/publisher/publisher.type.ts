export type Publisher = {
  _id: string
  name: string
  description: string
  createdAt: string
  updatedAt: string
}

export type Publishers = Publisher[]

export type PublisherState = {
  publishers: Publishers | [] | undefined
  publisher: Publisher | undefined
  isError: boolean
  isSuccess: boolean
  isLoading: boolean
  message: string
}

export type PublisherFormData = {
  name: string
  description: string
}
