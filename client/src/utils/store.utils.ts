import { CartItemStatus } from "../store/cart-item/cart-items.type"
import { ProductCheckout } from "../store/checkout/checkout.type"
import { Product } from "../store/shop/shop.type"

export const statusToThaiText = (status: CartItemStatus = "Not processed") => {
  const statusData = {
    "Not processed": "รับเข้าสู่ระบบ",
    Processing: "กำลังเตรียมสินค้า",
    Shipped: "สินค้ากำลังเดินทาง",
    Delivered: "จัดส่งสินค้าสำเร็จ",
    Cancelled: "ยกเลิกสินค้า",
  }
  return statusData[status]
}

export const statusToNextStatus = (
  status: CartItemStatus = "Not processed"
) => {
  const statusData = {
    "Not processed": "Processing",
    Processing: "Shipped",
    Shipped: "Delivered",
    Delivered: "Cancelled",
    Cancelled: "",
  }
  return statusData[status] as CartItemStatus
}

export const isAddToCard = (
  productId: string,
  productCheckout: ProductCheckout[]
) => {
  let check = false
  const product = productCheckout.find((p) => p._id === productId)

  if (product) {
    check = product.quantity <= product.quantityInCart
  }
  return check
}
