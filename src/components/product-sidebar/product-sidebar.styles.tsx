import styled from "styled-components"
import { NavLink } from "react-router-dom"
export const ProductSidebarContainer = styled.div``
export const Header = styled.h3`
  font-weight: normal;
  font-size: 20px;
`

export const ProductListContainer = styled.ul`
  list-style: none;
`
export const ProductItem = styled(NavLink)`
  display: block;
  padding-left: 10px;
  margin-bottom: 5px;
  margin-top: 5px;
  cursor: pointer;
  padding: 5px;
  border-bottom: 1px solid var(--color-secondary);
  &:hover {
    border-bottom: 1px solid var(--color-primary);
  }
  &.active {
    border-bottom: 1px solid var(--color-primary);
  }
`
