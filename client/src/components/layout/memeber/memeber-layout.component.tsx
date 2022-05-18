import { useEffect, useState } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { useAppSelector } from "../../../store/store"
import Sidebar from "../../sidebar/sidebar.component"
import { MainContent, MemberLayoutContainer } from "./member-layout.styles"

const menus = [
  {
    label: "รายการสั่งซื้อ",
    link: "/member",
  },
  {
    label: "ข้อมูลส่วนตัวผู้ใช้",
    link: "/member/profile",
  },
  {
    label: "ความปลอดภัยผู้ใช้",
    link: "/member/security",
  },
  {
    label: "ติดต่อ Support",
    link: "/member/support",
  },
]

function MemberLayout() {
  const { user } = useAppSelector((state) => state.auth)
  const navigate = useNavigate()
  useEffect(() => {
    if (!user) {
      navigate("/")
    }
  }, [user, navigate])
  return (
    <MemberLayoutContainer>
      <Sidebar menus={menus} />
      <MainContent>
        <Outlet />
      </MainContent>
    </MemberLayoutContainer>
  )
}

export default MemberLayout
