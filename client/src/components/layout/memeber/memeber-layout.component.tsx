import { Outlet } from "react-router-dom"
import { MemberLayoutContainer } from "./member-layout.styles"

function MemberLayout() {
  return (
    <MemberLayoutContainer>
      <Outlet />
    </MemberLayoutContainer>
  )
}

export default MemberLayout
