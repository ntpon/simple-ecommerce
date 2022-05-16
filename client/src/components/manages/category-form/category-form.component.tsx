import { FormEvent, useEffect, useState } from "react"
import {
  createCategory,
  getCategory,
  reset,
  updateCategory,
} from "../../../store/category/category.slice"
import { CategoryFormData } from "../../../store/category/category.type"
import { useAppDispatch, useAppSelector } from "../../../store/store"
import Button from "../../button/button.component"
import FormGroup from "../../form-group/form-group.component"
import FormInput from "../../form-input/form-input.component"
import { Form, FormManage } from "../../form/form.styles"
import Spinner from "../../spinner/spinner.component"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

type CategoryFormProps = {
  isEdit?: boolean
  id?: string
}

function CategoryForm({ isEdit, id = "" }: CategoryFormProps) {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { category, isLoading, isError, isSuccess, message } = useAppSelector(
    (state) => state.category
  )
  useEffect(() => {
    if (isEdit) {
      dispatch(getCategory(id))
    }
  }, [])

  useEffect(() => {
    if (isEdit && category) {
      setName(category.name)
      setDescription(category.description)
    }
  }, [category])

  useEffect(() => {
    if (isError) {
      toast.error(message)
      dispatch(reset())
    }
    if (isSuccess) {
      toast.success(message)
      dispatch(reset())
    }
  }, [isError, isSuccess, message, dispatch])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const categoryForm: CategoryFormData = {
      name,
      description,
    }
    if (isEdit) {
      dispatch(updateCategory({ categoryId: id, categoryData: categoryForm }))
    } else {
      dispatch(createCategory(categoryForm))
    }
  }

  return (
    <>
      {isLoading && <Spinner />}
      <FormManage onSubmit={handleSubmit}>
        <FormGroup>
          <FormInput
            label='ชื่อประเภทสินค้า'
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
      </FormManage>
    </>
  )
}

export default CategoryForm
