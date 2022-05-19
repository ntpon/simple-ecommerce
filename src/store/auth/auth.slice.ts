import { AxiosError } from "axios"
import { AuthState, Password, Profile, UserData, UserLogin } from "./auth.type"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { getUserFromStorage } from "../../utils/user.utils"
import authService from "./auth.service"
import { Error } from "../../types/fetch-data.type"

const user = getUserFromStorage()

const initialState: AuthState = {
  user: user ? user : null,
  profile: undefined,
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
}

export const register = createAsyncThunk(
  "auth/register",
  async (user: UserData, thunkAPI) => {
    try {
      const data = await authService.register(user)
      return data
    } catch (error) {
      const err = error as AxiosError<Error>
      return thunkAPI.rejectWithValue(err.response?.data.error)
    }
  }
)

export const login = createAsyncThunk(
  "auth/login",
  async (user: UserLogin, thunkAPI) => {
    try {
      const data = await authService.login(user)
      return data
    } catch (error) {
      const err = error as AxiosError<Error>
      return thunkAPI.rejectWithValue(err.response?.data.error)
    }
  }
)

export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout()
})

export const getProfile = createAsyncThunk(
  "auth/getProfile",
  async (_, thunkAPI) => {
    try {
      const data = await authService.getProfile()
      return data
    } catch (error) {
      const err = error as AxiosError<Error>
      return thunkAPI.rejectWithValue(err.response?.data.error)
    }
  }
)

export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (user: Profile, thunkAPI) => {
    try {
      const data = await authService.updateProfile(user)
      return data
    } catch (error) {
      const err = error as AxiosError<Error>
      return thunkAPI.rejectWithValue(err.response?.data.error)
    }
  }
)
export const updatePassword = createAsyncThunk(
  "auth/updatePassword",
  async (userPassword: Password, thunkAPI) => {
    try {
      const data = await authService.updatePassword(userPassword)
      return data
    } catch (error) {
      const err = error as AxiosError<Error>
      return thunkAPI.rejectWithValue(err.response?.data.error)
    }
  }
)

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state: AuthState) => {
      state.isLoading = false
      state.isError = false
      state.isSuccess = false
      state.message = ""
    },
  },

  extraReducers: (builder) => {
    builder.addCase(register.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(register.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.user = action.payload.data
      state.message = action.payload.message
    })
    builder.addCase(register.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload as string
    })
    builder.addCase(login.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.user = action.payload.data
      state.message = action.payload.message
    })
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload as string
    })
    builder.addCase(logout.fulfilled, (state) => {
      state.user = null
    })
    builder.addCase(getProfile.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.isLoading = false
      state.profile = action.payload.data.user
    })
    builder.addCase(getProfile.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload as string
    })
    builder.addCase(updateProfile.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.profile = action.payload.data.user
      state.message = action.payload.message as string
    })
    builder.addCase(updateProfile.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload as string
    })
    builder.addCase(updatePassword.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(updatePassword.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.message = action.payload.message as string
    })
    builder.addCase(updatePassword.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload as string
    })
  },
})
export const { reset } = authSlice.actions
