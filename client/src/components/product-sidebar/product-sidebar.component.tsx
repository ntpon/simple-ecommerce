import { useParams } from "react-router-dom"
import { Categories } from "../../store/category/category.type"
import {
  Header,
  ProductItem,
  ProductListContainer,
  ProductSidebarContainer,
} from "./product-sidebar.styles"

type ProductSidebarProps = {
  categories: Categories | [] | undefined
}
function ProductSidebar({ categories = [] }: ProductSidebarProps) {
  const { slug } = useParams()
  return (
    <ProductSidebarContainer>
      <Header>หมวดหมู่หนังสือ</Header>
      <ProductListContainer>
        <ProductItem to='/shop' end>
          ทั้งหมด
        </ProductItem>
        {categories.map((category) => (
          <ProductItem
            className={slug === category.slug ? "active" : ""}
            key={category._id}
            to={`/shop/${category.slug}`}
          >
            {category.name}
          </ProductItem>
        ))}
        {/* <ProductItem>วิชาการ/ความรู้</ProductItem>
        <ProductItem>คอมพิวเตอร์</ProductItem>
        <ProductItem>บทความ/สารคดี</ProductItem>
        <ProductItem>บ้านและสวน</ProductItem>
        <ProductItem>รวมเรื่องสั้น</ProductItem> */}
        {/* <ProductItem>รวมเรื่องสั้น</ProductItem> */}
      </ProductListContainer>
    </ProductSidebarContainer>
  )
}

export default ProductSidebar
