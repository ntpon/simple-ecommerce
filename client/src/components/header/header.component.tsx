import { ReactNode } from "react"
import { HeaderContainer, HeaderText } from "./header.styles"
type HeaderProps = {
  text: string
  icon?: ReactNode
}

function Header({ text, icon }: HeaderProps) {
  return (
    <HeaderContainer>
      <HeaderText>
        {icon}
        <span>{text}</span>
      </HeaderText>
    </HeaderContainer>
  )
}

export default Header
