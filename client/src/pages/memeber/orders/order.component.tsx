import Button from "../../../components/button/button.component"
import HeaderMember from "../../../components/header-member/header-member.component"
import OrderCard from "../../../components/order-card/order-card.component"
import { OrderContainer, SearchInputContainer } from "./order.styles"
import { BiSearch } from "react-icons/bi"
import { useAppDispatch, useAppSelector } from "../../../store/store"
import { CartItemOrder } from "../../../store/cart-item-order/cart-item-order.type"
import { useEffect } from "react"
import { getCartItemOrders } from "../../../store/cart-item-order/cart-item-order.slice"

function Order() {
  const dispatch = useAppDispatch()
  const { isError, isLoading, isSuccess, cartItemOrders } = useAppSelector(
    (state) => state.cartItemOrder
  )
  useEffect(() => {
    dispatch(getCartItemOrders())
  }, [])
  return (
    <OrderContainer>
      <HeaderMember text='รายการสั่งซื้อ' />
      <SearchInputContainer>
        <input type='text' placeholder='ค้นหา Order' />
        <Button>
          <BiSearch size={16} />
        </Button>
      </SearchInputContainer>
      <div>
        {cartItemOrders?.map((cartItemOrder: CartItemOrder) => (
          <OrderCard
            key={cartItemOrder._id}
            productName={cartItemOrder.product.name}
            quantity={cartItemOrder.quantity}
            image={cartItemOrder.product.image.url}
            updatedAt={cartItemOrder.updatedAt}
            totalPrice={cartItemOrder.totalPrice}
            status={cartItemOrder.status}
            orderId={cartItemOrder._id}
            isLoading={isLoading}
          />
        ))}
      </div>
    </OrderContainer>
  )
}

export default Order
