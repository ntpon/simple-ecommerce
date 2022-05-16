import http from "../../utils/http.utils"
import { CartItemStatus } from "./cart-items.type"

const API_URL = "/api/v1/admin/cart-item"

const getCartItems = async () => {
  const response = await http.get(API_URL)
  return response.data
}

const getCartItem = async (id: string) => {
  const response = await http.get(`${API_URL}/${id}`)
  return response.data
}

const updateStatusCartItem = async (id: string, status: CartItemStatus) => {
  const response = await http.patch(`${API_URL}/${id}`, { status: status })
  return response.data
}

const authorService = {
  getCartItem,
  getCartItems,
  updateStatusCartItem,
}
export default authorService
