import { FormEvent, useEffect, useState } from "react"
import { login, reset } from "../../store/auth/auth.slice"
import { UserLogin } from "../../store/auth/auth.type"
import { useAppDispatch, useAppSelector } from "../../store/store"
import Button from "../button/button.component"
import FormGroup from "../form-group/form-group.component"
import FormInput from "../form-input/form-input.component"
import { AuthButtonOther } from "../form/form.styles"
import Modal from "../modal/modal.component"
import Spinner from "../spinner/spinner.component"
import { LoginContainer } from "./login.styles"
import { toast } from "react-toastify"

type LoginProps = {
  open: boolean
  onClose: () => void
  onClickOther: () => void
}
function Login({ open, onClickOther, onClose }: LoginProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useAppDispatch()

  const { user, isLoading, isError, isSuccess, message } = useAppSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
      dispatch(reset())
    }
    if (isSuccess) {
      toast.success(message)
      dispatch(reset())
      onClose()
    }
  }, [isError, isSuccess, user, message, dispatch])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const user: UserLogin = {
      email: email,
      password: password,
    }
    dispatch(login(user))
  }

  return (
    <>
      {isLoading && <Spinner />}
      <Modal open={open} onClose={onClose}>
        <LoginContainer onSubmit={handleSubmit}>
          <h2>เข้าสู่ระบบ</h2>
          <FormGroup>
            <FormInput
              label='อีเมล'
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type='email'
            />
          </FormGroup>
          <FormGroup>
            <FormInput
              label='รหัสผ่าน'
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type='password'
            />
          </FormGroup>
          <FormGroup horizontal center>
            <Button type='submit'>
              <span>เข้าสู่ระบบ</span>
            </Button>
          </FormGroup>
          <p>
            ไม่ได้เป็นสมาชิกเว็บไซต์?
            <AuthButtonOther onClick={onClickOther}>
              สมัครสมาชิก
            </AuthButtonOther>
          </p>
        </LoginContainer>
      </Modal>
    </>
  )
}

export default Login
