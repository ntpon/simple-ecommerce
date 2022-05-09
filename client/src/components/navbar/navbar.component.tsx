import React, { FormEvent, FormEventHandler, useEffect, useState } from "react"
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
  NavbarSearchForm,
  Text,
} from "./navbar.styles"
import Flags from "country-flag-icons/react/3x2"

import { BiSearch, BiCartAlt, BiUser } from "react-icons/bi"
import { AiOutlineHome } from "react-icons/ai"
import { ImBooks } from "react-icons/im"
import Icon from "../icon/icon.component"
import Login from "../login/login.component"
import Register from "../register/register.component"
import { useNavigate } from "react-router-dom"

function Navbar() {
  const navigate = useNavigate()
  const [search, setSearch] = useState("")
  const [showLogin, setShowLogin] = useState(false)
  const [showRegister, setShowRegister] = useState(false)
  const [isSticky, setIsSticky] = useState(false)

  useEffect(() => {
    window.addEventListener("scroll", stickNavbar)

    return () => {
      window.removeEventListener("scroll", stickNavbar)
    }
  }, [])

  const onSearch = (e: FormEvent) => {
    e.preventDefault()
    if (!search.trim()) {
      return
    }
    navigate(`/search?value=${search}`)
  }

  const stickNavbar = () => {
    if (window !== undefined) {
      let windowHeight = window.scrollY
      windowHeight > 151 ? setIsSticky(true) : setIsSticky(false)
    }
  }

  return (
    <>
      <NavbarContainer>
        <NavbarHeaderContainer>
          <NavbarLogoContainer>
            <NavbarLogo>BOOK E-COMMERCE</NavbarLogo>
          </NavbarLogoContainer>
          <NavbarSearchContainer>
            <NavbarSearchForm onSubmit={onSearch}>
              <NavbarSearchInput
                placeholder='ค้นหา'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <NavbarSearchIconBox type='submit'>
                <BiSearch color='#fff' />
              </NavbarSearchIconBox>
            </NavbarSearchForm>
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
            <button onClick={() => setShowLogin(true)}>
              <BiUser />
              <span>บัญชีของคุณ</span>
            </button>
            {/* <Icon>
            <Flags.TH></Flags.TH>
          </Icon> */}
          </MenuOtherContainer>
        </NavbarMenuContainer>
      </NavbarContainer>
      {showLogin && (
        <Login
          open={showLogin}
          onClose={() => {
            setShowLogin(false)
          }}
          onClickOther={() => {
            setShowLogin(false)
            setShowRegister(true)
          }}
        />
      )}
      {showRegister && (
        <Register
          open={showRegister}
          onClose={() => {
            setShowRegister(false)
          }}
          onClickOther={() => {
            setShowLogin(true)
          }}
        />
      )}
    </>
  )
}

export default Navbar
