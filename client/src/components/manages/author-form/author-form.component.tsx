import Button from "../../button/button.component"
import FormGroup from "../../form-group/form-group.component"
import FormInput from "../../form-input/form-input.component"
import { ImageListType } from "react-images-uploading"
import { useState } from "react"
import Avatar from "../../avatar/avatar.component"
import SingleImageUpload from "../../single-image-upload/single-image-upload.component"
import { Form, ImageContainer, InputContainer } from "../../form/form.styles"

type AuthorFormProps = {
  isEdit?: boolean
}

function AuthorForm({ isEdit }: AuthorFormProps) {
  const [image, setImage] = useState([])
  const onChangeImage = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {
    setImage(imageList as never[])
  }

  return (
    <Form>
      <InputContainer>
        <FormGroup>
          <FormInput label='ชื่อนักเขียน' />
        </FormGroup>
        <FormGroup>
          <FormInput label='รายละเอียด' inputType='textarea' />
        </FormGroup>
        <Button>
          <span>บันทึกข้อมูล</span>
        </Button>
      </InputContainer>

      <ImageContainer>
        <SingleImageUpload image={image} onChange={onChangeImage} />
      </ImageContainer>
    </Form>
  )
}

export default AuthorForm
