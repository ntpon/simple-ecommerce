import { InputHTMLAttributes } from "react"
import {
  FormInputContainer,
  Input,
  InputLabel,
  InputTextArea,
} from "./form-input.styles"

type FormInputProps = {
  label: string
  inputType?: "input" | "textarea"
} & InputHTMLAttributes<HTMLInputElement>

function FormInput({
  inputType = "input",
  label,
  ...otherProps
}: FormInputProps) {
  return (
    <FormInputContainer>
      <InputLabel htmlFor={label}>{label}</InputLabel>
      {inputType === "input" && (
        <Input type='text' id={label} {...otherProps} />
      )}

      {inputType === "textarea" && (
        <InputTextArea id={label} rows={3}></InputTextArea>
      )}
    </FormInputContainer>
  )
}

export default FormInput
