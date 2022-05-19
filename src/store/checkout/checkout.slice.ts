import { AxiosError } from "axios"
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import checkoutService from "./checkout.service"
import { Error } from "../../types/fetch-data.type"
import { CheckoutData, CheckoutState, ProductCheckout } from "./checkout.type"
import { Product } from "../shop/shop.type"
const initialState: CheckoutState = {
  products: [],
  totalPrice: 0,
  totalProducts: 0,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
}
export const createCheckout = createAsyncThunk(
  "category/update",
  async (checkoutData: CheckoutData, thunkAPI) => {
    try {
      return await checkoutService.creatCheckout(checkoutData)
    } catch (error) {
      const err = error as AxiosError<Error>
      return thunkAPI.rejectWithValue(err.response?.data.error)
    }
  }
)
export const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    reset: (state: CheckoutState) => {
      state.isError = false
      state.isSuccess = false
      state.isLoading = false
      state.message = ""
    },
    resetToDefault: (state: CheckoutState) => {
      state.products = []
      state.totalPrice = 0
      state.totalProducts = 0
      state.isError = false
      state.isSuccess = false
      state.isLoading = false
      state.message = ""
    },
    addToCart: (state: CheckoutState, action: PayloadAction<Product>) => {
      const foundItem = state.products.find(
        (item) => item._id === action.payload._id
      )

      if (!foundItem) {
        state.products.push({ ...action.payload, quantityInCart: 1, total: 0 })
      } else {
        state.products = state.products.map((item) => ({
          ...item,
          quantityInCart:
            item._id === foundItem._id
              ? item.quantityInCart + 1
              : item.quantityInCart,
        }))
      }

      // calculate
      state.products = state.products.map((product) => {
        return { ...product, total: product.price * product.quantityInCart }
      })

      state.totalProducts = state.products.reduce((prev, curr) => {
        return prev + curr.quantityInCart
      }, 0)

      state.totalPrice = state.products.reduce((prev, curr) => {
        return prev + curr.total
      }, 0)

      return state
    },
    deleteCart: (state: CheckoutState, action: PayloadAction<string>) => {
      state.products = state.products.filter(
        (item) => item._id !== action.payload
      )
      // calculate
      state.products = state.products.map((product) => {
        return { ...product, total: product.price * product.quantityInCart }
      })

      state.totalProducts = state.products.reduce((prev, curr) => {
        return prev + curr.quantityInCart
      }, 0)

      state.totalPrice = state.products.reduce((prev, curr) => {
        return prev + curr.total
      }, 0)

      return state
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createCheckout.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(createCheckout.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.message = action.payload.message as string
    })
    builder.addCase(createCheckout.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload as string
    })
  },
})

export const { reset, addToCart, deleteCart, resetToDefault } =
  checkoutSlice.actions
