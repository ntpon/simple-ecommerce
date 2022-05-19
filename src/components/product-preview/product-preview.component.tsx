import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination } from "swiper"

import {
  HeaderText,
  ProductPreviewContainer,
  ProductPreviewHeader,
} from "./product-preview.styles"
import ProductCard from "../product-card/product-card.component"
import { Products } from "../../store/shop/shop.type"
import Skeleton from "react-loading-skeleton"
export type ProductPreviewProps = {
  header: string
  numberShow: number
  products: Products | [] | undefined
  isLoading: boolean
}
function ProductPreview({
  header,
  products,
  numberShow,
  isLoading,
}: ProductPreviewProps) {
  return (
    <ProductPreviewContainer>
      <ProductPreviewHeader>
        {isLoading ? <Skeleton /> : <HeaderText>{header}</HeaderText>}
      </ProductPreviewHeader>
      <Swiper
        slidesPerView={2}
        spaceBetween={0}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className='product-swiper'
        breakpoints={{
          768: {
            slidesPerView: numberShow,
            spaceBetween: 30,
          },
        }}
      >
        {products &&
          products.map((product) => (
            <SwiperSlide>
              <ProductCard
                imageUrl={product.image.url}
                name={product.name}
                description={product.description}
                price={product.price}
                slug={product.slug}
                isLoading={isLoading}
                product={product}
              />
            </SwiperSlide>
          ))}
      </Swiper>
    </ProductPreviewContainer>
  )
}
export default ProductPreview
