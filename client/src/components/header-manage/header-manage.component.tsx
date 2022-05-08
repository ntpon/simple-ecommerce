import { ReactNode } from "react"
import { Link } from "react-router-dom"
import {
  HeaderMemberContainer,
  HeaderMemberText,
  LinkCreate,
} from "./header-manage.styles"
type HeaderMemberProps = {
  text: string
  icon?: ReactNode
  link?: string
  label?: string
}

function HeaderManage({
  text,
  link = "",
  label = "ยกเลิก",
  icon,
}: HeaderMemberProps) {
  return (
    <HeaderMemberContainer>
      <HeaderMemberText>
        {icon}
        <span>{text}</span>
      </HeaderMemberText>
      {link !== "" && <LinkCreate to={link}>{label}</LinkCreate>}
    </HeaderMemberContainer>
  )
}

export default HeaderManage
