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

type OrderStatusCardProps = {
  isFullInformation?: boolean
}

function OrderStatusCard({ isFullInformation = false }: OrderStatusCardProps) {
  const book = books[0]
  let navigate = useNavigate()

  return (
    <OrderCardContainer>
      <LeftContainer>
        <img src={book.thumbnailUrl} alt='' />
      </LeftContainer>
      <RightContainer>
        <TextContainer>
          <TitleText>สถานะ: </TitleText>
          <Text>Not Processed</Text>
        </TextContainer>
        <TextContainer>
          <TitleText>หมายเลขรายการ : </TitleText>
          <Text>#{book.isbn}</Text>
        </TextContainer>
        <TextContainer>
          <TitleText>สินค้า / จำนวน: </TitleText>
          <Text>{book.title} (จำนวน 3 เล่ม)</Text>
        </TextContainer>
        <TextContainer>
          <TitleText>จำนวนเงิน: </TitleText>
          <Text>
            <NumberFormat
              value={1200}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"฿"}
            />
          </Text>
        </TextContainer>
        <TextContainer>
          <TitleText>ชื่อผู้สั่งซื้อ : </TitleText>
          <Text>วิทยาคม อยู่รักษา</Text>
        </TextContainer>
        {isFullInformation && (
          <TextContainer>
            <TitleText>ที่อยู่ : </TitleText>
            <Text>
              บ้านเลขที่ 122 หมู่บ้าน เอี่ยมสุข ซอย ลาดพร้าว หมู่ 8 ตำบล ดอนทราย
              อำเภอ ปากท่อ จังหวัด ราชบุรี รหัสไปรษณีย์
            </Text>
          </TextContainer>
        )}
        <TextContainer>
          <TitleText>วันที่ได้รับข้อมูล: </TitleText>
          <Text>{new Date().toLocaleDateString("th")}</Text>
        </TextContainer>
        <TextContainer>
          <TitleText>วันที่อัพเดทข้อมูล: </TitleText>
          <Text>{new Date().toLocaleDateString("th")}</Text>
        </TextContainer>
      </RightContainer>
      <LeftContainer>
        {!isFullInformation && (
          <Button
            onClick={() => {
              navigate("/admin/order-status/12")
            }}
          >
            <span>ดูรายละเอียด</span>
          </Button>
        )}
        <Button>
          <span>ยืนยันการจัดส่ง</span>
        </Button>
        <Button>
          <span>ยกเลิก Order</span>
        </Button>
      </LeftContainer>
    </OrderCardContainer>
  )
}
export default OrderStatusCard
