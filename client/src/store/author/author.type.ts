export type Author = {
  _id: string
  name: string
  description: string
  image: {
    public_id: string
    url: string
  }
  createdAt: string
  updatedAt: string
}

export type Authors = Author[]

export type AuthorState = {
  authors: Authors | [] | undefined
  author: Author | undefined
  isError: boolean
  isSuccess: boolean
  isLoading: boolean
  message: string
}

export type AuthorFormData = {
  name: string
  description: string
  image: string | File
}
