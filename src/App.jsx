import { useState } from 'react'
import React from 'react'
import Navbar from "./components/Navbar";
import Products from "./components/Products";
import Footer from "./components/Footer";
import Cart from "./pages/Cart";
import './App.css'
import Home from './components/Home';
import Checkout from './pages/Checkout';
// src/app.jsx
import {Routes, Route } from "react-router-dom";


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />                  {/* Home page */}
        <Route path="/products" element={<Products />} />     {/* Products listing */}
        <Route path="/products/:id" element={<Products />} /> {/* Single product */}
     <Route path="/cart" element={<Cart/>}/>                {/* Cart page */}
    <Route path="/checkout" element={<Checkout/>}  />          {/* Checkout page */}
   
      </Routes>
      <Footer />
    </>
  );
}

export default App