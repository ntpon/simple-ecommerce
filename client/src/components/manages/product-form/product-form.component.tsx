import { useState } from "react"
import Button from "../../button/button.component"
import FormGroup from "../../form-group/form-group.component"
import FormInput from "../../form-input/form-input.component"
import SingleImageUpload from "../../single-image-upload/single-image-upload.component"
import { ImageListType } from "react-images-uploading"
import defaultImage from "../../../assets/images/default-product.png"
import {
  Form,
  FormInputContainer,
  ImageContainer,
  InputContainer,
  Label,
} from "../../form/form.styles"
import MultiImageUpload from "../../multi-image-upload/multi-image-upload.component"
import Select from "react-select"
type ProductFormProps = {
  isEdit?: boolean
}
const authorOptions = [
  { value: "1", label: "นักเขียน 1" },
  { value: "2", label: "นักเขียน 2" },
  { value: "3", label: "นักเขียน 3" },
]
const categoryOptions = [
  { value: "1", label: "ประเภทสินค้า 1" },
  { value: "2", label: "ประเภทสินค้า 2" },
  { value: "3", label: "ประเภทสินค้า 3" },
]
function ProductForm({ isEdit }: ProductFormProps) {
  const [image, setImage] = useState([])
  const [images, setImages] = useState([])
  const onChangeImage = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {
    setImage(imageList as never[])
  }
  const onChangeMutiImage = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {
    setImages(imageList as never[])
  }

  return (
    <Form>
      <InputContainer>
        <FormGroup>
          <FormInput label='ชื่อสินค้า' />
        </FormGroup>
        <FormGroup>
          <ImageContainer style={{ alignItems: "flex-start" }}>
            <span>รูปภาพสินค้าที่เกี่ยวข้อง (สูงสุด 4 ภาพ)</span>
            <MultiImageUpload
              images={images}
              onChange={onChangeMutiImage}
              avatarRadius={0}
              defaultImage={defaultImage}
            />
          </ImageContainer>
        </FormGroup>
        <FormGroup>
          <FormInputContainer>
            <Label>ประเภทสินค้า</Label>
            <Select
              isMulti
              options={categoryOptions}
              className='form-select'
              placeholder=''
            />
          </FormInputContainer>
        </FormGroup>
        <FormGroup>
          <FormInputContainer>
            <Label>ผู้เขียน</Label>
            <Select
              isMulti
              options={authorOptions}
              className='form-select'
              placeholder=''
            />
          </FormInputContainer>
        </FormGroup>
        <FormGroup>
          <FormInput label='สำนักพิมพ์' />
        </FormGroup>
        <FormGroup>
          <FormInput label='ราคา' type='number' min={1} />
        </FormGroup>
        <FormGroup>
          <FormInput label='จำนวนที่มี' type='number' min={1} />
        </FormGroup>
        <FormGroup>
          <FormInput label='รายละเอียด' inputType='textarea' />
        </FormGroup>

        <Button>
          <span>บันทึกข้อมูล</span>
        </Button>
      </InputContainer>
      <ImageContainer>
        <span>รูปภาพหลัก</span>
        <SingleImageUpload
          image={image}
          onChange={onChangeImage}
          avatarRadius={0}
          defaultImage={defaultImage}
        />
      </ImageContainer>
    </Form>
  )
}

export default ProductForm
