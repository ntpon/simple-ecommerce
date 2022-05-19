import { useParams } from "react-router-dom"
import HeaderManage from "../../../components/header-manage/header-manage.component"
import ProductForm from "../../../components/manages/product-form/product-form.component"

function ProductEdit() {
  const { id } = useParams()
  return (
    <div>
      <HeaderManage text='แก้ไขสินค้า' link='/admin/product' />
      <ProductForm isEdit id={id} />
    </div>
  )
}
export default ProductEdit
