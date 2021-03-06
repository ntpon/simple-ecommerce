import HeaderManage from "../../../components/header-manage/header-manage.component"
import { books } from "../../../book-data"

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
import { BiEdit } from "react-icons/bi"
import { BsTrash } from "react-icons/bs"
import Avatar from "../../../components/avatar/avatar.component"
import { useAppDispatch, useAppSelector } from "../../../store/store"
import { useEffect, useState } from "react"
import {
  deleteAuthor,
  getAuthors,
  reset,
} from "../../../store/author/author.slice"
import { toast } from "react-toastify"
import ConfirmModal from "../../../components/confirm-modal/confirm-modal.component"
import Skeleton from "react-loading-skeleton"
import IconButton from "../../../components/icon-button/icon-button.component"
import Pagination from "../../../components/pagination/pagination.component"
import usePagination from "../../../hooks/use-pagination"

function AuthorManage() {
  const dispatch = useAppDispatch()
  const { handlePageChange, pageValue } = usePagination()
  const [showModal, setShowModal] = useState(false)
  const [authorToDelete, setAuthorToDelete] = useState("")
  const { authors, isLoading, message, isSuccess, isError, totalPage } =
    useAppSelector((state) => state.author)
  useEffect(() => {
    dispatch(getAuthors(pageValue))
  }, [pageValue, dispatch])

  useEffect(() => {
    if (isSuccess) {
      toast.success(message)
      dispatch(getAuthors(pageValue))
      dispatch(reset())
    }
    if (isError) {
      toast.error(message)
      dispatch(reset())
    }
  }, [isSuccess, isError])

  const handleDeleteButton = (id: string) => {
    setAuthorToDelete(id)
    setShowModal(true)
  }

  const onSuccess = () => {
    dispatch(deleteAuthor(authorToDelete))
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
        text='??????????????????????????????????????????'
        link='/admin/author/create'
        label='???????????????????????????'
      />
      <TableContainer>
        <Table>
          <Thead>
            <TableRow>
              <TableColumnHead>??????????????????</TableColumnHead>
              <TableColumnHead>????????????????????????????????????</TableColumnHead>
              <TableColumnHead>??????????????????</TableColumnHead>
            </TableRow>
          </Thead>
          <TableBody>
            {authors?.map((author) => (
              <TableRow key={author._id}>
                <TableColumnItem>
                  {isLoading ? (
                    <Skeleton />
                  ) : (
                    <Avatar image={author.image?.url} />
                  )}
                </TableColumnItem>
                <TableColumnItem>
                  {isLoading ? <Skeleton /> : author.name}
                </TableColumnItem>
                <TableColumnAction>
                  {isLoading ? (
                    <Skeleton />
                  ) : (
                    <>
                      <Link to={`/admin/author/edit/${author._id}`}>
                        <BiEdit />
                      </Link>
                      <IconButton
                        onClick={() => {
                          handleDeleteButton(author._id)
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
      {authors && authors.length > 0 && totalPage > 1 && (
        <Pagination
          page={pageValue}
          totalPages={totalPage}
          onPageChange={handlePageChange}
        />
      )}
    </>
  )
}
export default AuthorManage
