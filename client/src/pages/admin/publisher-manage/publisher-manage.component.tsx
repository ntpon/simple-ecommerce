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
function PublisherManage() {
  return (
    <div>
      <HeaderManage
        text='จัดการสำนักพิมพ์'
        link='/admin/publisher/create'
        label='สร้างใหม่'
      />
      <Table>
        <Thead>
          <TableRow>
            <TableColumnHead>ชื่อสำนักพิมพ์</TableColumnHead>
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
                <Link to='/admin/publisher/edit/12'>
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
export default PublisherManage
