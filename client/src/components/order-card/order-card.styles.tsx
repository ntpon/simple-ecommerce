import styled from "styled-components"
export const OrderCardContainer = styled.div`
  display: flex;
  padding: 10px;
  border: 1px solid var(--color-secondary);
  margin-bottom: 10px;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`
export const LeftContainer = styled.div`
  flex: 1;
  text-align: center;
  img {
    width: 150px;
    height: 150px;
    object-fit: contain;
  }
  @media (max-width: 768px) {
    img {
      width: 100%;
      object-fit: cover;
    }
  }
`
export const RightContainer = styled.div`
  flex: 3;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

export const TextContainer = styled.div`
  margin-bottom: 10px;
`
export const TitleText = styled.span`
  margin-right: 10px;
`
export const Text = styled.span``
