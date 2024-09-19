import React, { useState } from 'react';
import { useAuth } from '../../contexts/authContext';
import Navbar from '../../components/admin/Navbar';

function AddProduct() {
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [websiteName, setWebsiteName] = useState(null);
  const [websiteURL, setWebsiteURL] = useState(null);

  const [image, setImage] = useState(null); // Use null initially

  const { value, _ } = useAuth();

  const handleAddProduct = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('productName', productName);
    formData.append('description', description);
    formData.append('price', price);
    formData.append("websiteName",websiteName)
    formData.append("websiteURL",websiteURL)

    if (image) {
      formData.append('image', image);
    }

    try {
      const res = await fetch('/api/product/add', {
        method: 'POST',
        headers: {
          'authorization': `Bearer ${value.token}`
        },
        body: formData
      });

      const data = await res.json();
      if (!data.success) {
        throw new Error(data.message);
      }
      setProductName('');
      setDescription('');
      setPrice('');
      setImage(null);
    } catch (error) {
      console.error(error);
      alert('Error adding product');
    }
  };

  return (
    <>
    <Navbar></Navbar>
    <div>
      <h2>Add New Product</h2>
      <form onSubmit={handleAddProduct}>
        <div>
          <label>Product Name:</label>
          <input 
            type="text" 
            value={productName}
            onChange={(e) => setProductName(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Description:</label>
          <input 
            type="text" 
            value={description}
            onChange={(e) => setDescription(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Price:</label>
          <input 
            type="number" 
            value={price}
            onChange={(e) => setPrice(e.target.value)} 
            required 
          />
        </div>
        <div>
          <input 
            type="file" 
            accept='jfif,jpeg,png'
            onChange={e => setImage(e.target.files[0])} // Handle file input change
          />
        </div>
        <div>
          <label>Website Name:</label>
          <input 
            type="text" 
            value={websiteName}
            onChange={(e) => setWebsiteName(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Website Url:</label>
          <input 
            type="text" 
            value={websiteURL}
            onChange={(e) => setWebsiteURL(e.target.value)} 
            required 
          />
        </div>
        
        <button type="submit">Add Product</button>
      </form>
    </div>
    </>
  );
}

export default AddProduct;
