import HeaderManage from "../../../components/header-manage/header-manage.component"
import CategoryForm from "../../../components/manages/category-form/category-form.component"

function CategoryEdit() {
  return (
    <div>
      <HeaderManage text='แก้ไขประเภทสินค้า' link='/admin/category' />
      <CategoryForm />
    </div>
  )
}
export default CategoryEdit
