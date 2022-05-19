import { Profile, UserData } from "../auth/auth.type"
import { CartItemStatus } from "../cart-item/cart-items.type"
import { Product } from "../product/product.type"
export type CartItemOrderState = {
  cartItemOrders: CartItemOrder[] | [] | undefined
  totalPage: number
  totalCartItemOrders: number
  isError: boolean
  isSuccess: boolean
  isLoading: boolean
  message: string
}
export type CartItemOrder = {
  _id: string
  status: CartItemStatus
  user: UserData
  product: Product
  totalPrice: number
  quantity: number
  createdAt: Date
  updatedAt: Date
}
