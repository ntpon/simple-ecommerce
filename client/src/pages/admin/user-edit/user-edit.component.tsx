import { useParams } from "react-router-dom"
import HeaderManage from "../../../components/header-manage/header-manage.component"
import UserForm from "../../../components/manages/user-form/user-form.component"

function UserEdit() {
  const { id } = useParams()
  return (
    <div>
      <HeaderManage text='แก้ไขสมาชิก' link='/admin/user' />
      <UserForm isEdit id={id} />
    </div>
  )
}
export default UserEdit
