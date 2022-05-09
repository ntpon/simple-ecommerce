import Button from "../button/button.component"
import FormGroup from "../form-group/form-group.component"
import FormInput from "../form-input/form-input.component"
import { AuthButtonOther } from "../form/form.styles"
import Modal from "../modal/modal.component"
import { RegisterContainer } from "./register.styles"
type RegisterProps = {
  open: boolean
  onClose: () => void
  onClickOther: () => void
}
function Register({ open, onClickOther, onClose }: RegisterProps) {
  return (
    <Modal open={open} onClose={onClose}>
      <RegisterContainer>
        <h2>สมัครสมาชิก</h2>
        <FormGroup horizontal>
          <FormInput label='ชื่อจริง' />
          <FormInput label='นามสกุล' />
        </FormGroup>
        <FormGroup horizontal>
          <FormInput label='อีเมล (ใช้เข้าสู่ระบบ)' />
          <FormInput label='เบอร์โทรศัพท์' placeholder='0xxxxxxxx' />
        </FormGroup>
        <FormGroup horizontal>
          <FormInput label='รหัสผ่าน' />
          <FormInput label='ยืนยันรหัสผ่าน' />
        </FormGroup>
        <FormGroup horizontal center>
          <Button>
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
  )
}
export default Register
