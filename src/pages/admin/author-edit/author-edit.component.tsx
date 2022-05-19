import { useParams } from "react-router-dom"
import HeaderManage from "../../../components/header-manage/header-manage.component"
import AuthorForm from "../../../components/manages/author-form/author-form.component"

function AuthorEdit() {
  const { id } = useParams()

  return (
    <div>
      <HeaderManage text='แก้ไขนักเขียน' link='/admin/author' />
      <AuthorForm isEdit={true} id={id} />
    </div>
  )
}
export default AuthorEdit
