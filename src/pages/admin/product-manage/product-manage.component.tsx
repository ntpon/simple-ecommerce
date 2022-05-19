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
import { BiEdit } from "react-icons/bi"
import { BsTrash } from "react-icons/bs"
import ConfirmModal from "../../../components/confirm-modal/confirm-modal.component"
import { useAppDispatch, useAppSelector } from "../../../store/store"
import { useEffect, useState } from "react"
import {
  deleteProduct,
  getProducts,
  reset,
} from "../../../store/product/product.slice"
import { toast } from "react-toastify"
import Skeleton from "react-loading-skeleton"
import IconButton from "../../../components/icon-button/icon-button.component"
import Avatar from "../../../components/avatar/avatar.component"
import imgProduct from "../../../assets/images/default-product.png"
import Pagination from "../../../components/pagination/pagination.component"
import usePagination from "../../../hooks/use-pagination"
function ProductManage() {
  const dispatch = useAppDispatch()
  const { handlePageChange, pageValue } = usePagination()
  const [showModal, setShowModal] = useState(false)
  const [authorToDelete, setAuthorToDelete] = useState("")
  const { products, isLoading, message, isSuccess, isError, totalPage } =
    useAppSelector((state) => state.product)
  useEffect(() => {
    dispatch(getProducts(pageValue))
  }, [pageValue, dispatch])

  useEffect(() => {
    if (isSuccess) {
      toast.success(message)
      dispatch(getProducts(pageValue))
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
    dispatch(deleteProduct(authorToDelete))
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
            <TableColumnHead>จัดการ</TableColumnHead>
          </TableRow>
        </Thead>
        <TableBody>
          {products &&
            products.map((product) => (
              <TableRow key={product._id}>
                <TableColumnItem>
                  {isLoading ? (
                    <Skeleton />
                  ) : (
                    <Avatar
                      image={
                        product.image?.url ? product.image?.url : imgProduct
                      }
                      avatarRadius={0}
                    />
                  )}
                </TableColumnItem>
                <TableColumnItem>
                  {isLoading ? <Skeleton /> : product.name}
                </TableColumnItem>
                <TableColumnItem>
                  {isLoading ? <Skeleton /> : product.name}
                </TableColumnItem>
                <TableColumnAction>
                  {isLoading ? (
                    <Skeleton />
                  ) : (
                    <>
                      <Link to={`/admin/product/edit/${product._id}`}>
                        <BiEdit />
                      </Link>
                      <IconButton
                        onClick={() => {
                          handleDeleteButton(product._id)
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
      {products && products.length > 0 && totalPage > 1 && (
        <Pagination
          page={pageValue}
          totalPages={totalPage}
          onPageChange={handlePageChange}
        />
      )}
    </>
  )
}
export default ProductManage
