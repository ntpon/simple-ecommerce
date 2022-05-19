import { FormEvent, useEffect, useState } from "react"
import { register, reset } from "../../store/auth/auth.slice"
import { useAppDispatch, useAppSelector } from "../../store/store"
import Button from "../button/button.component"
import FormGroup from "../form-group/form-group.component"
import FormInput from "../form-input/form-input.component"
import { AuthButtonOther } from "../form/form.styles"
import Modal from "../modal/modal.component"
import { RegisterContainer } from "./register.styles"
import { toast } from "react-toastify"
import { UserData } from "../../store/auth/auth.type"
import Spinner from "../spinner/spinner.component"
type RegisterProps = {
  open: boolean
  onClose: () => void
  onClickOther: () => void
}
function Register({ open, onClickOther, onClose }: RegisterProps) {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
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
    console.log("submit")
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !phoneNumber
    ) {
      toast.error("กรุณากรอกข้อมูลทั้งหมด")
      return
    }
    if (password !== confirmPassword) {
      toast.error("ยืนยันรหัสผ่านไม่ถูกต้อง")
      return
    }
    const user: UserData = {
      firstName,
      lastName,
      phoneNumber,
      email,
      password,
    }
    dispatch(register(user))
  }

  return (
    <>
      {isLoading && <Spinner />}
      <Modal open={open} onClose={onClose}>
        <RegisterContainer onSubmit={handleSubmit}>
          <h2>สมัครสมาชิก</h2>
          <FormGroup horizontal>
            <FormInput
              label='ชื่อจริง'
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value)
              }}
              required
            />
            <FormInput
              label='นามสกุล'
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value)
              }}
              required
            />
          </FormGroup>
          <FormGroup horizontal>
            <FormInput
              label='อีเมล (ใช้เข้าสู่ระบบ)'
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
              type='email'
              required
            />
            <FormInput
              label='เบอร์โทรศัพท์'
              value={phoneNumber}
              onChange={(e) => {
                setPhoneNumber(e.target.value)
              }}
              required
            />
          </FormGroup>
          <FormGroup horizontal>
            <FormInput
              label='รหัสผ่าน'
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
              }}
              type='password'
              required
            />
            <FormInput
              label='ยืนยันรหัสผ่าน'
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value)
              }}
              type='password'
              required
            />
          </FormGroup>
          <FormGroup horizontal center>
            <Button type='submit'>
              <span>สมัครสมาชิก</span>
            </Button>
          </FormGroup>
          <p>
            เป็นสมาชิกเว็บไซต์อยู่แล้ว?
            <AuthButtonOther
              onClick={() => {
                onClose()
                onClickOther()
              }}
            >
              เข้าสู่ระบบ
            </AuthButtonOther>
          </p>
        </RegisterContainer>
      </Modal>
    </>
  )
}
export default Register
