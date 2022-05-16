import {
  Address,
  LeftContainer,
  OrderCardContainer,
  RightContainer,
  Text,
  TextContainer,
  TitleText,
} from "./order-status-card.styles"

import { books } from "../../book-data"
import NumberFormat from "react-number-format"
import Button from "../button/button.component"
import { useNavigate } from "react-router-dom"
import defaultImage from "../../assets/images/default-product.png"
import Skeleton from "react-loading-skeleton"
import { statusToNextStatus, statusToThaiText } from "../../utils/store.utils"
import { CartItemStatus } from "../../store/cart-item/cart-items.type"
type OrderStatusCardProps = {
  isFullInformation?: boolean
  orderId?: string
  image?: string
  status?: CartItemStatus
  fullName?: string
  productName?: string
  address?: string
  quantity?: number
  totalPrice?: number
  createdAt?: Date
  updatedAt?: Date
  isLoading?: boolean
  onCancel?: () => void
  onUpdateStatus?: () => void
}

function OrderStatusCard({
  isFullInformation = false,
  orderId,
  image,
  status,
  fullName,
  address,
  productName,
  quantity,
  totalPrice,
  createdAt,
  updatedAt,
  isLoading,
  onCancel,
  onUpdateStatus,
}: OrderStatusCardProps) {
  let navigate = useNavigate()

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
        {isLoading ? (
          <Skeleton />
        ) : (
          <TextContainer>
            <TitleText>ชื่อผู้สั่งซื้อ : </TitleText>
            <Text>{fullName}</Text>
          </TextContainer>
        )}
        {isFullInformation &&
          (isLoading ? (
            <Skeleton />
          ) : (
            <TextContainer>
              <TitleText>ที่อยู่ : </TitleText>
              <Text>{address}</Text>
            </TextContainer>
          ))}
        {isLoading ? (
          <Skeleton />
        ) : (
          <TextContainer>
            <TitleText>วันที่ได้รับข้อมูล: </TitleText>
            <Text>{createdAt?.toLocaleDateString("th")}</Text>
          </TextContainer>
        )}
        {isLoading ? (
          <Skeleton />
        ) : (
          <TextContainer>
            <TitleText>วันที่อัพเดทข้อมูล: </TitleText>
            <Text>{updatedAt?.toLocaleDateString("th")}</Text>
          </TextContainer>
        )}
      </RightContainer>
      <LeftContainer>
        {!isFullInformation &&
          (isLoading ? (
            <Skeleton />
          ) : (
            <Button
              onClick={() => {
                navigate(`/admin/order-status/${orderId}`)
              }}
            >
              <span>ดูรายละเอียด</span>
            </Button>
          ))}
        {isLoading ? (
          <Skeleton />
        ) : (
          status !== "Cancelled" &&
          status !== "Delivered" && (
            <Button onClick={onUpdateStatus}>
              <span>
                อัพเดทสถานะ {statusToThaiText(statusToNextStatus(status))}
              </span>
            </Button>
          )
        )}
        {isLoading ? (
          <Skeleton />
        ) : (
          status !== "Cancelled" && (
            <Button onClick={onCancel}>
              <span>ยกเลิก สินค้า</span>
            </Button>
          )
        )}
      </LeftContainer>
    </OrderCardContainer>
  )
}
export default OrderStatusCard
