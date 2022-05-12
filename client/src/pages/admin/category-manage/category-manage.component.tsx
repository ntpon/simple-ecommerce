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
  deleteCategory,
  getCategories,
  reset,
} from "../../../store/category/category.slice"
import IconButton from "../../../components/icon-button/icon-button.component"
import { toast } from "react-toastify"
import ConfirmModal from "../../../components/confirm-modal/confirm-modal.component"
import Spinner from "../../../components/spinner/spinner.component"
import Skeleton from "react-loading-skeleton"

function CategoryManage() {
  const dispatch = useAppDispatch()
  const [showModal, setShowModal] = useState(false)
  const [categoryToDelete, setCategoryToDelete] = useState("")
  const { categories, isLoading, message, isSuccess, isError } = useAppSelector(
    (state) => state.category
  )
  useEffect(() => {
    dispatch(getCategories())
  }, [])

  useEffect(() => {
    if (isSuccess) {
      toast.success(message)
      dispatch(getCategories())
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
      <ConfirmModal
        showModal={showModal}
        onClose={() => setShowModal(false)}
        onSuccess={onSuccess}
      />
      <HeaderManage
        text='จัดการประเภทสินค้า'
        link='/admin/category/create'
        label='สร้างใหม่'
      />

      <Table>
        <Thead>
          <TableRow>
            <TableColumnHead>
              {isLoading ? <Skeleton /> : "ประเภท"}
            </TableColumnHead>
            <TableColumnHead>
              {isLoading ? <Skeleton /> : "จัดการ"}
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
    </>
  )
}
export default CategoryManage
