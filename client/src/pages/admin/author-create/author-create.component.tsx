import HeaderManage from "../../../components/header-manage/header-manage.component"
import AuthorForm from "../../../components/manages/author-form/author-form.component"

function AuthorCreate() {
  return (
    <div>
      <HeaderManage text='สร้างประเภทผู้เขียนใหม่' link='/admin/author' />
      <AuthorForm />
    </div>
  )
}
export default AuthorCreate
