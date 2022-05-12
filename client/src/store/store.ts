import { configureStore } from "@reduxjs/toolkit"
import { authSlice } from "./auth/auth.slice"
import { useSelector, useDispatch, TypedUseSelectorHook } from "react-redux"
import { categorySlice } from "./category/category.slice"

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    category: categorySlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
})

type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>()
