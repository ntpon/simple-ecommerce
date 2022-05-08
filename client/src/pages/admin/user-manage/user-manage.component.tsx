import { BsTrash } from "react-icons/bs"
import { BiEdit } from "react-icons/bi"
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
import { Link } from "react-router-dom"

function UserManage() {
  return (
    <div>
      <HeaderManage
        text='จัดการสมาชิก'
        link='/admin/user/create'
        label='สร้างใหม่'
      />
      <Table>
        <Thead>
          <TableRow>
            <TableColumnHead>ชื่อ</TableColumnHead>
            <TableColumnHead>นามสกุล</TableColumnHead>
            <TableColumnHead>อีเมล</TableColumnHead>
            <TableColumnHead>จัดการ</TableColumnHead>
          </TableRow>
        </Thead>
        <TableBody>
          <TableRow>
            <TableColumnItem>Nattapon</TableColumnItem>
            <TableColumnItem>Suetrong</TableColumnItem>
            <TableColumnItem>ntpon@gamil.com</TableColumnItem>
            <TableColumnAction>
              <Link to='/admin/user/edit/12'>
                <BiEdit />
              </Link>
              <BsTrash />
            </TableColumnAction>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}
export default UserManage
