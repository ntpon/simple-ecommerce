import styled from "styled-components"
export const MemberLayoutContainer = styled.div`
  display: flex;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`

export const MainContent = styled.div`
  width: 100%;
  padding: 0 25px;
  @media (max-width: 768px) {
    padding: 0 5px;
  }
`
