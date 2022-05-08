import HeaderManage from "../../../components/header-manage/header-manage.component"
import CategoryForm from "../../../components/manages/category-form/category-form.component"

function CategoryCreate() {
  return (
    <div>
      <HeaderManage text='สร้างประเภทสินค้าใหม่' link='/admin/category' />
      <CategoryForm />
    </div>
  )
}
export default CategoryCreate
