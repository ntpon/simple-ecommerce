import { FreeMode, Navigation, Thumbs } from "swiper"
import { useEffect, useState } from "react"
import p1Img from "../../assets/images/product-1.png"
import p2Img from "../../assets/images/product-2.png"
import p3Img from "../../assets/images/product-3.png"
import p4Img from "../../assets/images/product-4.png"
import {
  AddToCardContainer,
  ButtonContainer,
  DetailContainer,
  ImageContainer,
  ImageShow,
  ImageThumbnail,
  ImageThumbnailContainer,
  ListContainer,
  PriceText,
  ShopDetailContainer,
  ShortText,
  TitleContainer,
} from "./shop-detail.styles"
import NumberFormat from "react-number-format"
import Button from "../../components/button/button.component"
import { BiCartAlt } from "react-icons/bi"
import { useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../store/store"
import { getProductInShop } from "../../store/shop/shop.slice"
import defaultImage from "../../assets/images/default-product.png"
import Skeleton from "react-loading-skeleton"
import { addToCart } from "../../store/checkout/checkout.slice"
import { ProductCheckout } from "../../store/checkout/checkout.type"
import { isAddToCard } from "../../utils/store.utils"
function ShopDetail() {
  const { slug } = useParams()
  const dispatch = useAppDispatch()
  const { isLoading, product } = useAppSelector((state) => state.shop)
  const { products } = useAppSelector((state) => state.checkout)
  const [images, setImages] = useState<string[]>()
  const [indexImage, setIndexImage] = useState(0)

  useEffect(() => {
    if (slug) {
      dispatch(getProductInShop(slug))
    }
  }, [slug, dispatch])

  useEffect(() => {
    if (product) {
      setImages([
        product.image.url ? product.image.url : defaultImage,
        ...product.images.map((image) => image.url),
      ])
    }
  }, [product])

  return (
    <ShopDetailContainer>
      {product && (
        <>
          <ImageContainer>
            <ImageShow>
              {isLoading ? (
                <Skeleton />
              ) : (
                <img src={images && images[indexImage]} alt='' />
              )}
            </ImageShow>
            <ImageThumbnailContainer>
              {images &&
                images.map((image, index) =>
                  isLoading ? (
                    <Skeleton />
                  ) : (
                    <ImageThumbnail onClick={() => setIndexImage(index)}>
                      <img src={image} alt='' />
                    </ImageThumbnail>
                  )
                )}
            </ImageThumbnailContainer>
          </ImageContainer>
          <DetailContainer>
            {isLoading ? (
              <Skeleton />
            ) : (
              <TitleContainer>
                <h2>{product.name}</h2>
                <p>
                  ผู้เขียน :{" "}
                  <span>
                    {product.authors.map((author, index) =>
                      index > 0 ? "," + author.name : author.name
                    )}
                  </span>
                </p>
              </TitleContainer>
            )}
            {isLoading ? (
              <Skeleton />
            ) : (
              <PriceText>
                <NumberFormat
                  value={product.price}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"฿"}
                />
              </PriceText>
            )}
            {isLoading ? (
              <Skeleton />
            ) : (
              <ShortText>
                เรื่องย่อ :<span>{product.description}</span>
              </ShortText>
            )}
            {isLoading ? (
              <Skeleton />
            ) : (
              <ListContainer>
                <li>รหัสสินค้า: {product._id}</li>
                <li>
                  หมวดหมู่:
                  <span>
                    {product.categories.map((category, index) =>
                      index > 0 ? "," + category.name : category.name
                    )}
                  </span>
                </li>
                <li>
                  สำนักพิมพ์: <span>{product.publisher.name}</span>
                </li>
              </ListContainer>
            )}
            {isLoading ? (
              <Skeleton />
            ) : (
              <AddToCardContainer>
                <label htmlFor='qty'>จำนวนที่มี</label>
                <input
                  id='qty'
                  type='number'
                  value={product.quantity}
                  disabled
                />
                <ButtonContainer>
                  <Button
                    onClick={() => {
                      dispatch(addToCart(product))
                    }}
                    disabled={
                      product.quantity <= 0 ||
                      isAddToCard(product._id, products)
                    }
                  >
                    <BiCartAlt />
                    <span>ใส่ตระกร้า</span>
                  </Button>
                </ButtonContainer>
              </AddToCardContainer>
            )}
          </DetailContainer>
        </>
      )}
    </ShopDetailContainer>
  )
}

export default ShopDetail
