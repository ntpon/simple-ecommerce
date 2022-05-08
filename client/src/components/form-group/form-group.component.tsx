import { ReactNode } from "react"
import { FormGroupContainer } from "./form-group.styles"
type FormGroup = {
  center?: boolean
  vertical?: boolean
  children: ReactNode
}
function FormGroup({ center = false, children, vertical = false }: FormGroup) {
  return (
    <FormGroupContainer center={center} vertical={vertical}>
      {children}
    </FormGroupContainer>
  )
}
export default FormGroup
