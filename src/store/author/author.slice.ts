import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { AxiosError } from "axios"
import authorService from "./author.service"
import { AuthorFormData, AuthorState } from "./author.type"
import { Error } from "../../types/fetch-data.type"
const initialState: AuthorState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
  authors: [],
  author: undefined,
  totalAuthor: 0,
  totalPage: 0,
}

export const createAuthor = createAsyncThunk(
  "author/create",
  async (authorData: AuthorFormData, thunkAPI) => {
    try {
      return await authorService.createAuthor(authorData)
    } catch (error) {
      const err = error as AxiosError<Error>
      return thunkAPI.rejectWithValue(err.response?.data.error)
    }
  }
)

export const getAuthors = createAsyncThunk(
  "author/getAll",
  async (page: number, thunkAPI) => {
    try {
      return await authorService.getAuthors(page)
    } catch (error) {
      const err = error as AxiosError<Error>
      return thunkAPI.rejectWithValue(err.response?.data.error)
    }
  }
)
export const getAuthorsAll = createAsyncThunk(
  "author/getAllNotPagination",
  async (_, thunkAPI) => {
    try {
      return await authorService.getAuthorsAll()
    } catch (error) {
      const err = error as AxiosError<Error>
      return thunkAPI.rejectWithValue(err.response?.data.error)
    }
  }
)

export const getAuthor = createAsyncThunk(
  "author/get",
  async (authorId: string, thunkAPI) => {
    try {
      return await authorService.getAuthor(authorId)
    } catch (error) {
      const err = error as AxiosError<Error>
      return thunkAPI.rejectWithValue(err.response?.data.error)
    }
  }
)

export const updateAuthor = createAsyncThunk(
  "author/update",
  async (
    { authorId, authorData }: { authorId: string; authorData: AuthorFormData },
    thunkAPI
  ) => {
    try {
      return await authorService.updateAuthor(authorId, authorData)
    } catch (error) {
      const err = error as AxiosError<Error>
      return thunkAPI.rejectWithValue(err.response?.data.error)
    }
  }
)

export const deleteAuthor = createAsyncThunk(
  "author/delete",
  async (authorId: string, thunkAPI) => {
    try {
      return await authorService.deleteAuthor(authorId)
    } catch (error) {
      const err = error as AxiosError<Error>
      return thunkAPI.rejectWithValue(err.response?.data.error)
    }
  }
)

export const authorSlice = createSlice({
  name: "author",
  initialState,
  reducers: {
    reset: (state: AuthorState) => {
      state.isError = false
      state.isSuccess = false
      state.isLoading = false
      state.message = ""
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAuthors.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getAuthors.fulfilled, (state, action) => {
      state.isLoading = false
      state.authors = action.payload.data.authors
      state.totalAuthor = action.payload.data.totalAuthor
      state.totalPage = action.payload.data.totalPage
    })
    builder.addCase(getAuthors.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload as string
    })
    builder.addCase(getAuthorsAll.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getAuthorsAll.fulfilled, (state, action) => {
      state.isLoading = false
      state.authors = action.payload.data.authors
    })
    builder.addCase(getAuthorsAll.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload as string
    })
    builder.addCase(getAuthor.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getAuthor.fulfilled, (state, action) => {
      state.isLoading = false
      state.author = action.payload.data.author
    })
    builder.addCase(getAuthor.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload as string
    })
    builder.addCase(createAuthor.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(createAuthor.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.message = action.payload.message as string
    })
    builder.addCase(createAuthor.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload as string
    })
    builder.addCase(updateAuthor.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(updateAuthor.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.message = action.payload.message as string
    })
    builder.addCase(updateAuthor.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload as string
    })
    builder.addCase(deleteAuthor.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(deleteAuthor.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.message = action.payload.message as string
    })
    builder.addCase(deleteAuthor.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload as string
    })
  },
})

export const { reset } = authorSlice.actions
