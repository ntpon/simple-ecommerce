import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { AxiosError } from "axios"
import cartItemService from "./cart-items.service"
import {
  CartItemFormData,
  CartItemState,
  CartItemStatus,
} from "./cart-items.type"
import { Error } from "../../types/fetch-data.type"
const initialState: CartItemState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
  cartItems: [],
  orders: [],
  cartItem: undefined,
}

export const getCartItems = createAsyncThunk(
  "cartItem/getAll",
  async (_, thunkAPI) => {
    try {
      return await cartItemService.getCartItems()
    } catch (error) {
      const err = error as AxiosError<Error>
      return thunkAPI.rejectWithValue(err.response?.data.error)
    }
  }
)

export const getCartItem = createAsyncThunk(
  "cartItem/get",
  async (cartItemId: string, thunkAPI) => {
    try {
      return await cartItemService.getCartItem(cartItemId)
    } catch (error) {
      const err = error as AxiosError<Error>
      return thunkAPI.rejectWithValue(err.response?.data.error)
    }
  }
)

export const updateCartItem = createAsyncThunk(
  "cartItem/update",
  async (
    {
      cartItemId,
      cartItemStatus,
    }: { cartItemId: string; cartItemStatus: CartItemStatus },
    thunkAPI
  ) => {
    try {
      return await cartItemService.updateStatusCartItem(
        cartItemId,
        cartItemStatus
      )
    } catch (error) {
      const err = error as AxiosError<Error>
      return thunkAPI.rejectWithValue(err.response?.data.error)
    }
  }
)

export const cartItemSlice = createSlice({
  name: "cartItem",
  initialState,
  reducers: {
    reset: (state: CartItemState) => {
      state.isError = false
      state.isSuccess = false
      state.isLoading = false
      state.message = ""
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCartItems.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getCartItems.fulfilled, (state, action) => {
      state.isLoading = false
      state.cartItems = action.payload.data.cartItems
    })
    builder.addCase(getCartItems.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload as string
    })
    builder.addCase(getCartItem.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getCartItem.fulfilled, (state, action) => {
      state.isLoading = false
      state.cartItem = action.payload.data.cartItem
      state.orders = action.payload.data.orders
    })
    builder.addCase(getCartItem.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload as string
    })
    builder.addCase(updateCartItem.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(updateCartItem.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.message = action.payload.message as string
    })
    builder.addCase(updateCartItem.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload as string
    })
  },
})

export const { reset } = cartItemSlice.actions
