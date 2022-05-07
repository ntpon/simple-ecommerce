import styled from "styled-components"
export const ShopDetailContainer = styled.div`
  display: flex;
  padding: 10px 20px;
`
export const ImageContainer = styled.div`
  flex: 1;
`
export const ImageShow = styled.div`
  display: flex;
  justify-content: center;
  img {
    max-width: 100%;
    width: 500px;
    object-fit: cover;
  }
`
export const DetailContainer = styled.div`
  flex: 1;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0 1px 2px rgb(0 0 0 / 20%);
  border-radius: 3px;
`
export const TitleContainer = styled.div`
  h2 {
    color: var(--color-primary);
  }
  p {
    margin-top: 10px;
  }
  padding-bottom: 5px;
  margin-bottom: 15px;
  border-bottom: 2px solid var(--color-secondary);
`

export const ImageThumbnailContainer = styled.div`
  display: flex;
  justify-content: center;
`
export const ImageThumbnail = styled.div`
  cursor: pointer;
  img {
    width: 150px;
  }
  border: 1px solid transparent;
  &:hover {
    border: 1px solid var(--color-primary-border);
  }
`
export const PriceText = styled.p`
  color: var(--color-danger);
  font-weight: 700;
  margin-bottom: 10px;
`
export const ShortText = styled.p`
  line-height: 1.6;
`

export const ListContainer = styled.ul`
  margin-top: 10px;
  list-style: none;
  font-weight: 300;
  li {
    padding: 7px 0;
  }
  li:nth-child(odd) {
    background-color: var(--color-secondary);
  }
`

export const AddToCardContainer = styled.div`
  margin-top: 20px;

  input {
    margin-top: 5px;
    padding: 10px;
    width: 100%;
  }
`
export const ButtonContainer = styled.div`
  margin-top: 25px;
`
