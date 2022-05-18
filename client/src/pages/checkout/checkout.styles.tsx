import styled from "styled-components"
export const CheckoutContainer = styled.div``
export const ResultCheckoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-top: 10px;
`
export const ResultCheckout = styled.div`
  min-width: 280px;
  padding: 10px;
  border: 1px solid var(--color-primary-border);
`
export const ResultCheckoutRow = styled.div`
  display: flex;
  padding: 10px 15px;
  span {
    flex: 1;
    text-align: center;
  }
`
export const ResultCheckoutRowTotal = styled.div`
  display: flex;
  border-top: 1px solid var(--color-primary-border);
  padding: 10px 15px;
  span {
    font-size: 20px;
    flex: 1;
    text-align: center;
  }
`
export const ButtonContainer = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
`

export const IconAction = styled.div`
  svg {
    font-size: 24px;
  }
  cursor: pointer;

  &:hover,
  &:active {
    color: var(--color-danger);
  }
`

export const TextNotFound = styled.p`
  font-size: 18px;
  text-align: center;
`
