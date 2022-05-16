import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { AxiosError } from "axios"
import productService from "./product.service"
import { ProductFormData, ProductState } from "./product.type"
import { Error } from "../../types/fetch-data.type"
const initialState: ProductState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
  products: [],
  product: undefined,
}

export const createProduct = createAsyncThunk(
  "product/create",
  async (productData: ProductFormData, thunkAPI) => {
    try {
      return await productService.createProduct(productData)
    } catch (error) {
      const err = error as AxiosError<Error>
      return thunkAPI.rejectWithValue(err.response?.data.error)
    }
  }
)

export const getProducts = createAsyncThunk(
  "product/getAll",
  async (_, thunkAPI) => {
    try {
      return await productService.getProducts()
    } catch (error) {
      const err = error as AxiosError<Error>
      return thunkAPI.rejectWithValue(err.response?.data.error)
    }
  }
)

export const getProduct = createAsyncThunk(
  "product/get",
  async (productId: string, thunkAPI) => {
    try {
      return await productService.getProduct(productId)
    } catch (error) {
      const err = error as AxiosError<Error>
      return thunkAPI.rejectWithValue(err.response?.data.error)
    }
  }
)

export const updateProduct = createAsyncThunk(
  "product/update",
  async (
    {
      productId,
      productData,
    }: { productId: string; productData: ProductFormData },
    thunkAPI
  ) => {
    try {
      return await productService.updateProduct(productId, productData)
    } catch (error) {
      const err = error as AxiosError<Error>
      return thunkAPI.rejectWithValue(err.response?.data.error)
    }
  }
)

export const deleteProduct = createAsyncThunk(
  "product/delete",
  async (productId: string, thunkAPI) => {
    try {
      return await productService.deleteProduct(productId)
    } catch (error) {
      const err = error as AxiosError<Error>
      return thunkAPI.rejectWithValue(err.response?.data.error)
    }
  }
)

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    reset: (state: ProductState) => {
      state.isError = false
      state.isSuccess = false
      state.isLoading = false
      state.message = ""
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.isLoading = false
      state.products = action.payload.data
    })
    builder.addCase(getProducts.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload as string
    })
    builder.addCase(getProduct.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getProduct.fulfilled, (state, action) => {
      state.isLoading = false
      state.product = action.payload.data.product
    })
    builder.addCase(getProduct.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload as string
    })
    builder.addCase(createProduct.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(createProduct.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.message = action.payload.message as string
    })
    builder.addCase(createProduct.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload as string
    })
    builder.addCase(updateProduct.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.message = action.payload.message as string
    })
    builder.addCase(updateProduct.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload as string
    })
    builder.addCase(deleteProduct.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.message = action.payload.message as string
    })
    builder.addCase(deleteProduct.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload as string
    })
  },
})

export const { reset } = productSlice.actions
