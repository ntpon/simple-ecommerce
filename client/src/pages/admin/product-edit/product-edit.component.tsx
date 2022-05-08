import HeaderManage from "../../../components/header-manage/header-manage.component"
import ProductForm from "../../../components/manages/product-form/product-form.component"

function ProductEdit() {
  return (
    <div>
      <HeaderManage text='แก้ไขสินค้า' link='/admin/product' />
      <ProductForm />
    </div>
  )
}
export default ProductEdit
