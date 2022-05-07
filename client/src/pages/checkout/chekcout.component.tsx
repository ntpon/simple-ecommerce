import Header from "../../components/header/header.component"
import { BiCartAlt } from "react-icons/bi"
import { BsTrash } from "react-icons/bs"
import {
  ButtonContainer,
  CheckoutContainer,
  IconAction,
  ResultCheckout,
  ResultCheckoutContainer,
  ResultCheckoutRow,
  ResultCheckoutRowTotal,
} from "./checkout.styles"
import { books } from "../../book-data"
import NumberFormat from "react-number-format"
import {
  Table,
  TableBody,
  TableColumnHead,
  TableColumnItem,
  TableRow,
  Thead,
} from "../../components/table/table.styles"
import Button from "../../components/button/button.component"
function Checkout() {
  const book = books[0]
  return (
    <CheckoutContainer>
      <Header text='ตระกร้าสินค้า' icon={<BiCartAlt />} />
      <Table>
        <Thead>
          <TableRow>
            <TableColumnHead>สินค้า</TableColumnHead>
            <TableColumnHead>ราคา</TableColumnHead>
            <TableColumnHead>จำนวน</TableColumnHead>
            <TableColumnHead>รวม</TableColumnHead>
            <TableColumnHead></TableColumnHead>
          </TableRow>
        </Thead>
        <TableBody>
          <TableRow>
            <TableColumnItem>
              <img src={book.thumbnailUrl} alt='' />
            </TableColumnItem>
            <TableColumnItem>{book.title}</TableColumnItem>
            <TableColumnItem>
              <NumberFormat
                value={1250}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"฿"}
              />
            </TableColumnItem>
            <TableColumnItem>
              <input type='number' />
            </TableColumnItem>
            <TableColumnItem>
              <IconAction>
                <BsTrash />
              </IconAction>
            </TableColumnItem>
          </TableRow>
          <TableRow>
            <TableColumnItem>
              <img src={book.thumbnailUrl} alt='' />
            </TableColumnItem>
            <TableColumnItem>{book.title}</TableColumnItem>
            <TableColumnItem>
              <NumberFormat
                value={1250}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"฿"}
              />
            </TableColumnItem>
            <TableColumnItem>
              <input type='text' value={2} />
            </TableColumnItem>
            <TableColumnItem>
              <IconAction>
                <BsTrash />
              </IconAction>
            </TableColumnItem>
          </TableRow>
        </TableBody>
      </Table>
      <ResultCheckoutContainer>
        <ResultCheckout>
          <ResultCheckoutRow>
            <span>รวมราคาสินค้า : </span>
            <span>
              <NumberFormat
                value={1250}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"฿"}
              />
            </span>
          </ResultCheckoutRow>
          <ResultCheckoutRow>
            <span>ค่าจัดส่ง : </span>
            <span>
              <NumberFormat
                value={50}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"฿"}
              />
            </span>
          </ResultCheckoutRow>
          <ResultCheckoutRowTotal>
            <span>รวม : </span>
            <span>
              <NumberFormat
                value={1050}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"฿"}
              />
            </span>
          </ResultCheckoutRowTotal>
        </ResultCheckout>
      </ResultCheckoutContainer>
      <ButtonContainer>
        <Button>
          <span>สั่งซื้อและชำระเงิน</span>
        </Button>
      </ButtonContainer>
    </CheckoutContainer>
  )
}

export default Checkout
