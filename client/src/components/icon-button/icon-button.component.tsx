import { ButtonHTMLAttributes } from "react"
import { IconButtonContainer } from "./icon-button.styles"

export type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

function IconButton({ children, ...otherProps }: IconButtonProps) {
  return (
    <IconButtonContainer type='button' {...otherProps}>
      {children}
    </IconButtonContainer>
  )
}

export default IconButton
