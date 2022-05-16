import { ImageListType } from "react-images-uploading"
import { Authors } from "../author/author.type"
import { Categories } from "../category/category.type"
import { Publisher } from "../publisher/publisher.type"

export type Product = {
  _id: string
  name: string
  description: string
  image: {
    public_id: string
    url: string
  }
  images: {
    public_id: string
    url: string
  }[]
  categories: Categories
  authors: Authors
  publisher: Publisher
  price: number
  quantity: number
  createdAt: string
  updatedAt: string
}

export type Products = Product[]

export type ProductState = {
  products: Products | [] | undefined
  product: Product | undefined
  isError: boolean
  isSuccess: boolean
  isLoading: boolean
  message: string
}

export type ProductFormData = {
  name: string
  description: string
  image?: string | File
  images?: ImageListType
  categories: string[] | undefined
  authors: string[] | undefined
  publisher: string | undefined
  price: number
  quantity: number
  currentImages?: string[]
}
