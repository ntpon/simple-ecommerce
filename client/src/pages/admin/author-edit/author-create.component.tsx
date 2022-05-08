import HeaderManage from "../../../components/header-manage/header-manage.component"
import AuthorForm from "../../../components/manages/author-form/author-form.component"

function AuthorEdit() {
  return (
    <div>
      <HeaderManage text='แก้ไขนักเขียน' link='/admin/author' />
      <AuthorForm />
    </div>
  )
}
export default AuthorEdit
