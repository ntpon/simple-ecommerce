import HeaderManage from "../../../components/header-manage/header-manage.component"
import CategoryForm from "../../../components/manages/category-form/category-form.component"
import PublisherForm from "../../../components/manages/publisher-form/publisher-form.component"

function PublisherEdit() {
  return (
    <div>
      <HeaderManage text='แก้ไขสำนักพิมพ์' link='/admin/publisher' />
      <PublisherForm />
    </div>
  )
}
export default PublisherEdit
