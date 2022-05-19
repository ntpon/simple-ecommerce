import { Outlet } from "react-router-dom"
import Navbar from "../navbar/navbar.component"
import { LayoutContainer } from "./layout.styles"
function Layout() {
  return (
    <LayoutContainer>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </LayoutContainer>
  )
}

export default Layout
