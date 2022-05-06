import { BiCartAlt } from "react-icons/bi"
import NumberFormat from "react-number-format"
import Button from "../button/button.component"
import {
  DescriptionText,
  ImageController,
  ImageProduct,
  NameText,
  ProductCardContainer,
  ProductPriceContainer,
  ProductToCart,
} from "./product-card.styles"
type ProductCardProps = {
  imageUrl: string
  name: string
  description: string
  price: number
}

function ProductCard({ imageUrl, name, description, price }: ProductCardProps) {
  return (
    <ProductCardContainer>
      <ImageController>
        <ImageProduct src={imageUrl} alt='' />
      </ImageController>
      <NameText>{name}</NameText>
      <DescriptionText>{description}</DescriptionText>
      <ProductPriceContainer>
        <span>
          <NumberFormat
            value={price}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"฿"}
          />
        </span>
      </ProductPriceContainer>
      <ProductToCart>
        <Button>
          <BiCartAlt />
          <span>ใส่ตระกร้า</span>
        </Button>
      </ProductToCart>
    </ProductCardContainer>
  )
}

export default ProductCard
