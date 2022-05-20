import { AxiosError } from "axios"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import publisherService from "./publisher.service"
import { Error } from "../../types/fetch-data.type"
import { PublisherFormData, PublisherState } from "./publisher.type"
const initialState: PublisherState = {
  publishers: [],
  publisher: undefined,
  totalPage: 0,
  totalPublisher: 0,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
}

export const createPublisher = createAsyncThunk(
  "publisher/create",
  async (publisherData: PublisherFormData, thunkAPI) => {
    try {
      return await publisherService.createPublisher(publisherData)
    } catch (error) {
      const err = error as AxiosError<Error>
      return thunkAPI.rejectWithValue(err.response?.data.error)
    }
  }
)
export const getPublishers = createAsyncThunk(
  "publisher/getAll",
  async (page: number, thunkAPI) => {
    try {
      return await publisherService.getPublishers(page)
    } catch (error) {
      const err = error as AxiosError<Error>
      return thunkAPI.rejectWithValue(err.response?.data.error)
    }
  }
)
export const getPublishersAll = createAsyncThunk(
  "publisher/getAllNotPagination",
  async (_, thunkAPI) => {
    try {
      return await publisherService.getPublishersAll()
    } catch (error) {
      const err = error as AxiosError<Error>
      return thunkAPI.rejectWithValue(err.response?.data.error)
    }
  }
)
export const getPublisher = createAsyncThunk(
  "publisher/get",
  async (publisherId: string, thunkAPI) => {
    try {
      return await publisherService.getPublisher(publisherId)
    } catch (error) {
      const err = error as AxiosError<Error>
      return thunkAPI.rejectWithValue(err.response?.data.error)
    }
  }
)

export const updatePublisher = createAsyncThunk(
  "publisher/update",
  async (
    {
      publisherId,
      publisherData,
    }: { publisherId: string; publisherData: PublisherFormData },
    thunkAPI
  ) => {
    try {
      return await publisherService.updatePublisher(publisherId, publisherData)
    } catch (error) {
      const err = error as AxiosError<Error>
      return thunkAPI.rejectWithValue(err.response?.data.error)
    }
  }
)

export const deletePublisher = createAsyncThunk(
  "publisher/delete",
  async (publisherId: string, thunkAPI) => {
    try {
      return await publisherService.deletePublisher(publisherId)
    } catch (error) {
      const err = error as AxiosError<Error>
      return thunkAPI.rejectWithValue(err.response?.data.error)
    }
  }
)

export const publisherSlice = createSlice({
  name: "publisher",
  initialState,
  reducers: {
    reset: (state: PublisherState) => {
      state.isError = false
      state.isSuccess = false
      state.isLoading = false
      state.message = ""
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPublishers.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getPublishers.fulfilled, (state, action) => {
      state.isLoading = false
      state.publishers = action.payload.data.publishers
      state.totalPage = action.payload.data.totalPage
      state.totalPublisher = action.payload.data.totalPublisher
    })
    builder.addCase(getPublishers.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload as string
    })
    builder.addCase(getPublishersAll.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getPublishersAll.fulfilled, (state, action) => {
      state.isLoading = false
      state.publishers = action.payload.data.publishers
    })
    builder.addCase(getPublishersAll.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload as string
    })
    builder.addCase(getPublisher.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getPublisher.fulfilled, (state, action) => {
      state.isLoading = false
      state.publisher = action.payload.data.publisher
    })
    builder.addCase(getPublisher.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload as string
    })
    builder.addCase(createPublisher.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(createPublisher.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.message = action.payload.message as string
    })
    builder.addCase(createPublisher.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload as string
    })
    builder.addCase(updatePublisher.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(updatePublisher.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.message = action.payload.message as string
    })
    builder.addCase(updatePublisher.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload as string
    })
    builder.addCase(deletePublisher.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(deletePublisher.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.message = action.payload.message as string
    })
    builder.addCase(deletePublisher.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload as string
    })
  },
})

export const { reset } = publisherSlice.actions
