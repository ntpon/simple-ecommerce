import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { AxiosError } from "axios"
import userService from "./user.service"
import { UserFormData, UserState } from "./user.type"
import { Error } from "../../types/fetch-data.type"
const initialState: UserState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
  users: [],
  user: undefined,
  totalUser: 0,
  totalPage: 0,
}

export const createUser = createAsyncThunk(
  "user/create",
  async (userData: UserFormData, thunkAPI) => {
    try {
      return await userService.createUser(userData)
    } catch (error) {
      const err = error as AxiosError<Error>
      return thunkAPI.rejectWithValue(err.response?.data.error)
    }
  }
)

export const getUsers = createAsyncThunk(
  "user/getAll",
  async (page: number, thunkAPI) => {
    try {
      return await userService.getUsers(page)
    } catch (error) {
      const err = error as AxiosError<Error>
      return thunkAPI.rejectWithValue(err.response?.data.error)
    }
  }
)

export const getUser = createAsyncThunk(
  "user/get",
  async (userId: string, thunkAPI) => {
    try {
      return await userService.getUser(userId)
    } catch (error) {
      const err = error as AxiosError<Error>
      return thunkAPI.rejectWithValue(err.response?.data.error)
    }
  }
)

export const updateUser = createAsyncThunk(
  "user/update",
  async (
    { userId, userData }: { userId: string; userData: UserFormData },
    thunkAPI
  ) => {
    try {
      return await userService.updateUser(userId, userData)
    } catch (error) {
      const err = error as AxiosError<Error>
      return thunkAPI.rejectWithValue(err.response?.data.error)
    }
  }
)

export const deleteUser = createAsyncThunk(
  "user/delete",
  async (userId: string, thunkAPI) => {
    try {
      return await userService.deleteUser(userId)
    } catch (error) {
      const err = error as AxiosError<Error>
      return thunkAPI.rejectWithValue(err.response?.data.error)
    }
  }
)

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset: (state: UserState) => {
      state.isError = false
      state.isSuccess = false
      state.isLoading = false
      state.message = ""
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUsers.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.isLoading = false
      state.users = action.payload.data.users
      state.totalUser = action.payload.data.totalUser
      state.totalPage = action.payload.data.totalPage
    })
    builder.addCase(getUsers.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload as string
    })
    builder.addCase(getUser.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.isLoading = false
      state.user = action.payload.data.user
    })
    builder.addCase(getUser.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload as string
    })
    builder.addCase(createUser.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.message = action.payload.message as string
    })
    builder.addCase(createUser.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload as string
    })
    builder.addCase(updateUser.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.message = action.payload.message as string
    })
    builder.addCase(updateUser.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload as string
    })
    builder.addCase(deleteUser.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.message = action.payload.message as string
    })
    builder.addCase(deleteUser.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload as string
    })
  },
})

export const { reset } = userSlice.actions
