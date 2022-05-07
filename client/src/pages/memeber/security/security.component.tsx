import Button from "../../../components/button/button.component"
import FormInput from "../../../components/form-input/form-input.component"
import HeaderMember from "../../../components/header-member/header-member.component"
import { FormGroup, SecurityContainer } from "./security.styles"

function Security() {
  return (
    <SecurityContainer>
      <HeaderMember text='ความปลอดภัยผู้ใช้' />
      <FormGroup>
        <FormInput label='รหัสผ่านเก่า' />
      </FormGroup>
      <FormGroup>
        <FormInput label='รหัสผ่านใหม่' />
        <FormInput label='ยืนยันรหัสผ่าน' />
      </FormGroup>
      <Button>
        <span>เปลี่ยนรหัสผ่าน</span>
      </Button>
    </SecurityContainer>
  )
}

export default Security
