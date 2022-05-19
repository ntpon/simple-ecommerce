import bannerImg1 from "../../assets/images/banner-1.jpg"
import bannerImg2 from "../../assets/images/banner-2.jpg"
import bannerImg3 from "../../assets/images/banner-3.jpg"
import {
  LeftContainer,
  PromotionContainer,
  RightContainer,
} from "./promotion.styles"

function Promotion() {
  return (
    <PromotionContainer>
      <LeftContainer>
        <img src={bannerImg3} alt='' />
      </LeftContainer>
      <RightContainer>
        <img src={bannerImg2} alt='' />
        <img src={bannerImg1} alt='' />
      </RightContainer>
    </PromotionContainer>
  )
}
export default Promotion
