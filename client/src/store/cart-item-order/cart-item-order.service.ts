import http from "../../utils/http.utils"
const API_URL = "/api/v1/cart-item"

export const getCartItemOrders = async () => {
  const response = await http.get(API_URL)
  return response.data
}

const cartItemOrders = {
  getCartItemOrders,
}

export default cartItemOrders
