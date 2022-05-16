import { FormEvent, useEffect, useState } from "react"
import { toast } from "react-toastify"
import {
  createPublisher,
  getPublisher,
  reset,
  updatePublisher,
} from "../../../store/publisher/publisher.slice"
import { PublisherFormData } from "../../../store/publisher/publisher.type"
import { useAppDispatch, useAppSelector } from "../../../store/store"
import Button from "../../button/button.component"
import FormGroup from "../../form-group/form-group.component"
import FormInput from "../../form-input/form-input.component"
import { FormManage } from "../../form/form.styles"
import Spinner from "../../spinner/spinner.component"

type PublisherFormProps = {
  isEdit?: boolean
  id?: string
}

function PublisherForm({ isEdit, id = "" }: PublisherFormProps) {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const dispatch = useAppDispatch()
  const { publisher, isLoading, isError, isSuccess, message } = useAppSelector(
    (state) => state.publisher
  )
  useEffect(() => {
    if (isEdit) {
      dispatch(getPublisher(id))
    }
  }, [])

  useEffect(() => {
    if (isEdit && publisher) {
      setName(publisher.name)
      setDescription(publisher.description)
    }
  }, [publisher])

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
    const publisherData: PublisherFormData = {
      name,
      description,
    }
    if (isEdit) {
      dispatch(
        updatePublisher({ publisherId: id, publisherData: publisherData })
      )
    } else {
      dispatch(createPublisher(publisherData))
    }
  }

  return (
    <>
      {isLoading && <Spinner />}
      <FormManage onSubmit={handleSubmit}>
        <FormGroup>
          <FormInput
            label='ชื่อสำนักพิมพ์'
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

export default PublisherForm
