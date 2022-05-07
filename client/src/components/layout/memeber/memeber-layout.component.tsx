import { Outlet } from "react-router-dom"
import Sidebar from "../../sidebar/sidebar.component"
import { MainContent, MemberLayoutContainer } from "./member-layout.styles"

function MemberLayout() {
  return (
    <MemberLayoutContainer>
      <Sidebar />
      <MainContent>
        <Outlet />
      </MainContent>
    </MemberLayoutContainer>
  )
}

export default MemberLayout
