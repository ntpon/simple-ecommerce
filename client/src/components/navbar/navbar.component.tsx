import React, { useEffect, useState } from "react"
import {
  MenuLink,
  MenuMainContainer,
  MenuOtherContainer,
  NavbarContainer,
  NavbarHeaderContainer,
  NavbarLogo,
  NavbarLogoContainer,
  NavbarMenuContainer,
  NavbarSearchContainer,
  NavbarSearchIconBox,
  NavbarSearchIconContainer,
  NavbarSearchInput,
  NavbarSearchInputContainer,
  Text,
} from "./navbar.styles"
import Flags from "country-flag-icons/react/3x2"

import { BiSearch, BiCartAlt, BiUser } from "react-icons/bi"
import Icon from "../icon/icon.component"

const navbarMenu = [
  {
    name: "home",
  },
]

function Navbar() {
  const [isSticky, setIsSticky] = useState(false)

  useEffect(() => {
    window.addEventListener("scroll", stickNavbar)

    return () => {
      window.removeEventListener("scroll", stickNavbar)
    }
  }, [])

  const stickNavbar = () => {
    if (window !== undefined) {
      let windowHeight = window.scrollY
      windowHeight > 100 ? setIsSticky(true) : setIsSticky(false)
    }
  }

  return (
    <NavbarContainer>
      <NavbarHeaderContainer>
        <NavbarLogoContainer>
          <NavbarLogo>BOOK E-COMMERCE</NavbarLogo>
        </NavbarLogoContainer>
        <NavbarSearchContainer>
          <NavbarSearchInputContainer>
            <NavbarSearchInput placeholder='ค้นหา' />
            <NavbarSearchIconBox>
              <BiSearch color='#fff' />
            </NavbarSearchIconBox>
          </NavbarSearchInputContainer>
          <NavbarSearchIconContainer>
            <Text>
              คำที่ถูกค้นหาบ่อย : <span>สถาบันสถาปนา,</span>
              <span>นิยายวิทยาศาสตร์ไทย,</span>
              <span>Sci-Fi</span>
            </Text>
          </NavbarSearchIconContainer>
        </NavbarSearchContainer>
      </NavbarHeaderContainer>
      <NavbarMenuContainer sticky={isSticky}>
        <MenuMainContainer>
          <MenuLink to='/'>หน้าหลัก</MenuLink>
          <MenuLink to='/'>สินค้าทั้งหมด</MenuLink>
        </MenuMainContainer>
        <MenuOtherContainer>
          <MenuLink to='/'>
            <BiCartAlt />
            <span>ตระกร้า</span>
          </MenuLink>
          <MenuLink to='/'>
            <BiUser />
            <span>บัญชีของคุณ</span>
          </MenuLink>
          <Icon>
            <Flags.TH></Flags.TH>
          </Icon>
        </MenuOtherContainer>
      </NavbarMenuContainer>
    </NavbarContainer>
  )
}

export default Navbar
