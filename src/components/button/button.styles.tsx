import styled from "styled-components"
export const BaseButton = styled.button`
  margin: 5px;
  min-width: 150px;
  width: auto;
  min-height: 45px;
  letter-spacing: 0.5px;
  line-height: 50px;
  padding: 15px 20px;
  font-size: 15px;
  background-color: white;
  color: #000;
  text-transform: uppercase;
  font-family: "Open Sans Condensed";
  font-weight: bolder;
  border: 1px solid black;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  line-height: 1.2;
  &:hover {
    background-color: var(--color-primary);
    color: #fff;
    border: 1px solid var(--color-primary);
  }

  svg {
    margin-right: 10px;
    font-size: 24px;
  }
  span {
    font-weight: normal;
  }
  &:disabled {
    background-color: #fafafa;
    color: gray;
    cursor: not-allowed;
    border: 1px solid #000 !important;
  }
`
