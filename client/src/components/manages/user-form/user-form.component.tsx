import Button from "../../button/button.component"
import FormGroup from "../../form-group/form-group.component"
import FormInput from "../../form-input/form-input.component"

type UserFormProps = {
  isEdit?: boolean
}

function UserForm({ isEdit }: UserFormProps) {
  return (
    <>
      <FormGroup>
        <FormInput label='ชื่อจริง' />
        <FormInput label='นามสกุล' />
      </FormGroup>
      <FormGroup>
        <FormInput label='อีเมล' disabled />
        <FormInput label='เบอร์โทรศัพท์' />
      </FormGroup>
      <FormGroup>
        <FormInput label='ที่อยู่' inputType='textarea' />
      </FormGroup>
      <Button>
        <span>บันทึกข้อมูล</span>
      </Button>
    </>
  )
}

export default UserForm
