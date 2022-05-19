import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { AxiosError } from "axios"
import cartItemOrders from "./cart-item-order.service"
import { CartItemOrderState } from "./cart-item-order.type"
import { Error } from "../../types/fetch-data.type"

const initialState: CartItemOrderState = {
  cartItemOrders: [],
  totalPage: 0,
  totalCartItemOrders: 0,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
}
export const getCartItemOrders = createAsyncThunk(
  "cartItemOrder/getAll",
  async (page: number, thunkAPI) => {
    try {
      return await cartItemOrders.getCartItemOrders(page)
    } catch (error) {
      const err = error as AxiosError<Error>
      return thunkAPI.rejectWithValue(err.response?.data.error)
    }
  }
)
export const cartItemOrderSlice = createSlice({
  name: "cartItemOrder",
  initialState,
  reducers: {
    reset: (state: CartItemOrderState) => {
      state.isError = false
      state.isSuccess = false
      state.isLoading = false
      state.message = ""
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCartItemOrders.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getCartItemOrders.fulfilled, (state, action) => {
      state.isLoading = false
      state.cartItemOrders = action.payload.data.cartItems
      state.totalPage = action.payload.data.totalPage
      state.totalCartItemOrders = action.payload.data.totalCartItem
    })
    builder.addCase(getCartItemOrders.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload as string
    })
  },
})

export const { reset } = cartItemOrderSlice.actions
