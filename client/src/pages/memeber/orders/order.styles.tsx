import styled from "styled-components"

export const OrderContainer = styled.div``

export const SearchInputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  input {
    border: 1px solid var(--color-primary-border);
    /* border-radius: 2px;s */
    padding-left: 10px;
    width: 100%;
    /* border-right: 0; */
    outline: none;
    height: 45px;
  }
  button {
    border: 1px solid var(--color-primary-border);
    border-radius: 0px;
  }
`
