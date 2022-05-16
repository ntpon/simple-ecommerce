import {
  LeftContainer,
  OrderCardContainer,
  RightContainer,
  Text,
  TextContainer,
  TitleText,
} from "./order-card.styles"

import defaultImage from "../../assets/images/default-product.png"
import NumberFormat from "react-number-format"
import { CartItemStatus } from "../../store/cart-item/cart-items.type"
import { statusToThaiText } from "../../utils/store.utils"
import Skeleton from "react-loading-skeleton"
type OrderCartProps = {
  orderId?: string
  image?: string
  status?: CartItemStatus
  fullName?: string
  productName?: string
  address?: string
  quantity?: number
  totalPrice?: number
  updatedAt?: Date
  isLoading?: boolean
}
function OrderCard({
  image,
  orderId,
  status,
  productName,
  quantity,
  totalPrice,
  updatedAt,
  isLoading,
}: OrderCartProps) {
  return (
    <OrderCardContainer>
      <LeftContainer>
        {isLoading ? (
          <Skeleton />
        ) : (
          <img src={image ? image : defaultImage} alt='' />
        )}
      </LeftContainer>
      <RightContainer>
        {isLoading ? (
          <Skeleton />
        ) : (
          <TextContainer>
            <TitleText>สถานะ: </TitleText>
            <Text>{statusToThaiText(status)}</Text>
          </TextContainer>
        )}
        {isLoading ? (
          <Skeleton />
        ) : (
          <TextContainer>
            <TitleText>หมายเลขรายการ : </TitleText>
            <Text>#{orderId}</Text>
          </TextContainer>
        )}
        {isLoading ? (
          <Skeleton />
        ) : (
          <TextContainer>
            <TitleText>สินค้า / จำนวน: </TitleText>
            <Text>
              {productName} (จำนวน {quantity} เล่ม)
            </Text>
          </TextContainer>
        )}
        {isLoading ? (
          <Skeleton />
        ) : (
          <TextContainer>
            <TitleText>วันที่อัพเดทข้อมูล: </TitleText>
            {updatedAt && (
              <Text>{new Date(updatedAt).toLocaleDateString("th")}</Text>
            )}
          </TextContainer>
        )}

        {isLoading ? (
          <Skeleton />
        ) : (
          <TextContainer>
            <TitleText>จำนวนเงิน: </TitleText>
            <Text>
              <NumberFormat
                value={totalPrice}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"฿"}
              />
            </Text>
          </TextContainer>
        )}
      </RightContainer>
    </OrderCardContainer>
  )
}
export default OrderCard
