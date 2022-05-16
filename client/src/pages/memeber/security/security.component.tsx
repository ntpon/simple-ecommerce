import { FormEvent, useEffect, useState } from "react"
import { toast } from "react-toastify"
import Button from "../../../components/button/button.component"
import FormInput from "../../../components/form-input/form-input.component"
import { Form } from "../../../components/form/form.styles"
import HeaderMember from "../../../components/header-member/header-member.component"
import { reset, updatePassword } from "../../../store/auth/auth.slice"
import { Password } from "../../../store/auth/auth.type"
import { useAppDispatch, useAppSelector } from "../../../store/store"
import { FormGroup, SecurityContainer } from "./security.styles"

function Security() {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [oldPassword, setOldPassword] = useState("")

  const { isError, isLoading, isSuccess, message } = useAppSelector(
    (state) => state.auth
  )
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (isError) {
      toast.error(message)

      dispatch(reset())
    }
    if (isSuccess) {
      toast.success(message)
      setPassword("")
      setOldPassword("")
      setConfirmPassword("")
      dispatch(reset())
    }
  }, [isError, isSuccess, message, dispatch])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      toast.error("ยืนยันรหัสผ่านไม่ถูกต้อง")
      return
    }
    const userPassword: Password = {
      oldPassword,
      password,
    }
    dispatch(updatePassword(userPassword))
  }

  return (
    <SecurityContainer>
      <HeaderMember text='ความปลอดภัยผู้ใช้' />
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <FormInput
            label='รหัสผ่านเก่า'
            type='password'
            value={oldPassword}
            required
            onChange={(e) => {
              setOldPassword(e.target.value)
            }}
          />
        </FormGroup>
        <FormGroup>
          <FormInput
            label='รหัสผ่านใหม่'
            type='password'
            value={password}
            required
            onChange={(e) => {
              setPassword(e.target.value)
            }}
          />
          <FormInput
            label='ยืนยันรหัสผ่าน'
            type='password'
            value={confirmPassword}
            required
            onChange={(e) => {
              setConfirmPassword(e.target.value)
            }}
          />
        </FormGroup>
        <Button type='submit'>
          <span>เปลี่ยนรหัสผ่าน</span>
        </Button>
      </Form>
    </SecurityContainer>
  )
}

export default Security
