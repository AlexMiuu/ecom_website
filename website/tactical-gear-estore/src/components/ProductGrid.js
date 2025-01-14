// src/components/ProductGrid.js
import React, { useContext } from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import './ProductGrid.css';
import { CartContext } from './CartContext';

import FrontPage1 from '../images/FrontPage1.jfif';
import FrontPage2 from '../images/FrontPage2.jfif';
import FrontPage3 from '../images/FrontPage3.jfif';
import FrontPage4 from '../images/FrontPage4.jfif';

const products = [
  { id: 1, name: 'Tactical Jacket', price: 150, image: FrontPage1 },
  { id: 2, name: 'Utility Kit', price: 1000, image: FrontPage2 },
  { id: 3, name: 'Utility Belt', price: 100, image: FrontPage3 },
  { id: 4, name: 'Holster', price: 50, image: FrontPage4 },
];


function ProductGrid() {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="page-background">
      <Container className="product-grid-container">
        <h2 className="section-title">Featured Tactical Gear</h2>
        <Row>
          {products.map((product) => (
            <Col key={product.id} xs={12} md={4} lg={3} className="mb-4">
              <div className="product-card">
                <div className="card-img-container">
                  <img src={product.image} alt={product.name} className="product-img" />
                </div>
                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-price">{product.price}</p>
                  <button className="add-to-cart-btn" onClick={() => addToCart(product)}>
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
