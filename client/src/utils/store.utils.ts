import { CartItemStatus } from "../store/cart-item/cart-items.type"

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
