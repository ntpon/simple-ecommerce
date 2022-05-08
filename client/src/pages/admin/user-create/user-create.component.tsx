import HeaderManage from "../../../components/header-manage/header-manage.component"
import UserForm from "../../../components/manages/user-form/user-form.component"

function UserCreate() {
  return (
    <div>
      <HeaderManage text='สร้างสมาชิกใหม่' link='/admin/user' />
      <UserForm />
    </div>
  )
}
export default UserCreate
