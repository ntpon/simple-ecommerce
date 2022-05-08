import Button from "../../button/button.component"
import FormGroup from "../../form-group/form-group.component"
import FormInput from "../../form-input/form-input.component"

type PublisherFormProps = {
  isEdit?: boolean
}

function PublisherForm({ isEdit }: PublisherFormProps) {
  return (
    <>
      <FormGroup>
        <FormInput label='ชื่อสำนักพิมพ์' />
      </FormGroup>
      <FormGroup>
        <FormInput label='รายละเอียด' inputType='textarea' />
      </FormGroup>
      <Button>
        <span>บันทึกข้อมูล</span>
      </Button>
    </>
  )
}

export default PublisherForm
