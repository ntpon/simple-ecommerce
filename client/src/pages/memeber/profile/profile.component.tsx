import { FormEvent, useEffect, useState } from "react"
import { toast } from "react-toastify"
import Button from "../../../components/button/button.component"
import FormInput from "../../../components/form-input/form-input.component"
import { Form, FormManage } from "../../../components/form/form.styles"
import HeaderMember from "../../../components/header-member/header-member.component"
import Spinner from "../../../components/spinner/spinner.component"
import {
  getProfile,
  reset,
  updateProfile,
} from "../../../store/auth/auth.slice"
import { Profile as ProfileType } from "../../../store/auth/auth.type"
import { useAppDispatch, useAppSelector } from "../../../store/store"
import { UserFormData } from "../../../store/user/user.type"
import {
  ProfileAddressContainer,
  ProfileContainer,
  ProfileDetailContainer,
} from "./profile.styles"

function Profile() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [address, setAddress] = useState("")
  const dispatch = useAppDispatch()
  const { profile, isLoading, isError, isSuccess, message } = useAppSelector(
    (state) => state.auth
  )
  useEffect(() => {
    dispatch(getProfile())
  }, [])

  useEffect(() => {
    if (profile) {
      setFirstName(profile.firstName)
      setLastName(profile.lastName)
      setEmail(profile.email)
      setPhoneNumber(profile.phoneNumber)
      setAddress(profile.address)
    }
  }, [profile])

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
    const userData: ProfileType = {
      email,
      firstName,
      lastName,
      phoneNumber,
      address,
    }
    dispatch(updateProfile(userData))
  }

  return (
    <>
      {isLoading && <Spinner />}
      <ProfileContainer>
        <HeaderMember text='ข้อมูลส่วนตัวผู้ใช้' />
        <Form onSubmit={handleSubmit}>
          <ProfileDetailContainer>
            <FormInput
              label='ชื่อจริง'
              value={firstName}
              required
              onChange={(e) => {
                setFirstName(e.target.value)
              }}
            />
            <FormInput
              label='นามสกุล'
              value={lastName}
              required
              onChange={(e) => {
                setLastName(e.target.value)
              }}
            />
          </ProfileDetailContainer>
          <ProfileDetailContainer>
            <FormInput
              label='อีเมล'
              value={email}
              required
              onChange={(e) => {
                setEmail(e.target.value)
              }}
            />
            <FormInput
              label='เบอร์โทรศัพท์'
              value={phoneNumber}
              required
              onChange={(e) => {
                setPhoneNumber(e.target.value)
              }}
            />
          </ProfileDetailContainer>
          <ProfileAddressContainer>
            <FormInput
              label='ที่อยู่'
              inputType='textarea'
              value={address}
              onChange={(e) => {
                setAddress(e.target.value)
              }}
            />
          </ProfileAddressContainer>
          <Button type='submit'>
            <span>บันทึกข้อมูล</span>
          </Button>
        </Form>
      </ProfileContainer>
    </>
  )
}
export default Profile
