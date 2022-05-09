import { Link } from "react-router-dom"
import styled from "styled-components"

export const Form = styled.form`
  display: flex;
`
export const FormInputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  margin-right: 10px;
`

export const Label = styled.label`
  font-size: 16px;
  margin-bottom: 10px;
`

export const InputContainer = styled.div`
  /* display: flex; */
  /* flex-direction: column; */
  flex: 2;
`
export const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  flex: 1;
`

export const ImageList = styled.div`
  display: flex;
`

export const ImageItem = styled.div``

export const AuthButtonOther = styled.button`
  color: var(--color-primary);
  background-color: transparent;
  border: transparent;
  margin-left: 10px;
  cursor: pointer;
`
