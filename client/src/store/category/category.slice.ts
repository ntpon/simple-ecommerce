import { AxiosError } from "axios"
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import categoryService from "./category.service"
import { Error } from "../../types/fetch-data.type"
import { CategoryFormData, CategoryState } from "./category.type"
const initialState: CategoryState = {
  categories: [],
  totalCategory: 0,
  totalPage: 0,
  category: undefined,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
}

export const createCategory = createAsyncThunk(
  "category/create",
  async (categoryData: CategoryFormData, thunkAPI) => {
    try {
      return await categoryService.createCategory(categoryData)
    } catch (error) {
      const err = error as AxiosError<Error>
      return thunkAPI.rejectWithValue(err.response?.data.error)
    }
  }
)
export const getCategories = createAsyncThunk(
  "category/getAll",
  async (page: number, thunkAPI) => {
    try {
      return await categoryService.getCategories(page)
    } catch (error) {
      const err = error as AxiosError<Error>
      return thunkAPI.rejectWithValue(err.response?.data.error)
    }
  }
)
export const getCategoriesAll = createAsyncThunk(
  "category/getAllNotPagination",
  async (_, thunkAPI) => {
    try {
      return await categoryService.getCategoriesAll()
    } catch (error) {
      const err = error as AxiosError<Error>
      return thunkAPI.rejectWithValue(err.response?.data.error)
    }
  }
)
export const getCategory = createAsyncThunk(
  "category/get",
  async (categoryId: string, thunkAPI) => {
    try {
      return await categoryService.getCategory(categoryId)
    } catch (error) {
      const err = error as AxiosError<Error>
      return thunkAPI.rejectWithValue(err.response?.data.error)
    }
  }
)

export const updateCategory = createAsyncThunk(
  "category/update",
  async (
    {
      categoryId,
      categoryData,
    }: { categoryId: string; categoryData: CategoryFormData },
    thunkAPI
  ) => {
    try {
      return await categoryService.updateCategory(categoryId, categoryData)
    } catch (error) {
      const err = error as AxiosError<Error>
      return thunkAPI.rejectWithValue(err.response?.data.error)
    }
  }
)

export const deleteCategory = createAsyncThunk(
  "category/delete",
  async (categoryId: string, thunkAPI) => {
    try {
      return await categoryService.deleteCategory(categoryId)
    } catch (error) {
      const err = error as AxiosError<Error>
      return thunkAPI.rejectWithValue(err.response?.data.error)
    }
  }
)

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    reset: (state: CategoryState) => {
      state.isError = false
      state.isSuccess = false
      state.isLoading = false
      state.message = ""
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCategories.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.isLoading = false
      state.categories = action.payload.data.categories
      state.totalCategory = action.payload.data.totalCategory
      state.totalPage = action.payload.data.totalPage
    })
    builder.addCase(getCategories.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload as string
    })
    builder.addCase(getCategoriesAll.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getCategoriesAll.fulfilled, (state, action) => {
      state.isLoading = false
      state.categories = action.payload.data.categories
    })
    builder.addCase(getCategoriesAll.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload as string
    })
    builder.addCase(getCategory.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getCategory.fulfilled, (state, action) => {
      state.isLoading = false
      state.category = action.payload.data.category
    })
    builder.addCase(getCategory.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload as string
    })
    builder.addCase(createCategory.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(createCategory.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.message = action.payload.message as string
    })
    builder.addCase(createCategory.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload as string
    })
    builder.addCase(updateCategory.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(updateCategory.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.message = action.payload.message as string
    })
    builder.addCase(updateCategory.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload as string
    })
    builder.addCase(deleteCategory.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(deleteCategory.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.message = action.payload.message as string
    })
    builder.addCase(deleteCategory.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload as string
    })
  },
})

export const { reset } = categorySlice.actions
