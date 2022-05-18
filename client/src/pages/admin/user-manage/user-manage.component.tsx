import { BsTrash } from "react-icons/bs"
import { BiEdit } from "react-icons/bi"
import HeaderManage from "../../../components/header-manage/header-manage.component"
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
import { Link } from "react-router-dom"
import ConfirmModal from "../../../components/confirm-modal/confirm-modal.component"
import { deleteUser, getUsers, reset } from "../../../store/user/user.slice"
import { useAppDispatch, useAppSelector } from "../../../store/store"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import Skeleton from "react-loading-skeleton"
import IconButton from "../../../components/icon-button/icon-button.component"

function UserManage() {
  const dispatch = useAppDispatch()
  const [showModal, setShowModal] = useState(false)
  const [userToDelete, setUserToDelete] = useState("")
  const { users, isLoading, message, isSuccess, isError } = useAppSelector(
    (state) => state.user
  )
  useEffect(() => {
    dispatch(getUsers())
  }, [])

  useEffect(() => {
    if (isSuccess) {
      toast.success(message)
      dispatch(getUsers())
      dispatch(reset())
    }
    if (isError) {
      toast.error(message)
      dispatch(reset())
    }
  }, [isSuccess, isError])

  const handleDeleteButton = (id: string) => {
    setUserToDelete(id)
    setShowModal(true)
  }

  const onSuccess = () => {
    dispatch(deleteUser(userToDelete))
    setShowModal(false)
  }

  return (
    <>
      {showModal && (
        <ConfirmModal
          showModal={showModal}
          onClose={() => setShowModal(false)}
          onSuccess={onSuccess}
        />
      )}
      <HeaderManage
        text='จัดการสมาชิก'
        link='/admin/user/create'
        label='สร้างใหม่'
      />
      <TableContainer>
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
            {users?.map((user) => (
              <TableRow key={user._id}>
                <TableColumnItem>
                  {isLoading ? <Skeleton /> : user.firstName}
                </TableColumnItem>
                <TableColumnItem>
                  {isLoading ? <Skeleton /> : user.lastName}
                </TableColumnItem>
                <TableColumnItem>
                  {isLoading ? <Skeleton /> : user.email}
                </TableColumnItem>
                <TableColumnAction>
                  {isLoading ? (
                    <Skeleton />
                  ) : (
                    <>
                      <Link to={`/admin/user/edit/${user._id}`}>
                        <BiEdit />
                      </Link>
                      <IconButton
                        onClick={() => {
                          handleDeleteButton(user._id)
                        }}
                      >
                        <BsTrash />
                      </IconButton>
                    </>
                  )}
                </TableColumnAction>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
export default UserManage
