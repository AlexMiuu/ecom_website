import React from 'react';
import { Card, Button, Col, Row, Container } from 'react-bootstrap';

import FrontPage1 from '../images/FrontPage1.jfif'
import FrontPage2 from '../images/FrontPage2.jfif'
import FrontPage3 from '../images/FrontPage3.jfif'
import FrontPage4 from '../images/FrontPage4.jfif'

const products = [
  { id: 1, name: 'Tactical Jacket', price: '$150', image: FrontPage1},
  { id: 2, name: 'Utility Kit', price: '$1000', image: FrontPage2 },
  { id: 3, name: 'Utility Belt', price: '$100', image: FrontPage3 },
  { id: 4, name: 'Holster', price: '$50', image: FrontPage4 },
  // Add more products
];

function ProductGrid() {
  return (
    <Container className="my-5">
      <Row>
        {products.map((product) => (
          <Col key={product.id} xs={12} md={4} lg={3} className="mb-4">
            <Card>
              <Card.Img variant="top" src={product.image} />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>{product.price}</Card.Text>
                <Button variant="primary">Add to Cart</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default ProductGrid;
