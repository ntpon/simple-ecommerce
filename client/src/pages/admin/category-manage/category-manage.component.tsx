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
import { BiEdit } from "react-icons/bi"
import { BsTrash } from "react-icons/bs"
import { useAppDispatch, useAppSelector } from "../../../store/store"
import { useEffect, useState } from "react"
import {
  deleteCategory,
  getCategories,
  reset,
} from "../../../store/category/category.slice"
import IconButton from "../../../components/icon-button/icon-button.component"
import { toast } from "react-toastify"
import ConfirmModal from "../../../components/confirm-modal/confirm-modal.component"
import Skeleton from "react-loading-skeleton"
import Pagination from "../../../components/pagination/pagination.component"
import usePagination from "../../../hooks/use-pagination"

function CategoryManage() {
  const dispatch = useAppDispatch()
  const { handlePageChange, pageValue } = usePagination()
  const [showModal, setShowModal] = useState(false)
  const [categoryToDelete, setCategoryToDelete] = useState("")
  const { categories, isLoading, message, isSuccess, isError, totalPage } =
    useAppSelector((state) => state.category)
  useEffect(() => {
    dispatch(getCategories(pageValue))
  }, [pageValue, dispatch])

  useEffect(() => {
    if (isSuccess) {
      toast.success(message)
      dispatch(getCategories(pageValue))
      dispatch(reset())
    }
    if (isError) {
      toast.error(message)
      dispatch(reset())
    }
  }, [isSuccess, isError])

  const handleDeleteButton = (id: string) => {
    setCategoryToDelete(id)
    setShowModal(true)
  }

  const onSuccess = () => {
    dispatch(deleteCategory(categoryToDelete))
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
        text='??????????????????????????????????????????????????????'
        link='/admin/category/create'
        label='???????????????????????????'
      />
      <TableContainer>
        <Table>
          <Thead>
            <TableRow>
              <TableColumnHead>
                {isLoading ? <Skeleton /> : "??????????????????"}
              </TableColumnHead>
              <TableColumnHead>
                {isLoading ? <Skeleton /> : "??????????????????"}
              </TableColumnHead>
            </TableRow>
          </Thead>
          <TableBody>
            {categories?.map((category) => (
              <TableRow key={category._id}>
                <TableColumnItem>
                  {isLoading ? <Skeleton /> : category.name}
                </TableColumnItem>
                <TableColumnAction>
                  {isLoading ? (
                    <Skeleton />
                  ) : (
                    <>
                      <Link to={`/admin/category/edit/${category._id}`}>
                        <BiEdit />
                      </Link>
                      <IconButton
                        onClick={() => {
                          handleDeleteButton(category._id)
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
      {categories && categories.length > 0 && totalPage > 1 && (
        <Pagination
          page={pageValue}
          totalPages={totalPage}
          onPageChange={handlePageChange}
        />
      )}
    </>
  )
}
export default CategoryManage
