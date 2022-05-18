import { BiCartAlt } from "react-icons/bi"
import NumberFormat from "react-number-format"
import { Link } from "react-router-dom"
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
import defaultImage from "../../assets/images/default-product.png"
import Skeleton from "react-loading-skeleton"
import { useAppDispatch, useAppSelector } from "../../store/store"
import { addToCart } from "../../store/checkout/checkout.slice"
import { Product } from "../../store/shop/shop.type"
import { ProductCheckout } from "../../store/checkout/checkout.type"
import { isAddToCard } from "../../utils/store.utils"

type ProductCardProps = {
  imageUrl: string
  name: string
  description: string
  price: number
  slug: string
  isLoading: boolean
  product: Product
}

function ProductCard({
  imageUrl,
  name,
  description,
  price,
  slug,
  isLoading,
  product,
}: ProductCardProps) {
  const dispatch = useAppDispatch()
  const { products } = useAppSelector((state) => state.checkout)
  return (
    <ProductCardContainer>
      <Link to={`/shop/show/${slug}`}>
        <ImageController>
          {isLoading ? (
            <Skeleton />
          ) : (
            <ImageProduct src={imageUrl ? imageUrl : defaultImage} alt='' />
          )}
        </ImageController>
        {isLoading ? <Skeleton /> : <NameText>{name}</NameText>}
        {isLoading ? (
          <Skeleton />
        ) : (
          <DescriptionText>{description}</DescriptionText>
        )}
        <ProductPriceContainer>
          {isLoading ? (
            <Skeleton />
          ) : (
            <span>
              <NumberFormat
                value={price}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"฿"}
              />
            </span>
          )}
        </ProductPriceContainer>
      </Link>
      {isLoading ? (
        <Skeleton />
      ) : (
        <ProductToCart>
          <Button
            onClick={() => dispatch(addToCart(product))}
            disabled={
              product.quantity <= 0 || isAddToCard(product._id, products)
            }
          >
            <BiCartAlt />
            <span>ใส่ตระกร้า</span>
          </Button>
        </ProductToCart>
      )}
    </ProductCardContainer>
  )
}

export default ProductCard
