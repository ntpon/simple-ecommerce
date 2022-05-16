import { configureStore } from "@reduxjs/toolkit"
import { authSlice } from "./auth/auth.slice"
import { useSelector, useDispatch, TypedUseSelectorHook } from "react-redux"
import { categorySlice } from "./category/category.slice"
import { authorSlice } from "./author/author.slice"
import { publisherSlice } from "./publisher/publisher.slice"
import { productSlice } from "./product/product.slice"
import { cartItemSlice } from "./cart-item/cart-items.slice"
import { userSlice } from "./user/user.slice"
import { cartItemOrderSlice } from "./cart-item-order/cart-item-order.slice"

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    user: userSlice.reducer,
    category: categorySlice.reducer,
    author: authorSlice.reducer,
    publisher: publisherSlice.reducer,
    product: productSlice.reducer,
    cartItem: cartItemSlice.reducer,
    cartItemOrder: cartItemOrderSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
})

type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>()
