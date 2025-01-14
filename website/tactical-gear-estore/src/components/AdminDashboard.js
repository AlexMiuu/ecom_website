import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminDashboard.css';

function AdminDashboard() {
  console.log('AdminDashboard mounted'); // Debugging line
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

  useEffect(() => {
    // Fetch existing products
    axios.get('/weapons', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
    .then((response) => setProducts(response.data))
    .catch((error) => console.error(error));
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
      setProducts([...products, newProduct]);
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
    .catch((error) => console.error(error));
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>

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
