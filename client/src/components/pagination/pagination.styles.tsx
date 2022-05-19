import styled from "styled-components"
export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
`
export const PaginationLists = styled.ul`
  display: flex;
  list-style: none;
  flex-wrap: wrap;
`

export const PaginationItem = styled.li`
  padding: 10px 15px;
  border-radius: 5px;
  margin: 5px;
  background-color: var(--color-primary);
  cursor: pointer;
  display: flex;
  align-items: center;
  &:hover,
  &.active {
    color: #fff;
    background-color: var(--color-primary-light);
  }
`
