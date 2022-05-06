import React from "react"
import { Route, Routes } from "react-router-dom"
import Layout from "./components/layout/layout.component"
import MemberLayout from "./components/layout/memeber/memeber-layout.component"
import Navbar from "./components/navbar/navbar.component"
import Auth from "./pages/auth/auth.component"
import Checkout from "./pages/checkout/chekcout.component"
import Home from "./pages/home/home.component"
import Dashboard from "./pages/memeber/dashbaord/dashboard.component"
import Order from "./pages/memeber/orders/order.component"
import Profile from "./pages/memeber/profile/profile.component"
import Support from "./pages/memeber/support/support.component"
import Shop from "./pages/shop/shop.component"

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/shop' element={<Shop />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/auth' element={<Auth />} />
          <Route path='/member' element={<MemberLayout />}>
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='order' element={<Order />} />
            <Route path='profile' element={<Profile />} />
            <Route path='support' element={<Support />} />
          </Route>
        </Route>
      </Routes>
    </div>
  )
}

export default App
