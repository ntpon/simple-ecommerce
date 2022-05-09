import React from "react"
import { Route, Routes } from "react-router-dom"
import Layout from "./components/layout/layout.component"
import MemberLayout from "./components/layout/memeber/memeber-layout.component"
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
import AdminLayout from "./components/layout/admin/admin-layout.component"
import OrderStatusManage from "./pages/admin/order-status-manage/order-status-manage.component"
import AuthorCreate from "./pages/admin/author-create/author-create.component"
import AuthorEdit from "./pages/admin/author-edit/author-create.component"
import ProductCreate from "./pages/admin/product-create/product-create.component"
import ProductEdit from "./pages/admin/product-edit/product-edit.component"
import CategoryEdit from "./pages/admin/category-edit/category-edit.component"
import CategoryCreate from "./pages/admin/category-create/category-create.component"
import UserEdit from "./pages/admin/user-edit/user-edit.component"
import UserCreate from "./pages/admin/user-create/user-create.component"
import PublisherManage from "./pages/admin/publisher-manage/publisher-manage.component"
import PublisherCreate from "./pages/admin/publisher-create/publisher-create.component"
import PublisherEdit from "./pages/admin/publisher-edit/publisher-edit.component"
import OrderStatusShow from "./pages/admin/order-status-show/order-status-show"
import Search from "./pages/search/search.component"

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/shop' element={<Shop />} />
          <Route path='/shop/:id' element={<ShopDetail />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/search' element={<Search />} />
          <Route path='/member' element={<MemberLayout />}>
            <Route index element={<Order />} />
            <Route path='profile' element={<Profile />} />
            <Route path='security' element={<Security />} />
            <Route path='support' element={<Support />} />
          </Route>
          <Route path='/admin' element={<AdminLayout />}>
            <Route index element={<Order />} />
            <Route path='profile' element={<Profile />} />
            <Route path='security' element={<Security />} />
            <Route path='user' element={<UserManage />} />
            <Route path='user/create' element={<UserCreate />} />
            <Route path='user/edit/:id' element={<UserEdit />} />
            <Route path='category' element={<CategoryManage />} />
            <Route path='category/create' element={<CategoryCreate />} />
            <Route path='category/edit/:id' element={<CategoryEdit />} />
            <Route path='author' element={<AuthorManage />} />
            <Route path='author/create' element={<AuthorCreate />} />
            <Route path='author/edit/:id' element={<AuthorEdit />} />
            <Route path='publisher' element={<PublisherManage />} />
            <Route path='publisher/create' element={<PublisherCreate />} />
            <Route path='publisher/edit/:id' element={<PublisherEdit />} />
            <Route path='product' element={<ProductManage />} />
            <Route path='product/create' element={<ProductCreate />} />
            <Route path='product/edit/:id' element={<ProductEdit />} />
            <Route path='order-status' element={<OrderStatusManage />} />
            <Route path='order-status/:id' element={<OrderStatusShow />} />
          </Route>
        </Route>
      </Routes>
    </div>
  )
}

export default App
