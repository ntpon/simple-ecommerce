import HeaderManage from "../../../components/header-manage/header-manage.component"
import PublisherForm from "../../../components/manages/publisher-form/publisher-form.component"

function PublisherCreate() {
  return (
    <div>
      <HeaderManage text='สร้างสำนักพิมพ์' link='/admin/category' />
      <PublisherForm />
    </div>
  )
}
export default PublisherCreate
