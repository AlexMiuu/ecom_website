// src/App.js
import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom'; // No additional Routers here
import { CartProvider } from './components/CartContext';
import NavigationBar from './components/Navbar';
import CartPanel from './components/CartPanel';
import AdminPage from './pages/AdminPage';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import ProtectedRoute from './components/ProtectedRoute'; // Default import
import AccountPage from './pages/AccountPage'; // Import AccountPage
function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const token = localStorage.getItem('token');
    const adminStatus = localStorage.getItem('isAdmin') === '1'; // Ensure correct comparison
    console.log('Token:', token);
    console.log('Admin Status:', adminStatus);
    if (token) {
      setIsAdmin(adminStatus);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Or a spinner
  }

  return (
    <CartProvider>
      <NavigationBar />
      
      {/* Slide-out cart overlay */}
      <CartPanel />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />

        {/* Protected Admin Route */}
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute isAllowed={isAdmin} redirectPath="/">
              <AdminPage />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/account" 
          element={
            <ProtectedRoute isAllowed={!!localStorage.getItem('token')} redirectPath="/login">
              <AccountPage />
            </ProtectedRoute>
          } 
        />

        {/* Fallback route for 404 - Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </CartProvider>
  );
}

// Example NotFound component
const NotFound = () => (
  <div>
    <h2>404 - Page Not Found</h2>
    <p>The page you are looking for does not exist.</p>
  </div>
);

export default App;
