import Button from "../../button/button.component"
import FormGroup from "../../form-group/form-group.component"
import FormInput from "../../form-input/form-input.component"
import { ImageListType } from "react-images-uploading"
import { FormEvent, useEffect, useState } from "react"
import SingleImageUpload from "../../single-image-upload/single-image-upload.component"
import { Form, ImageContainer, InputContainer } from "../../form/form.styles"
import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../../store/store"
import {
  createAuthor,
  getAuthor,
  reset,
  updateAuthor,
} from "../../../store/author/author.slice"
import { toast } from "react-toastify"
import { AuthorFormData } from "../../../store/author/author.type"
import Spinner from "../../spinner/spinner.component"

type AuthorFormProps = {
  isEdit?: boolean
  id?: string
}

function AuthorForm({ isEdit, id = "" }: AuthorFormProps) {
  const [image, setImage] = useState<ImageListType>([])
  const [imagePreview, setImagePreview] = useState("")

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { author, isLoading, isError, isSuccess, message } = useAppSelector(
    (state) => state.author
  )
  useEffect(() => {
    if (isEdit) {
      dispatch(getAuthor(id))
    }
  }, [])

  useEffect(() => {
    if (isEdit && author) {
      setName(author.name)
      setDescription(author.description)
      setImagePreview(author.image.url)
    }
  }, [author])

  useEffect(() => {
    if (isError) {
      toast.error(message)
      dispatch(reset())
    }
    if (isSuccess) {
      console.log(message)
      toast.success(message)
      dispatch(reset())
    }
  }, [isError, isSuccess, message, dispatch])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const authorForm: AuthorFormData = {
      name,
      description,
      image: image[0] && image[0].file ? image[0].file : "",
    }
    if (isEdit) {
      dispatch(updateAuthor({ authorId: id, authorData: authorForm }))
    } else {
      dispatch(createAuthor(authorForm))
    }
  }

  const onChangeImage = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {
    setImage(imageList as never[])
  }

  return (
    <>
      {isLoading && <Spinner />}

      <Form onSubmit={handleSubmit} encType='multipart/form-data'>
        <InputContainer>
          <FormGroup>
            <FormInput
              label='ชื่อนักเขียน'
              required
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </FormGroup>
          <FormGroup>
            <FormInput
              label='รายละเอียด'
              inputType='textarea'
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
          </FormGroup>
          <Button type='submit'>
            <span>บันทึกข้อมูล</span>
          </Button>
        </InputContainer>
        <ImageContainer>
          <SingleImageUpload
            defaultImage={imagePreview}
            image={image}
            onChange={onChangeImage}
          />
        </ImageContainer>
      </Form>
    </>
  )
}

export default AuthorForm
