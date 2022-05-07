import styled from "styled-components"
export const ProductCardContainer = styled.div`
  margin: 10px;
  padding: 10px;
  border: 1px solid transparent;
  &:hover {
    border: 1px solid #ccc;
  }
`

export const ProductPriceContainer = styled.div`
  text-align: center;
  padding: 10px;
  span {
    font-size: 20px;
    color: var(--color-danger);
  }
`

export const ButtonContainer = styled.div``

export const ProductToCart = styled.div`
  display: flex;
  justify-content: flex-end;
  z-index: 3;
`
export const NameText = styled.h3`
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: normal;
`
export const DescriptionText = styled.p`
  margin-top: 10px;
  display: -webkit-box;
  line-height: 1.4;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--color-body-text);
`

export const ImageController = styled.div`
  display: flex;
  justify-content: center;
  margin: 15px 0;
`

export const ImageProduct = styled.img``
