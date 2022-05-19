import styled from "styled-components"
export const HeaderContainer = styled.div``
export const HeaderText = styled.h1`
  font-weight: normal;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80px;
  margin-bottom: 15px;
  background-color: var(--color-secondary);
  span {
    margin-left: 10px;
  }
  @media (max-width: 768px) {
    font-size: 20px;
  }
`
