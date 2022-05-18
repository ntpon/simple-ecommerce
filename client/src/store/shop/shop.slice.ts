import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { AxiosError } from "axios"
import shopService from "./shop.service"
import { ShopState } from "./shop.type"
import { Error } from "../../types/fetch-data.type"

const initialState: ShopState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
  products: [],
  product: undefined,
  recommendProducts: [],
  newProducts: [],
  sciProducts: [],
  sellProducts: [],
  categories: [],
}

export const getProductsFormSearch = createAsyncThunk(
  "product-shop/getAllBySearch",
  async (search: string, thunkAPI) => {
    try {
      return await shopService.getProductsFormSearch(search)
    } catch (error) {
      const err = error as AxiosError<Error>
      return thunkAPI.rejectWithValue(err.response?.data.error)
    }
  }
)
export const getProductsForHomeIndex = createAsyncThunk(
  "product-shop/getAllForHome",
  async (_, thunkAPI) => {
    try {
      return await shopService.getProductsForHomeIndex()
    } catch (error) {
      const err = error as AxiosError<Error>
      return thunkAPI.rejectWithValue(err.response?.data.error)
    }
  }
)

export const getProductsInShop = createAsyncThunk(
  "product-shop/getAll",
  async (_, thunkAPI) => {
    try {
      return await shopService.getProductsInShop()
    } catch (error) {
      const err = error as AxiosError<Error>
      return thunkAPI.rejectWithValue(err.response?.data.error)
    }
  }
)

export const getProductInShop = createAsyncThunk(
  "product-shop/get",
  async (slug: string, thunkAPI) => {
    try {
      return await shopService.getProductInShop(slug)
    } catch (error) {
      const err = error as AxiosError<Error>
      return thunkAPI.rejectWithValue(err.response?.data.error)
    }
  }
)

export const getCategories = createAsyncThunk(
  "category-shop/getAll",
  async (_, thunkAPI) => {
    try {
      return await shopService.getCategories()
    } catch (error) {
      const err = error as AxiosError<Error>
      return thunkAPI.rejectWithValue(err.response?.data.error)
    }
  }
)

export const getProductByCategorySlug = createAsyncThunk(
  "products-shop/getByCategory",
  async (categoryId: string, thunkAPI) => {
    try {
      return await shopService.getProductByCategorySlug(categoryId)
    } catch (error) {
      const err = error as AxiosError<Error>
      return thunkAPI.rejectWithValue(err.response?.data.error)
    }
  }
)

export const shopSlice = createSlice({
  name: "product-shop",
  initialState,
  reducers: {
    reset: (state: ShopState) => {
      state.isError = false
      state.isSuccess = false
      state.isLoading = false
      state.message = ""
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProductsFormSearch.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getProductsFormSearch.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.products = action.payload.data.products
    })
    builder.addCase(getProductsFormSearch.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload as string
    })
    builder.addCase(getProductsForHomeIndex.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getProductsForHomeIndex.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.recommendProducts = action.payload.data.recommendProducts
      state.newProducts = action.payload.data.newProducts
      state.sciProducts = action.payload.data.sciProducts
      state.sellProducts = action.payload.data.sellProducts
    })
    builder.addCase(getProductsForHomeIndex.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload as string
    })
    builder.addCase(getProductsInShop.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getProductsInShop.fulfilled, (state, action) => {
      state.isLoading = false
      state.products = action.payload.data.products
    })
    builder.addCase(getProductsInShop.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload as string
    })
    builder.addCase(getProductInShop.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getProductInShop.fulfilled, (state, action) => {
      state.isLoading = false
      state.product = action.payload.data.product
    })
    builder.addCase(getProductInShop.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload as string
    })

    builder.addCase(getCategories.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.isLoading = false
      state.categories = action.payload.data.categories
    })
    builder.addCase(getCategories.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload as string
    })

    builder.addCase(getProductByCategorySlug.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getProductByCategorySlug.fulfilled, (state, action) => {
      state.isLoading = false
      state.products = action.payload.data.products
    })
    builder.addCase(getProductByCategorySlug.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload as string
    })
  },
})

export const { reset } = shopSlice.actions
