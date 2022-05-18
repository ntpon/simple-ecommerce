import Header from "../../components/header/header.component"
import { BiCartAlt } from "react-icons/bi"
import { BsTrash } from "react-icons/bs"
import {
  ButtonContainer,
  CheckoutContainer,
  IconAction,
  ResultCheckout,
  ResultCheckoutContainer,
  ResultCheckoutRow,
  ResultCheckoutRowTotal,
  TextNotFound,
} from "./checkout.styles"
import { books } from "../../book-data"
import NumberFormat from "react-number-format"
import {
  Table,
  TableBody,
  TableColumnHead,
  TableColumnItem,
  TableContainer,
  TableRow,
  Thead,
} from "../../components/table/table.styles"
import Button from "../../components/button/button.component"
import imgDefault from "../../assets/images/default-product.png"
import { useAppDispatch, useAppSelector } from "../../store/store"
import {
  createCheckout,
  deleteCart,
  reset,
  resetToDefault,
} from "../../store/checkout/checkout.slice"
import Spinner from "../../components/spinner/spinner.component"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import Register from "../../components/register/register.component"
import Login from "../../components/login/login.component"
function Checkout() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { products, isLoading, totalPrice, message, isError, isSuccess } =
    useAppSelector((state) => state.checkout)
  const { user } = useAppSelector((state) => state.auth)
  const [showLogin, setShowLogin] = useState(false)
  const [showRegister, setShowRegister] = useState(false)

  useEffect(() => {
    if (isSuccess) {
      toast.success(message)
      navigate("/member")
      dispatch(resetToDefault())
    }
    if (isError) {
      toast.error(message)
      dispatch(reset())
    }
  }, [isSuccess, isError])
  const handleOrderClick = () => {
    if (user) {
      dispatch(
        createCheckout({
          products: products.map((p) => {
            return { id: p._id, quantity: p.quantityInCart }
          }),
        })
      )
    } else {
      setShowLogin(true)
    }
  }
  return (
    <>
      {isLoading && <Spinner />}
      <CheckoutContainer>
        <Header text='ตระกร้าสินค้า' icon={<BiCartAlt />} />
        {products.length > 0 ? (
          <>
            <TableContainer>
              <Table>
                <Thead>
                  <TableRow>
                    <TableColumnHead colSpan={2}>สินค้า</TableColumnHead>
                    <TableColumnHead>ราคา</TableColumnHead>
                    <TableColumnHead>จำนวน</TableColumnHead>
                    <TableColumnHead>รวม</TableColumnHead>
                    <TableColumnHead></TableColumnHead>
                  </TableRow>
                </Thead>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product._id}>
                      <TableColumnItem>
                        <img
                          src={
                            product.image.url ? product.image.url : imgDefault
                          }
                          alt=''
                        />
                      </TableColumnItem>
                      <TableColumnItem>{product.name}</TableColumnItem>
                      <TableColumnItem>
                        <NumberFormat
                          value={product.price}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"฿"}
                        />
                      </TableColumnItem>
                      <TableColumnItem>
                        <span>{product.quantityInCart}</span>
                      </TableColumnItem>
                      <TableColumnItem>
                        <NumberFormat
                          value={product.total}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"฿"}
                        />
                      </TableColumnItem>
                      <TableColumnItem>
                        <IconAction
                          onClick={() => dispatch(deleteCart(product._id))}
                        >
                          <BsTrash />
                        </IconAction>
                      </TableColumnItem>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <ResultCheckoutContainer>
              <ResultCheckout>
                <ResultCheckoutRow>
                  <span>ราคาสินค้า : </span>
                  <span>
                    <NumberFormat
                      value={totalPrice}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"฿"}
                    />
                  </span>
                </ResultCheckoutRow>

                <ResultCheckoutRowTotal>
                  <span>รวม : </span>
                  <span>
                    <NumberFormat
                      value={totalPrice}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"฿"}
                    />
                  </span>
                </ResultCheckoutRowTotal>
              </ResultCheckout>
            </ResultCheckoutContainer>
            <ButtonContainer>
              <Button onClick={handleOrderClick}>
                <span>สั่งซื้อและชำระเงิน</span>
              </Button>
            </ButtonContainer>
          </>
        ) : (
          <TextNotFound>ไม่มีสินค้าอยู่ในตระกร้า</TextNotFound>
        )}
      </CheckoutContainer>

      {showLogin && (
        <Login
          open={showLogin}
          onClose={() => {
            setShowLogin(false)
          }}
          onClickOther={() => {
            setShowLogin(false)
            setShowRegister(true)
          }}
        />
      )}
      {showRegister && (
        <Register
          open={showRegister}
          onClose={() => {
            setShowRegister(false)
          }}
          onClickOther={() => {
            setShowLogin(true)
          }}
        />
      )}
    </>
  )
}

export default Checkout
