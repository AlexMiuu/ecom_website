// src/components/AdminDashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminDashboard.css';

function AdminDashboard() {
  console.log('AdminDashboard mounted'); // Debugging log

  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    type: '',
    price: '',
    damage: '',
    range: '',
    weight: '',
    description: '',
  });
  const [error, setError] = useState(null); // For error handling

  useEffect(() => {
    console.log('AdminDashboard - Fetching products'); // Debugging log
    // Fetch existing products
    axios.get('/weapons', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
    .then((response) => {
      console.log('AdminDashboard - Products fetched:', response.data); // Debugging log
      setProducts(response.data);
    })
    .catch((error) => {
      console.error('AdminDashboard - Error fetching products:', error);
      setError('Failed to fetch products. Please try again later.');
    });
  }, []);

  const handleInputChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    axios.post('/weapons', newProduct, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
    .then((response) => {
      alert('Product added successfully!');
      setProducts([...products, response.data]); // Use response data with `id`
      setNewProduct({
        name: '',
        type: '',
        price: '',
        damage: '',
        range: '',
        weight: '',
        description: '',
      });
    })
    .catch((error) => {
      console.error('AdminDashboard - Error adding product:', error);
      setError('Failed to add product. Please try again.');
    });
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>

      {error && <p className="error-message">{error}</p>} {/* Display error message */}

      <section className="add-product">
        <h2>Add New Product</h2>
        <form onSubmit={handleAddProduct}>
          <input type="text" name="name" placeholder="Name" value={newProduct.name} onChange={handleInputChange} required />
          <input type="text" name="type" placeholder="Type" value={newProduct.type} onChange={handleInputChange} required />
          <input type="number" name="price" placeholder="Price" value={newProduct.price} onChange={handleInputChange} required />
          <input type="number" name="damage" placeholder="Damage" value={newProduct.damage} onChange={handleInputChange} required />
          <input type="text" name="range" placeholder="Range" value={newProduct.range} onChange={handleInputChange} required />
          <input type="text" name="weight" placeholder="Weight" value={newProduct.weight} onChange={handleInputChange} required />
          <textarea name="description" placeholder="Description" value={newProduct.description} onChange={handleInputChange} required />
          <button type="submit">Add Product</button>
        </form>
      </section>

      <section className="product-list">
        <h2>Existing Products</h2>
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              {product.name} — ${product.price}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default AdminDashboard;
