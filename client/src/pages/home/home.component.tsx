import { useEffect } from "react"
import { books } from "../../book-data"
import ProductPreview from "../../components/product-preview/product-preview.component"
import Promotion from "../../components/promotion/promotion.component"
import { getProductsForHomeIndex } from "../../store/shop/shop.slice"
import { useAppDispatch, useAppSelector } from "../../store/store"
import {
  BookSellContainer,
  HomeContainer,
  LeftContainer,
  PromotionFull,
  RightContainer,
} from "./home.styles"
function Home() {
  const dispatch = useAppDispatch()
  const {
    isLoading,
    recommendProducts,
    newProducts,
    sciProducts,
    sellProducts,
  } = useAppSelector((state) => state.shop)

  useEffect(() => {
    dispatch(getProductsForHomeIndex())
  }, [])
  return (
    <HomeContainer>
      <PromotionFull>
        <Promotion />
      </PromotionFull>
      {sellProducts && sellProducts.length > 0 && (
        <ProductPreview
          isLoading={isLoading}
          header='หนังสือขายดี'
          products={sellProducts}
          numberShow={4}
        />
      )}
      {newProducts && newProducts.length > 0 && (
        <ProductPreview
          isLoading={isLoading}
          header='หนังสือมาใหม่'
          products={newProducts}
          numberShow={4}
        />
      )}
      <BookSellContainer>
        <LeftContainer>
          {recommendProducts && recommendProducts.length > 0 && (
            <ProductPreview
              isLoading={isLoading}
              header='หนังสือแนะนำ'
              products={recommendProducts}
              numberShow={2}
            />
          )}
        </LeftContainer>
        <RightContainer>
          {sciProducts && sciProducts.length > 0 && (
            <ProductPreview
              isLoading={isLoading}
              header='หนังสือวิทยาศาสตร์'
              products={sciProducts}
              numberShow={2}
            />
          )}
        </RightContainer>
      </BookSellContainer>
    </HomeContainer>
  )
}

export default Home
