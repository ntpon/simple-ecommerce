import React from "react"
import { Route, Routes } from "react-router-dom"
import { AdminLayoutContainer } from "./components/layout/admin/admin-layout.styles"
import Layout from "./components/layout/layout.component"
import MemberLayout from "./components/layout/memeber/memeber-layout.component"
import Auth from "./pages/auth/auth.component"
import Checkout from "./pages/checkout/chekcout.component"
import Home from "./pages/home/home.component"
import Order from "./pages/memeber/orders/order.component"
import Profile from "./pages/memeber/profile/profile.component"
import Security from "./pages/memeber/security/security.component"
import Support from "./pages/memeber/support/support.component"
import ShopDetail from "./pages/shop-detail/shop-detail.component"
import Shop from "./pages/shop/shop.component"

import UserManage from "./pages/admin/user-manage/user-manage.component"
import CategoryManage from "./pages/admin/category-manage/category-manage.component"
import AuthorManage from "./pages/admin/author-manage/author-manage.component"
import ProductManage from "./pages/admin/product-manage/product-manage.component"

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/shop' element={<Shop />} />
          <Route path='/shop/:id' element={<ShopDetail />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/auth' element={<Auth />} />
          <Route path='/member' element={<MemberLayout />}>
            <Route index element={<Order />} />
            <Route path='profile' element={<Profile />} />
            <Route path='security' element={<Security />} />
            <Route path='support' element={<Support />} />
          </Route>
          <Route path='/admin' element={<AdminLayoutContainer />}>
            <Route index element={<Order />} />
            <Route path='profile' element={<Profile />} />
            <Route path='security' element={<Security />} />
            <Route path='user' element={<UserManage />} />
            <Route path='category' element={<CategoryManage />} />
            <Route path='author' element={<AuthorManage />} />
            <Route path='product' element={<ProductManage />} />
          </Route>
        </Route>
      </Routes>
    </div>
  )
}

export default App
