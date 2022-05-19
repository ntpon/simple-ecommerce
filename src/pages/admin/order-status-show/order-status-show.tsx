import { useEffect } from "react"
import Skeleton from "react-loading-skeleton"
import { useParams } from "react-router-dom"
import HeaderManage from "../../../components/header-manage/header-manage.component"
import Header from "../../../components/header/header.component"
import OrderStatusCard from "../../../components/order-status-card/order-status-card.component"
import {
  Table,
  TableBody,
  TableColumnAction,
  TableColumnHead,
  TableColumnItem,
  TableContainer,
  TableRow,
  Thead,
} from "../../../components/table/table.styles"
import { getCartItem } from "../../../store/cart-item/cart-items.slice"
import { useAppDispatch, useAppSelector } from "../../../store/store"
import { statusToThaiText } from "../../../utils/store.utils"

function OrderStatusShow() {
  const dispatch = useAppDispatch()
  const { id } = useParams()
  const { cartItem, orders, isLoading, isError, isSuccess, message } =
    useAppSelector((state) => state.cartItem)

  useEffect(() => {
    dispatch(getCartItem(id || ""))
  }, [])

  return (
    <>
      <HeaderManage
        text={`สถานะรายการ ${id}`}
        link='/admin/order-status'
        label='กลับ'
      />
      {cartItem && (
        <OrderStatusCard
          isFullInformation
          orderId={cartItem._id}
          fullName={cartItem.user.firstName + " " + cartItem.user.lastName}
          image={cartItem.product?.image?.url}
          totalPrice={cartItem.totalPrice}
          status={cartItem.status}
          productName={cartItem.product.name}
          quantity={cartItem.quantity}
          createdAt={new Date(cartItem.createdAt)}
          updatedAt={new Date(cartItem.updatedAt)}
          address={cartItem.user.address}
          isLoading={isLoading}
        />
      )}
      <HeaderManage text='รายการทั้งหมด' />
      <TableContainer>
        <Table>
          <Thead>
            <TableRow>
              <TableColumnHead>หมายเลขรายการ</TableColumnHead>
              <TableColumnHead>สถานะ</TableColumnHead>
              <TableColumnHead>วันที่ทำรายการ</TableColumnHead>
            </TableRow>
          </Thead>
          <TableBody>
            {orders?.map((order) => (
              <TableRow>
                <TableColumnItem>
                  {isLoading ? <Skeleton /> : order._id}
                </TableColumnItem>
                <TableColumnItem>
                  {isLoading ? <Skeleton /> : statusToThaiText(order.status)}
                </TableColumnItem>
                <TableColumnItem>
                  {isLoading ? (
                    <Skeleton />
                  ) : (
                    new Date(order.createdAt).toLocaleDateString("th")
                  )}
                </TableColumnItem>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default OrderStatusShow
