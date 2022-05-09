import { useState } from "react"
import Button from "../button/button.component"
import FormGroup from "../form-group/form-group.component"
import FormInput from "../form-input/form-input.component"
import { AuthButtonOther } from "../form/form.styles"
import Modal from "../modal/modal.component"
import { LoginContainer } from "./login.styles"
type LoginProps = {
  open: boolean
  onClose: () => void
  onClickOther: () => void
}
function Login({ open, onClickOther, onClose }: LoginProps) {
  return (
    <Modal open={open} onClose={onClose}>
      <LoginContainer>
        <h2>เข้าสู่ระบบ</h2>
        <FormGroup>
          <FormInput label='อีเมล' />
        </FormGroup>
        <FormGroup>
          <FormInput label='รหัสผ่าน' />
        </FormGroup>
        <FormGroup horizontal center>
          <Button>
            <span>เข้าสู่ระบบ</span>
          </Button>
        </FormGroup>
        <p>
          ไม่ได้เป็นสมาชิกเว็บไซต์?
          <AuthButtonOther onClick={onClickOther}>สมัครสมาชิก</AuthButtonOther>
        </p>
      </LoginContainer>
    </Modal>
  )
}

export default Login
