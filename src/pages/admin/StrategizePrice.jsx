import React, { useState, useEffect } from 'react';

const StrategizePrice = () => {
  const [products, setProducts] = useState([]);
  const [updatedPrice, setUpdatedPrice] = useState({});

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/product');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handlePriceChange = (productId, newPrice) => {
    setUpdatedPrice((prev) => ({
      ...prev,
      [productId]: newPrice,
    }));
  };

  const updatePrice = async (productId) => {
    const newPrice = updatedPrice[productId];

    if (!newPrice) {
      alert('Please enter a price');
      return;
    }

    try {
      await fetch(`/api/products/${productId}/update-price`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ price: newPrice }),
      });
      alert('Price updated successfully');
      fetchProducts(); // Refresh the product list
    } catch (error) {
      console.error('Error updating price:', error);
    }
  };

  return (
    <div>
      <h1>Strategize Price</h1>
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            <span>{product.name} - Current Price: ${product.price}</span>
            <input
              type="number"
              placeholder="Enter new price"
              value={updatedPrice[product._id] || ''}
              onChange={(e) => handlePriceChange(product._id, e.target.value)}
            />
            <button onClick={() => updatePrice(product._id)}>Update Price</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StrategizePrice;
