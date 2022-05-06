import { books } from "../../book-data"
import ProductPreview from "../../components/product-preview/product-preview.component"
import Promotion from "../../components/promotion/promotion.component"
import {
  BookSellContainer,
  HomeContainer,
  LeftContainer,
  PromotionFull,
  RightContainer,
} from "./home.styles"
function Home() {
  return (
    <HomeContainer>
      <PromotionFull>
        <Promotion />
      </PromotionFull>
      <ProductPreview header='หนังสือขายดี' products={books} numberShow={4} />
      <ProductPreview header='หนังสือมาใหม่' products={books} numberShow={4} />
      <BookSellContainer>
        <LeftContainer>
          <ProductPreview
            header='หนังสือแนะนำ'
            products={books}
            numberShow={2}
          />
        </LeftContainer>
        <RightContainer>
          <ProductPreview
            header='หนังสือวิทยาศาสตร์'
            products={books}
            numberShow={2}
          />
        </RightContainer>
      </BookSellContainer>
    </HomeContainer>
  )
}

export default Home
