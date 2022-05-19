import styled from "styled-components"
export const SidebarContainer = styled.div``

export const SidebarHeader = styled.h4`
  padding: 10px;
  font-weight: normal;
  font-size: 24px;
  border-bottom: 2px solid var(--color-primary);
  text-align: center;
`
export const SidebarList = styled.ul`
  list-style: none;
  min-width: 250px;
  border-bottom: 1px solid var(--color-secondary);
  & > .active > li {
    background-color: var(--color-secondary);
  }
`
export const SidebarItem = styled.li`
  padding: 10px;
  /* border: 1px solid var(--color-secondary); */
  text-align: center;
  cursor: pointer;
  &:hover {
    background-color: var(--color-secondary);
  }
`
