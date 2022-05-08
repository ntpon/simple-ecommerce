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
function CategoryManage() {
  return (
    <div>
      <HeaderManage
        text='จัดการประเภทสินค้า'
        link='/admin/category/create'
        label='สร้างใหม่'
      />
      <Table>
        <Thead>
          <TableRow>
            <TableColumnHead>ประเภท</TableColumnHead>
            <TableColumnHead>สถานะ</TableColumnHead>
            <TableColumnHead>จัดการ</TableColumnHead>
          </TableRow>
        </Thead>
        <TableBody>
          {books.map((book) => (
            <TableRow>
              <TableColumnItem>{book.title}</TableColumnItem>
              <TableColumnItem>ใช้งาน</TableColumnItem>
              <TableColumnAction>
                <Link to='/admin/category/edit/12'>
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
export default CategoryManage
