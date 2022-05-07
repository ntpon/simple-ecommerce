import { Link, NavLink } from "react-router-dom"
import {
  SidebarContainer,
  SidebarHeader,
  SidebarItem,
  SidebarList,
} from "./sidebar.styles"

type SidebarProps = {
  menus: {
    label: string
    link: string
  }[]
}

function Sidebar({ menus }: SidebarProps) {
  return (
    <SidebarContainer>
      <SidebarList>
        <SidebarHeader>สมาชิก</SidebarHeader>
        {menus.map((menu) => (
          <NavLink to={menu.link} key={menu.link}>
            <SidebarItem>{menu.label}</SidebarItem>
          </NavLink>
        ))}
      </SidebarList>
    </SidebarContainer>
  )
}

export default Sidebar
