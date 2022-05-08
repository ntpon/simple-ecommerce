import HeaderManage from "../../../components/header-manage/header-manage.component"
import UserForm from "../../../components/manages/user-form/user-form.component"

function UserEdit() {
  return (
    <div>
      <HeaderManage text='แก้ไขสมาชิก' link='/admin/user' />
      <UserForm />
    </div>
  )
}
export default UserEdit
