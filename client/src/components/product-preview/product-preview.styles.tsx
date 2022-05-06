import styled from "styled-components"
export const ProductPreviewContainer = styled.div`
  /* height: 150px; */
  margin-bottom: 15px;
  border: 1px solid var(--color-primary-border);
  border-radius: 3px;
  & > .product-swiper {
    padding-bottom: 40px;
  }
`

export const ProductPreviewHeader = styled.div`
  background-color: var(--color-secondary);
  padding: 5px 15px;
`

export const HeaderText = styled.h3`
  color: var(--color-primary);
  font-weight: normal;
`
