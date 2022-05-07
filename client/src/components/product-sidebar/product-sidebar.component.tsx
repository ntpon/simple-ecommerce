import {
  Header,
  ProductItem,
  ProductListContainer,
  ProductSidebarContainer,
} from "./product-sidebar.styles"

function ProductSidebar() {
  return (
    <ProductSidebarContainer>
      <Header>หมวดหมู่หนังสือ</Header>
      <ProductListContainer>
        <ProductItem>ทั้งหมด</ProductItem>
        <ProductItem>วรรณกรรมเยาวชน</ProductItem>
        <ProductItem>วิชาการ/ความรู้</ProductItem>
        <ProductItem>คอมพิวเตอร์</ProductItem>
        <ProductItem>บทความ/สารคดี</ProductItem>
        <ProductItem>บ้านและสวน</ProductItem>
        <ProductItem>รวมเรื่องสั้น</ProductItem>
        <ProductItem>รวมเรื่องสั้น</ProductItem>
      </ProductListContainer>
    </ProductSidebarContainer>
  )
}

export default ProductSidebar
