import {
  LeftContainer,
  OrderCardContainer,
  RightContainer,
  Text,
  TextContainer,
  TitleText,
} from "./order-card.styles"

import { books } from "../../book-data"
import NumberFormat from "react-number-format"

function OrderCard() {
  const book = books[0]
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
          <TitleText>วันที่อัพเดทข้อมูล: </TitleText>
          <Text>{new Date().toLocaleDateString("th")}</Text>
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
      </RightContainer>
    </OrderCardContainer>
  )
}
export default OrderCard
