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
import { useAppDispatch, useAppSelector } from "../../../store/store"
import { useEffect, useState } from "react"
import {
  deletePublisher,
  getPublishers,
  reset,
} from "../../../store/publisher/publisher.slice"
import { toast } from "react-toastify"
import Skeleton from "react-loading-skeleton"
import IconButton from "../../../components/icon-button/icon-button.component"
function PublisherManage() {
  const dispatch = useAppDispatch()
  const [showModal, setShowModal] = useState(false)
  const [publisherToDelete, setPublisherToDelete] = useState("")
  const { publishers, isLoading, message, isSuccess, isError } = useAppSelector(
    (state) => state.publisher
  )
  useEffect(() => {
    dispatch(getPublishers())
  }, [])

  useEffect(() => {
    if (isSuccess) {
      toast.success(message)
      dispatch(getPublishers())
      dispatch(reset())
    }
    if (isError) {
      toast.error(message)
      dispatch(reset())
    }
  }, [isSuccess, isError])

  const handleDeleteButton = (id: string) => {
    setPublisherToDelete(id)
    setShowModal(true)
  }

  const onSuccess = () => {
    dispatch(deletePublisher(publisherToDelete))
    setShowModal(false)
  }

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
            <TableColumnHead>จัดการ</TableColumnHead>
          </TableRow>
        </Thead>
        <TableBody>
          {publishers?.map((publisher) => (
            <TableRow key={publisher._id}>
              <TableColumnItem>
                {isLoading ? <Skeleton /> : publisher.name}
              </TableColumnItem>
              <TableColumnAction>
                {isLoading ? (
                  <Skeleton />
                ) : (
                  <>
                    <Link to={`/admin/publisher/edit/${publisher._id}`}>
                      <BiEdit />
                    </Link>
                    <IconButton
                      onClick={() => {
                        handleDeleteButton(publisher._id)
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
    </div>
  )
}
export default PublisherManage
