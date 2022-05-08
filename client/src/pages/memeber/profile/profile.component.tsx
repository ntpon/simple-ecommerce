import Button from "../../../components/button/button.component"
import FormInput from "../../../components/form-input/form-input.component"
import HeaderMember from "../../../components/header-member/header-member.component"
import {
  ProfileAddressContainer,
  ProfileContainer,
  ProfileDetailContainer,
} from "./profile.styles"

function Profile() {
  return (
    <ProfileContainer>
      <HeaderMember text='ข้อมูลส่วนตัวผู้ใช้' />
      <ProfileDetailContainer>
        <FormInput label='ชื่อจริง' />
        <FormInput label='นามสกุล' />
      </ProfileDetailContainer>
      <ProfileDetailContainer>
        <FormInput label='อีเมล' disabled />
        <FormInput label='เบอร์โทรศัพท์' />
      </ProfileDetailContainer>
      <ProfileAddressContainer>
        <FormInput label='ที่อยู่' inputType='textarea' />
      </ProfileAddressContainer>
      <Button>
        <span>บันทึกข้อมูล</span>
      </Button>
    </ProfileContainer>
  )
}
export default Profile
