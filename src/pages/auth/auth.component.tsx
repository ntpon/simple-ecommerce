import Header from "../../components/header/header.component"
import Login from "../../components/login/login.component"
import Register from "../../components/register/register.component"
import { Container, LoginContainer, RegisterContainer } from "./auth.styles"

function Auth() {
  return (
    <div>
      <Container>
        <LoginContainer></LoginContainer>
        <RegisterContainer></RegisterContainer>
      </Container>
    </div>
  )
}
export default Auth
