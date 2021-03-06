import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { useAppSelector } from "../../../store/store"
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
  const { user } = useAppSelector((state) => state.auth)
  const navigate = useNavigate()
  useEffect(() => {
    if (user) {
      if (user.user.role !== "admin") {
        navigate("/")
      }
    } else {
      navigate("/")
    }
  }, [user, navigate])
  return (
    <AdminLayoutContainer>
      {user && (
        <>
          <Sidebar menus={menus} />
          <MainContent>
            <Outlet />
          </MainContent>
        </>
      )}
    </AdminLayoutContainer>
  )
}

export default AdminLayout
