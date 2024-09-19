import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/admin/Navbar';

function AdminDashboard() {
  return (
    <>
      <Navbar></Navbar>
      <div>
        <h2>Admin Dashboard</h2>
        <nav>
          <ul>
            <li><Link to="/admin/add-website">Add Website</Link></li>
            <li><Link to="/admin/manage-websites">Manage Websites</Link></li>
            <li><Link to="/admin/add-product">Add Product</Link></li>
            <li><Link to="/admin/manage-products">Manage Products</Link></li>
            <li><Link to="/admin/finalise-order">Finalise Order</Link></li>

          </ul>
        </nav>
      </div>
    </>
  );
}

export default AdminDashboard;
