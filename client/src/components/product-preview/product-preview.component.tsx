import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination } from "swiper"

import {
  HeaderText,
  ProductPreviewContainer,
  ProductPreviewHeader,
} from "./product-preview.styles"
import ProductCard from "../product-card/product-card.component"
export type ProductPreviewProps = {
  header: string
  numberShow: number
  products: {
    title: string
    isbn: string
    pageCount: number
    publishedDate: any
    thumbnailUrl: string
    shortDescription: string
    longDescription: string
    status: string
    authors: string[]
    categories: string[]
  }[]
}
function ProductPreview({ header, products, numberShow }: ProductPreviewProps) {
  return (
    <ProductPreviewContainer>
      <ProductPreviewHeader>
        <HeaderText>{header}</HeaderText>
      </ProductPreviewHeader>
      <Swiper
        slidesPerView={numberShow}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className='product-swiper'
      >
        {products.map((product) => (
          <SwiperSlide>
            <ProductCard
              imageUrl={product.thumbnailUrl}
              name={product.title}
              description={product.shortDescription}
              price={250}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </ProductPreviewContainer>
  )
}
export default ProductPreview
