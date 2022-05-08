import HeaderManage from "../../../components/header-manage/header-manage.component"
import Header from "../../../components/header/header.component"
import OrderStatusCard from "../../../components/order-status-card/order-status-card.component"
import {
  Table,
  TableBody,
  TableColumnAction,
  TableColumnHead,
  TableColumnItem,
  TableRow,
  Thead,
} from "../../../components/table/table.styles"

function OrderStatusShow() {
  return (
    <div>
      <HeaderManage
        text='สถานะ Order #123456'
        link='/admin/order-status'
        label='กลับ'
      />
      <OrderStatusCard isFullInformation />
      <HeaderManage text='รายการทั้งหมด' />
      <Table>
        <Thead>
          <TableRow>
            <TableColumnHead>หมายเลขรายการ</TableColumnHead>
            <TableColumnHead>สถานะ</TableColumnHead>
            <TableColumnHead>วันที่ทำรายการ</TableColumnHead>
          </TableRow>
        </Thead>
        <TableBody>
          <TableRow>
            <TableColumnItem>#123456</TableColumnItem>
            <TableColumnItem>รับเข้าสู่ระบบ</TableColumnItem>
            <TableColumnItem>
              {new Date().toLocaleDateString("th")}
            </TableColumnItem>
          </TableRow>
          <TableRow>
            <TableColumnItem>#123456</TableColumnItem>
            <TableColumnItem>จัดส่งสินค้า</TableColumnItem>
            <TableColumnItem>
              {new Date().toLocaleDateString("th")}
            </TableColumnItem>
          </TableRow>
          <TableRow>
            <TableColumnItem>#123456</TableColumnItem>
            <TableColumnItem>ส่งสินค้าสำเร็จ</TableColumnItem>
            <TableColumnItem>
              {new Date().toLocaleDateString("th")}
            </TableColumnItem>
          </TableRow>
          <TableRow>
            <TableColumnItem>#123456</TableColumnItem>
            <TableColumnItem>ยกเลิกสินค้า</TableColumnItem>
            <TableColumnItem>
              {new Date().toLocaleDateString("th")}
            </TableColumnItem>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}

export default OrderStatusShow
