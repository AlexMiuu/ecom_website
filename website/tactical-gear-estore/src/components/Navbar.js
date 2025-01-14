// src/components/Navbar.js
import React, { useContext, useEffect, useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import './Navbar.css';
import { CartContext } from './CartContext';
import { Link } from 'react-router-dom';

function NavigationBar() {
  const { cart, setShowCart } = useContext(CartContext);
  const [isAdmin, setIsAdmin] = useState(false);
  // Toggle the cart panel
  const handleCartClick = () => {
    setShowCart((prev) => !prev);
  };

  useEffect(() => {
    const adminStatus = localStorage.getItem('isAdmin') === 'true';
    console.log('Admin status:', adminStatus); // Debugging
    setIsAdmin(adminStatus);
  }, []);
  

  return (
    <Navbar expand="lg" fixed="top" className="navbar-custom">
      <Container>
        <Navbar.Brand href="/" className="navbar-brand-custom">Bullet Locker</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/" className="nav-link-custom">Home</Nav.Link>
            <Nav.Link href="/shop" className="nav-link-custom">Shop</Nav.Link>
            <Nav.Link href="/about" className="nav-link-custom">About</Nav.Link>
            {/* Cart button: shows item count */}
            <Nav.Link onClick={handleCartClick} className="nav-link-custom cart-link">
              Cart ({cart.length})
            </Nav.Link>
            <Nav.Link href="/login" className="nav-link-custom">Login</Nav.Link>
            {isAdmin && <Nav.Link href="/admin" className="nav-link-custom">Dashboard</Nav.Link>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
