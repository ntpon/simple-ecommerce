import HeaderManage from "../../../components/header-manage/header-manage.component"
import { books } from "../../../book-data"

import {
  Table,
  TableBody,
  TableColumnAction,
  TableColumnHead,
  TableColumnItem,
  TableRow,
  Thead,
} from "../../../components/table/table.styles"
import { Link } from "react-router-dom"
import { BiEdit } from "react-icons/bi"
import { BsTrash } from "react-icons/bs"
import Avatar from "../../../components/avatar/avatar.component"

function AuthorManage() {
  return (
    <div>
      <HeaderManage
        text='จัดการนักเขียน'
        link='/admin/author/create'
        label='สร้างใหม่'
      />
      <Table>
        <Thead>
          <TableRow>
            <TableColumnHead>รูปภาพ</TableColumnHead>
            <TableColumnHead>ชื่อนักเขียน</TableColumnHead>
            <TableColumnHead>สถานะ</TableColumnHead>
            <TableColumnHead>จัดการ</TableColumnHead>
          </TableRow>
        </Thead>
        <TableBody>
          {books.map((book) => (
            <TableRow>
              <TableColumnItem>
                <Avatar />
              </TableColumnItem>
              <TableColumnItem>{book.authors}</TableColumnItem>
              <TableColumnItem>ใช้งาน</TableColumnItem>
              <TableColumnAction>
                <Link to='/admin/author/edit/12'>
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
export default AuthorManage
