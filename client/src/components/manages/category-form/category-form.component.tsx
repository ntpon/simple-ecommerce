import Button from "../../button/button.component"
import FormGroup from "../../form-group/form-group.component"
import FormInput from "../../form-input/form-input.component"

type CategoryFormProps = {
  isEdit?: boolean
}

function CategoryForm({ isEdit }: CategoryFormProps) {
  return (
    <>
      <FormGroup>
        <FormInput label='ชื่อประเภทสินค้า' />
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

export default CategoryForm
