import Button from "../../../components/button/button.component"
import HeaderMember from "../../../components/header-member/header-member.component"
import OrderCard from "../../../components/order-card/order-card.component"
import { OrderContainer, SearchInputContainer } from "./order.styles"
import { BiSearch } from "react-icons/bi"
import { useAppDispatch, useAppSelector } from "../../../store/store"
import { CartItemOrder } from "../../../store/cart-item-order/cart-item-order.type"
import { useEffect } from "react"
import { getCartItemOrders } from "../../../store/cart-item-order/cart-item-order.slice"
import Pagination from "../../../components/pagination/pagination.component"
import { useNavigate, useSearchParams } from "react-router-dom"
import usePagination from "../../../hooks/use-pagination"
import { TextNotFound } from "../../checkout/checkout.styles"

function Order() {
  const dispatch = useAppDispatch()
  const [searchParams] = useSearchParams()
  const { handlePageChange, pageValue } = usePagination()
  const { isError, isLoading, isSuccess, cartItemOrders, totalPage } =
    useAppSelector((state) => state.cartItemOrder)

  useEffect(() => {
    dispatch(getCartItemOrders(pageValue))
  }, [pageValue, dispatch])

  return (
    <OrderContainer>
      <HeaderMember text='รายการสั่งซื้อ' />
      {/* <SearchInputContainer>
        <input type='text' placeholder='ค้นหา Order' />
        <Button>
          <BiSearch size={16} />
        </Button>
      </SearchInputContainer> */}
      <div>
        {cartItemOrders &&
          cartItemOrders.map((cartItemOrder: CartItemOrder) => (
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
        {cartItemOrders && cartItemOrders.length > 0 && totalPage > 1 && (
          <Pagination
            page={Number(pageValue) || 1}
            totalPages={totalPage}
            onPageChange={handlePageChange}
          />
        )}
        {cartItemOrders && cartItemOrders.length === 0 && (
          <TextNotFound>ยังไม่มีการสั่งซื้อสินค้า</TextNotFound>
        )}
      </div>
    </OrderContainer>
  )
}

export default Order
