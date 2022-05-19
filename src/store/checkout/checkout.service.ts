import http from "../../utils/http.utils"
import { CheckoutData } from "./checkout.type"
const API_URL = "/api/v1/cart"
export const creatCheckout = async (checkoutData: CheckoutData) => {
  // console.log(checkoutData)
  const response = await http.post(API_URL, checkoutData)
  return response.data
}

const checkoutService = {
  creatCheckout,
}

export default checkoutService
