// src/pages/AdminPage.js
import React from 'react';
import AdminDashboard from '../components/AdminDashboard';
import Footer from '../components/Footer';

function AdminPage() {
  console.log('AdminPage rendered'); // Debugging log
  return (
    <div>
      <AdminDashboard />
      <Footer />
    </div>
  );
}

export default AdminPage;
