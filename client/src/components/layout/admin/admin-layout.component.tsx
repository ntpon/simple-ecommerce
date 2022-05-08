import { Outlet } from "react-router-dom"
import Sidebar from "../../sidebar/sidebar.component"
import { AdminLayoutContainer, MainContent } from "./admin-layout.styles"

const menus = [
  {
    label: "รายการสั่งซื้อ",
    link: "/admin",
  },
  {
    label: "ข้อมูลส่วนตัวผู้ใช้",
    link: "/admin/profile",
  },
  {
    label: "ความปลอดภัยผู้ใช้",
    link: "/admin/security",
  },
  {
    label: "จัดการสมาชิก",
    link: "/admin/user",
  },
  {
    label: "จัดการประเภทสินค้า",
    link: "/admin/category",
  },
  {
    label: "จัดการผู้เขียน",
    link: "/admin/author",
  },
  {
    label: "จัดการสำนักพิมพ์",
    link: "/admin/publisher",
  },
  {
    label: "จัดการสินค้า",
    link: "/admin/product",
  },
  {
    label: "จัดการสถานะ Order",
    link: "/admin/order-status",
  },
]

function AdminLayout() {
  return (
    <AdminLayoutContainer>
      <Sidebar menus={menus} />
      <MainContent>
        <Outlet />
      </MainContent>
    </AdminLayoutContainer>
  )
}

export default AdminLayout
