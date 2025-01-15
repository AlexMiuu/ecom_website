// src/components/ProductGrid.js

import React, { useContext, useEffect, useState } from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import './ProductGrid.css';
import { CartContext } from './CartContext';
import axios from 'axios';

// Local Image Imports
import FrontPage1 from '../images/FrontPage1.jfif';
import FrontPage2 from '../images/FrontPage2.jfif';
import FrontPage3 from '../images/FrontPage3.jfif';
import FrontPage4 from '../images/FrontPage4.jfif';

// Mapping of product IDs to local images
const imageMap = {
  1: FrontPage1,
  2: FrontPage2,
  3: FrontPage3,
  4: FrontPage4,
  // Add more mappings as needed
};

function ProductGrid() {
  const { addToCart } = useContext(CartContext);
  const [products, setProducts] = useState([]); // State to hold products
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    // Define an async function to fetch products
    const fetchProducts = async () => {
      try {
        // Replace with your actual backend API endpoint
        const response = await axios.get('/api/weapons/products');
        setProducts(response.data); // Update products state
        setLoading(false); // Update loading state
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please try again later.');
        setLoading(false);
      }
    };

    fetchProducts(); // Invoke the function
  }, []); // Empty dependency array ensures this runs once on mount

  if (loading) {
    return (
      <div className="shop-page page-background">
        <Container className="product-grid-container">
          <h2 className="section-title">Featured Tactical Gear</h2>
          <p>Loading products...</p>
        </Container>
      </div>
    );
  }

  if (error) {
    return (
      <div className="shop-page page-background">
        <Container className="shop-page product-grid-container">
          <h2 className="section-title">Featured Tactical Gear</h2>
          <p className="error-message">{error}</p>
        </Container>
      </div>
    );
  }

  return (
    <div className="shop-page page-background">
      <Container className="shop-page product-grid-container">
        <h2 className="shop-page section-title">Featured Tactical Gear</h2>
        <Row>
          {products.map((product) => (
            <Col key={product.id} xs={12} md={4} lg={3} className="mb-4">
              <div className="shop-page product-card">
                <div className="shop-page ard-img-container">
                  <img
                    src={imageMap[product.id] || FrontPage1} // Fallback image if mapping not found
                    alt={product.name}
                    className="shop-page product-img"
                  />
                </div>
                <div className="shop-page product-info">
                  <h3 className="shop-page product-name">{product.name}</h3>
                  <p className="shop-page product-price">${product.price}</p>
                  <button
                    className="shop-page add-to-cart-btn"
                    onClick={() => addToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default ProductGrid;
