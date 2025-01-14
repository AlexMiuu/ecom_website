// src/App.js (final snippet)
//import React from 'react';
//import { Route, Routes } from 'react-router-dom';
import { CartProvider } from './components/CartContext';

import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';


import axios from 'axios';
import NavigationBar from './components/Navbar';
import CartPanel from './components/CartPanel';
import AdminPage from './pages/AdminPage';

import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import ProtectedRoute from './components/ProtectedRoute'; // Import the ProtectedRoute


function App() {
  const [isAdmin, setIsAdmin] = useState(true);

  useEffect(() => {
    const adminStatus = localStorage.getItem('isAdmin') === 'true'; // Retrieve from localStorage
    setIsAdmin(adminStatus);
  }, []);
  return (
    <>
    <CartProvider>
      <NavigationBar />
      
      {/* Slide-out cart overlay */}
      <CartPanel />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute isAllowed={isAdmin} redirectPath="/admin">
              <AdminPage />
            </ProtectedRoute>
          } 
        />

      </Routes>
    </CartProvider>
    </>
  );
}

export default App;
