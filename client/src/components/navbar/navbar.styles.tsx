import styled from "styled-components"
import { Link } from "react-router-dom"

export const NavbarContainer = styled.div``
export const NavbarHeaderContainer = styled.div`
  height: 100px;
  display: flex;
  justify-content: space-between;
  background-color: #fcfcfc;
  border-color: transparent;
  color: #000;
`

export const NavbarLogoContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  margin-left: 10px;
  flex: 2;
`

export const NavbarLogo = styled.h1`
  font-size: 24px;
  font-weight: normal;
`

export const NavbarSearchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex: 1;
  margin: 0px 25px;
`
export const NavbarSearchForm = styled.form`
  display: flex;
  align-items: center;
  width: 100%;
`

export const NavbarSearchIconBox = styled.button`
  width: 40px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #000;
  cursor: pointer;
`

export const NavbarSearchInput = styled.input`
  border: 1px solid var(--color-primary-border);
  border-radius: 2px;
  height: 35px;
  /* width: 280px; */
  padding-left: 10px;
  width: 100%;
  border-right: 0;
`

export const NavbarSearchIconContainer = styled.div`
  margin-top: 5px;
`

export const Text = styled.p`
  font-size: 14px;
  font-weight: normal;
  span {
    color: var(--color-primary);
    cursor: pointer;
  }
`
type NavbarMenuContainerProps = {
  sticky: boolean
}
export const NavbarMenuContainer = styled.div<NavbarMenuContainerProps>`
  height: 50px;
  background-color: var(--color-primary);
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: ${({ sticky }) => (sticky ? "fixed" : "relative")};
  width: 100%;
  top: 0;
  z-index: 2;

  button {
    color: #fff;
    padding: 0 10px;
    font-size: 14px;
    display: flex;
    align-items: center;
    background-color: transparent;
    border: none;
    cursor: pointer;
    span {
      margin-left: 5px;
    }
  }
`

export const MenuLink = styled(Link)`
  color: #fff;
  padding: 0 10px;
  font-size: 14px;
  display: flex;
  align-items: center;
  span {
    margin-left: 5px;
  }
`

export const MenuMainContainer = styled.div`
  display: flex;
`

export const MenuOtherContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
`
