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
import { AiOutlineHome } from "react-icons/ai"
import { ImBooks } from "react-icons/im"
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
          <MenuLink to='/'>
            <AiOutlineHome />
            <span>หน้าหลัก</span>
          </MenuLink>
          <MenuLink to='/shop'>
            <ImBooks />
            <span>สินค้าทั้งหมด</span>
          </MenuLink>
        </MenuMainContainer>
        <MenuOtherContainer>
          <MenuLink to='/checkout'>
            <BiCartAlt />
            <span>ตระกร้า</span>
          </MenuLink>
          <MenuLink to='/member'>
            <BiUser />
            <span>บัญชีของคุณ</span>
          </MenuLink>
          {/* <Icon>
            <Flags.TH></Flags.TH>
          </Icon> */}
        </MenuOtherContainer>
      </NavbarMenuContainer>
    </NavbarContainer>
  )
}

export default Navbar
