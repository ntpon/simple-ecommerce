import { ReactNode } from "react"
import { HeaderMemberContainer, HeaderMemberText } from "./header-member.styles"
type HeaderMemberProps = {
  text: string
  icon?: ReactNode
}

function HeaderMember({ text, icon }: HeaderMemberProps) {
  return (
    <HeaderMemberContainer>
      <HeaderMemberText>
        {icon}
        <span>{text}</span>
      </HeaderMemberText>
    </HeaderMemberContainer>
  )
}

export default HeaderMember
