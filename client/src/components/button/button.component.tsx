import React, { ButtonHTMLAttributes } from "react"
import { BaseButton } from "./button.styles"
export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

function Button({ children, ...otherProps }: ButtonProps) {
  return <BaseButton {...otherProps}>{children}</BaseButton>
}
export default Button
