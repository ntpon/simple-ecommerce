import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import ConfirmModal from "../../../components/confirm-modal/confirm-modal.component"
import HeaderManage from "../../../components/header-manage/header-manage.component"
import OrderStatusCard from "../../../components/order-status-card/order-status-card.component"
import Pagination from "../../../components/pagination/pagination.component"
import usePagination from "../../../hooks/use-pagination"
import {
  getCartItems,
  reset,
  updateCartItem,
} from "../../../store/cart-item/cart-items.slice"
import { CartItemStatus } from "../../../store/cart-item/cart-items.type"
import { deleteCategory } from "../../../store/category/category.slice"
import { useAppDispatch, useAppSelector } from "../../../store/store"
import { statusToNextStatus } from "../../../utils/store.utils"

function OrderStatusManage() {
  const dispatch = useAppDispatch()
  const { handlePageChange, pageValue } = usePagination()

  const [showModal, setShowModal] = useState(false)
  const [cartItemToUpdate, setCartItemToUpdate] = useState("")
  const [typeProcess, setTypeProcess] = useState<CartItemStatus>()
  const { cartItems, isLoading, message, isSuccess, isError, totalPage } =
    useAppSelector((state) => state.cartItem)
  useEffect(() => {
    dispatch(getCartItems(pageValue))
  }, [pageValue])

  useEffect(() => {
    if (isSuccess) {
      toast.success(message)
      dispatch(getCartItems(pageValue))
      dispatch(reset())
    }
    if (isError) {
      toast.error(message)
      dispatch(reset())
    }
  }, [isSuccess, isError])

  const handleUpdateStatus = (cartItemId: string, status: CartItemStatus) => {
    setCartItemToUpdate(cartItemId)
    setTypeProcess(status)
    setShowModal(true)
  }

  const onSuccess = () => {
    dispatch(
      updateCartItem({
        cartItemId: cartItemToUpdate,
        cartItemStatus: typeProcess,
      })
    )
    setShowModal(false)
  }

  // const handleUpdateStatus = (cartItemId: string, status: string) => {
  //   console.log(cartItemId)
  //   console.log(status)
  // }
  return (
    <>
      {showModal && (
        <ConfirmModal
          showModal={showModal}
          onClose={() => setShowModal(false)}
          onSuccess={onSuccess}
        />
      )}
      <HeaderManage text='จัดการสถานะ Order' />
      <div>
        {cartItems?.map((cartItem) => (
          <OrderStatusCard
            key={cartItem._id}
            orderId={cartItem._id}
            fullName={cartItem.user.firstName + " " + cartItem.user.lastName}
            image={cartItem.product.image.url}
            totalPrice={cartItem.totalPrice}
            status={cartItem.status}
            productName={cartItem.product.name}
            quantity={cartItem.quantity}
            createdAt={new Date(cartItem.createdAt)}
            updatedAt={new Date(cartItem.updatedAt)}
            address={cartItem.user.address}
            isLoading={isLoading}
            onUpdateStatus={() =>
              handleUpdateStatus(
                cartItem._id,
                statusToNextStatus(cartItem.status)
              )
            }
            onCancel={() => {
              handleUpdateStatus(cartItem._id, "Cancelled")
            }}
          />
        ))}
        {cartItems && cartItems.length > 0 && totalPage > 1 && (
          <Pagination
            page={pageValue}
            totalPages={totalPage}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </>
  )
}
export default OrderStatusManage
