import { FormEvent, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { useAppDispatch, useAppSelector } from "../../../store/store"
import {
  createUser,
  getUser,
  reset,
  updateUser,
} from "../../../store/user/user.slice"
import { UserFormData } from "../../../store/user/user.type"
import Button from "../../button/button.component"
import FormGroup from "../../form-group/form-group.component"
import FormInput from "../../form-input/form-input.component"
import { FormManage } from "../../form/form.styles"
import Spinner from "../../spinner/spinner.component"

type UserFormProps = {
  isEdit?: boolean
  id?: string
}

function UserForm({ isEdit, id }: UserFormProps) {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [address, setAddress] = useState("")
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const { user, isLoading, isError, isSuccess, message } = useAppSelector(
    (state) => state.user
  )
  useEffect(() => {
    if (isEdit) {
      if (id) {
        dispatch(getUser(id))
      }
    }
  }, [])

  useEffect(() => {
    if (isEdit && user) {
      setFirstName(user.firstName)
      setLastName(user.lastName)
      setEmail(user.email)
      setPhoneNumber(user.phoneNumber)
      setAddress(user.address)
    }
  }, [user])

  useEffect(() => {
    if (isError) {
      toast.error(message)
      dispatch(reset())
    }
    if (isSuccess) {
      toast.success(message)
      if (!isEdit) {
        navigate("/admin/user")
      }
      dispatch(reset())
    }
  }, [isError, isSuccess, message, dispatch])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const userData: UserFormData = {
      email,
      firstName,
      lastName,
      phoneNumber,
      address,
    }

    if (!isEdit) {
      userData.password = password
    }

    if (isEdit) {
      if (id) {
        dispatch(updateUser({ userId: id, userData: userData }))
      }
    } else {
      dispatch(createUser(userData))
    }
  }

  return (
    <>
      {isLoading && <Spinner />}
      <FormManage onSubmit={handleSubmit}>
        <FormGroup>
          <FormInput
            label='ชื่อจริง'
            value={firstName}
            required
            onChange={(e) => setFirstName(e.target.value)}
          />
          <FormInput
            label='นามสกุล'
            value={lastName}
            required
            onChange={(e) => setLastName(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <FormInput
            label='อีเมล'
            value={email}
            type='email'
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormInput
            label='เบอร์โทรศัพท์'
            value={phoneNumber}
            required
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </FormGroup>
        {!isEdit && (
          <FormGroup>
            <FormInput
              label='รหัสผ่าน'
              type='password'
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormGroup>
        )}
        <FormGroup>
          <FormInput
            label='ที่อยู่'
            inputType='textarea'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </FormGroup>
        <Button type='submit'>
          <span>บันทึกข้อมูล</span>
        </Button>
      </FormManage>
    </>
  )
}

export default UserForm
