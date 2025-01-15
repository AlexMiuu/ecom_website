// src/components/Navbar.js
import React, { useContext, useEffect, useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import './Navbar.css';
import { CartContext } from './CartContext';
import { Link } from 'react-router-dom';

function NavigationBar() {
  const { cart, setShowCart } = useContext(CartContext);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isHidden, setIsHidden] = useState(false);    // Track if navbar should be hidden
  const [lastScrollPos, setLastScrollPos] = useState(0); // Store last scroll position

  const isLoggedIn = !!localStorage.getItem('token');

  // When user logs out
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin');
    // Redirect to Home
    window.location.href = '/';
  };

  // Toggle the cart panel
  const handleCartClick = () => {
    setShowCart((prev) => !prev);
  };

  // Check admin status once on component mount
  useEffect(() => {
    const adminStatus = localStorage.getItem('isAdmin') === '1';
    console.log('Admin status:', adminStatus); // Debugging
    setIsAdmin(adminStatus);
  }, []);

  // Scroll logic: hide navbar when scrolling down, show when scrolling up
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.pageYOffset;
      // If current scroll is greater than the last scroll, we're scrolling down
      if (currentScroll > lastScrollPos) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
      setLastScrollPos(currentScroll);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollPos]);

  // Dynamically add the fade/flip class
  const navbarClasses = `navbar-custom ${isHidden ? 'navbar-hidden' : 'navbar-show'}`;

  return (
    <Navbar expand="lg" fixed="top" className={navbarClasses}>
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

            {isAdmin && (
              <Nav.Link href="/admin" className="nav-link-custom">
                Dashboard
              </Nav.Link>
            )}

            {!isLoggedIn ? (
              <>
                <Nav.Link href="/login" className="nav-link-custom">
                  Login
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link href="/account" className="nav-link-custom">
                  Account
                </Nav.Link>
                <button onClick={handleLogout} className="logout-button">
                  Logout
                </button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
