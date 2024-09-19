import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/authContext';
import Navbar from "../../components/admin/Navbar"
import "../../css/finalizeOrder.scss"
const FinalizeOrder = () => {
  const [orders, setOrders] = useState([]);
  const {value,_}=useAuth()

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/orders/pending',{
        method:"get",
        headers:{
            "Content-Type": "application/json",
            "authorization": `Bearer ${value.token}`
        }
      });
      const data = await response.json()
      console.log(data)
      setOrders(data.data.filter(ele=>ele.isPending));
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const finalizeOrder = async (orderId) => {
    try {
      await fetch(`/api/orders/${orderId}`,{
        method:"put",
        headers:{
            "Content-Type": "application/json",
            "authorization": `Bearer ${value.token}`
        }
      });
      fetchOrders();  // Refresh the order list after finalizing
    } catch (error) {
      console.error('Error finalizing order:', error);
    }
  };

  return (

    <>
    <Navbar></Navbar>
      <h1>Finalize Orders</h1>
      <ul>
        {orders.map(order => (
          <li key={order._id}>
            {order.products.map(product=>{
                return(
                    <div className="order-products">
                        <span>{order.productName}</span>
                        <button onClick={() => finalizeOrder(order._id)}>Finalize</button>
                    </div>
                )
            })}
            
          </li>
        ))}
      </ul>
    </>
  );
};

export default FinalizeOrder;
