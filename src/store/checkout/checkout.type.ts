import { Product } from "../shop/shop.type"

export type CheckoutState = {
  products: ProductCheckout[]
  totalProducts: number
  totalPrice: number
  isError: boolean
  isSuccess: boolean
  isLoading: boolean
  message: string
}

export type ProductCheckout = Product & {
  quantityInCart: number
  total: number
}

export type CheckoutData = {
  products: { id: string; quantity: number }[]
}
