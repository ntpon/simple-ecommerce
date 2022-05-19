import styled from "styled-components"
export const FormInputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  margin-right: 10px;
`
export const InputLabel = styled.label`
  font-size: 16px;
  margin-bottom: 10px;
`
export const Input = styled.input`
  border: 1px solid var(--color-primary-border);
  border-radius: 5px;
  padding-left: 10px;
  width: 100%;
  outline: none;
  min-height: 35px;
`
export const InputTextArea = styled.textarea`
  border: 1px solid var(--color-primary-border);
  border-radius: 5px;
  /* padding-left: 10px; */
  line-height: 1.5;
  padding: 15px;
  width: 100%;
  outline: none;
  min-height: 100px;
`
