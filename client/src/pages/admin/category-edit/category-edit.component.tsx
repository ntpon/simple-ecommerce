import { useParams } from "react-router-dom"
import HeaderManage from "../../../components/header-manage/header-manage.component"
import CategoryForm from "../../../components/manages/category-form/category-form.component"

function CategoryEdit() {
  const { id } = useParams()

  return (
    <div>
      <HeaderManage text='แก้ไขประเภทสินค้า' link='/admin/category' />
      <CategoryForm isEdit={true} id={id} />
    </div>
  )
}
export default CategoryEdit
