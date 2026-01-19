import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/Home'
import CartDrawer from './features/cart/CartDrawer'
import LoginDrawer from './features/auth/LoginDrawer'
import { Route, Routes } from 'react-router-dom'
import Orders from './pages/Orders'
import ProfileDrawer from './features/auth/ProfileDrawer'
import CategoryPage from './pages/CategoryPage'
import Header from './components/layout/Header'
import SearchPage from './pages/SearchPage'
import AllProductsPage from './pages/AllProductsPage'
import Footer from './components/layout/Footer'

function App() {
  return (
    <div className="antialiased text-gray-900">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/orders" element={<Orders />} />

        {/* NEW ROUTE: The :slug part is dynamic (e.g., dairy, snacks) */}
        <Route path="/category/:slug" element={<CategoryPage />} />

        <Route path="/search" element={<SearchPage />} />
        <Route path='/products' element={<AllProductsPage />} />
      </Routes>

      {/* Global Drawers */}
      <CartDrawer />
      <LoginDrawer />
      <ProfileDrawer />

      <Footer />

    </div>
  )
}

export default App
