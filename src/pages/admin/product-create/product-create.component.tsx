import HeaderManage from "../../../components/header-manage/header-manage.component"
import ProductForm from "../../../components/manages/product-form/product-form.component"

function ProductCreate() {
  return (
    <div>
      <HeaderManage text='สร้างสินค้าใหม่' link='/admin/product' />
      <ProductForm />
    </div>
  )
}
export default ProductCreate
