import styled from "styled-components"
type FormGroupContainerProps = {
  center: boolean
  horizontal: boolean
}
export const FormGroupContainer = styled.div<FormGroupContainerProps>`
  width: 100%;
  display: flex;
  margin: 10px 0;
  flex-direction: ${({ horizontal }) => (horizontal ? "row" : "column")};
  justify-content: ${({ center }) => (center ? "center" : "flex-start")};
`
