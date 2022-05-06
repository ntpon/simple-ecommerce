import styled from "styled-components"
export const PromotionContainer = styled.div`
  margin: 10px 0;
  width: 100%;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  display: flex;
  height: 100%;
  max-height: 500px;
`
export const LeftContainer = styled.div`
  display: flex;
  width: 50%;
  padding: 10px;
`
export const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  max-height: 500px;
  img {
    max-height: 50%;
    padding: 10px;
  }
`
