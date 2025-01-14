// src/App.js
import React, { useEffect, useState } from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { CartProvider } from './components/CartContext';
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
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const token = localStorage.getItem('token');
    const adminStatus = localStorage.getItem('isAdmin') === 'true';
    if (token) {
      // Optionally, verify the token with the backend
      // For simplicity, we'll assume the token is valid
      setIsAdmin(adminStatus);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Or a spinner
  }

  return (
    <Router>
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

          {/* Always define the /admin route, but protect it */}
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute isAllowed={isAdmin} redirectPath="/">
                <AdminPage />
              </ProtectedRoute>
            } 
          />

          {/* Fallback route for 404 - Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </CartProvider>
    </Router>
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
