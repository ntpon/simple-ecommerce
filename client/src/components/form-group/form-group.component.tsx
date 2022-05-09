import { ReactNode } from "react"
import { FormGroupContainer } from "./form-group.styles"
type FormGroup = {
  center?: boolean
  horizontal?: boolean
  children: ReactNode
}
function FormGroup({
  center = false,
  children,
  horizontal = false,
}: FormGroup) {
  return (
    <FormGroupContainer center={center} horizontal={horizontal}>
      {children}
    </FormGroupContainer>
  )
}
export default FormGroup
