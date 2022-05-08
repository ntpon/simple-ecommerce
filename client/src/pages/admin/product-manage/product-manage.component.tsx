import HeaderManage from "../../../components/header-manage/header-manage.component"
import {
  Table,
  TableBody,
  TableColumnAction,
  TableColumnHead,
  TableColumnItem,
  TableRow,
  Thead,
} from "../../../components/table/table.styles"
import { books } from "../../../book-data"
import { Link } from "react-router-dom"
import { BiEdit } from "react-icons/bi"
import { BsTrash } from "react-icons/bs"
function ProductManage() {
  return (
    <div>
      <HeaderManage
        text='จัดการสินค้า'
        link='/admin/product/create'
        label='สร้างใหม่'
      />
      <Table>
        <Thead>
          <TableRow>
            <TableColumnHead>รูปภาพ</TableColumnHead>
            <TableColumnHead>สินค้า</TableColumnHead>
            <TableColumnHead>จำนวนที่มี/จำนวนทั้งหมด</TableColumnHead>
            <TableColumnHead>สถานะ</TableColumnHead>
            <TableColumnHead>จัดการ</TableColumnHead>
          </TableRow>
        </Thead>
        <TableBody>
          {books.map((book) => (
            <TableRow>
              <TableColumnItem>
                <img src={book.thumbnailUrl} alt='' />
              </TableColumnItem>
              <TableColumnItem>{book.title}</TableColumnItem>
              <TableColumnItem>10/20</TableColumnItem>
              <TableColumnItem>ใช้งาน</TableColumnItem>
              <TableColumnAction>
                <Link to='/admin/product/edit/12'>
                  <BiEdit />
                </Link>
                <BsTrash />
              </TableColumnAction>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
export default ProductManage
