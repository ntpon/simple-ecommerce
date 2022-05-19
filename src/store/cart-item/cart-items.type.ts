import { UserData } from "../auth/auth.type"
import { Product } from "../product/product.type"

export type CartItem = {
  _id: string
  user: UserData
  product: Product
  totalPrice: number
  quantity: number
  status: CartItemStatus
  createdAt: Date
  updatedAt: Date
}

export type CartItems = CartItem[]

export type Order = {
  _id: string
  status: CartItemStatus
  createdAt: Date
}

export type Orders = Order[]

export type CartItemState = {
  cartItems: CartItems | [] | undefined
  cartItem: CartItem | undefined
  orders: Orders | [] | undefined
  totalOrder: number
  totalPage: number
  isError: boolean
  isSuccess: boolean
  isLoading: boolean
  message: string
}

export type CartItemFormData = {
  name: string
  description: string
  image: string | File
}

export type CartItemStatus =
  | "Not processed"
  | "Processing"
  | "Shipped"
  | "Delivered"
  | "Cancelled"
  | undefined
