import HeaderManage from "../../../components/header-manage/header-manage.component"
import OrderStatusCard from "../../../components/order-status-card/order-status-card.component"

function OrderStatusManage() {
  return (
    <div>
      <HeaderManage text='จัดการสถานะ Order' />
      <div>
        <OrderStatusCard />
        <OrderStatusCard />
        <OrderStatusCard />
      </div>
    </div>
  )
}
export default OrderStatusManage
