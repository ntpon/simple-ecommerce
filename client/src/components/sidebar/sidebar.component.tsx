import { Link } from "react-router-dom"
import {
  SidebarContainer,
  SidebarHeader,
  SidebarItem,
  SidebarList,
} from "./sidebar.styles"

function Sidebar() {
  return (
    <SidebarContainer>
      <SidebarList>
        <SidebarHeader>สมาชิก</SidebarHeader>
        <Link to='/member'>
          <SidebarItem>รายการสั่งซื้อ</SidebarItem>
        </Link>
        <Link to='/member/profile'>
          <SidebarItem>ข้อมูลส่วนตัวผู้ใช้</SidebarItem>
        </Link>
        <Link to='/member/security'>
          <SidebarItem>ความปลอดภัยผู้ใช้</SidebarItem>
        </Link>
        <Link to='/member/support'>
          <SidebarItem>ติดต่อ Support</SidebarItem>
        </Link>
        <Link to='/member/support'>
          <SidebarItem>ติดต่อ Support</SidebarItem>
        </Link>
      </SidebarList>
    </SidebarContainer>
  )
}

export default Sidebar
