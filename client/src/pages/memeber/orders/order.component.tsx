import Button from "../../../components/button/button.component"
import HeaderMember from "../../../components/header-member/header-member.component"
import OrderCard from "../../../components/order-card/order-card.component"
import { OrderContainer, SearchInputContainer } from "./order.styles"
import { BiSearch } from "react-icons/bi"

function Order() {
  return (
    <OrderContainer>
      <HeaderMember text='รายการสั่งซื้อ' />
      <SearchInputContainer>
        <input type='text' placeholder='ค้นหา Order' />
        <Button>
          <BiSearch />
          <span>ค้นหา</span>
        </Button>
      </SearchInputContainer>
      <div>
        <OrderCard />
        <OrderCard />
        <OrderCard />
      </div>
    </OrderContainer>
  )
}

export default Order
