import styled from "styled-components"
export const ShopContainer = styled.div``
export const Header = styled.h1`
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
`
export const ContentContainer = styled.div`
  display: flex;
`
export const LeftContainer = styled.div`
  flex: 1;
`
export const RightContent = styled.div`
  flex: 3;
`
export const MainContent = styled.div`
  flex: 3;
`

export const ResultTotalProduct = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
export const SelectContainer = styled.div`
  span {
    font-size: 14px;
    margin-right: 10px;
  }
  select {
    border: 1px solid var(--color-primary-border);
    padding: 5px;
  }

  option {
    padding: 10px;
  }
`

export const ProductListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: 30px;
`
export const ProductItem = styled.div`
  width: 33%;
`
