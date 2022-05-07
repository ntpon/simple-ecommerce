import { Outlet } from "react-router-dom"
import Sidebar from "../../sidebar/sidebar.component"
import { AdminLayoutContainer, MainContent } from "./admin-layout.styles"

function MemberLayout() {
  return (
    <AdminLayoutContainer>
      <Sidebar />
      <MainContent>
        <Outlet />
      </MainContent>
    </AdminLayoutContainer>
  )
}

export default MemberLayout
