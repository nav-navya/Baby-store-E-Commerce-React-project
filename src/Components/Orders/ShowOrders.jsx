import React, { useContext, useEffect, useState } from 'react'
import { ProductContext } from '../Context/Context';
import axios from 'axios';

const ShowOrders = () => {

  const [order, setOrder ] = useState([])
  const gotItem = localStorage.getItem("id");

  const { cart,setCart } = useContext(ProductContext);
  useEffect(() => {
    axios
      .get(`http://localhost:3000/users/${gotItem}`)
      .then((res) => {
        const totalcart = res.data.cart;
        setOrder(totalcart);
        setCart([])
      })
      .catch((error) => {
        console.error("Error fetching the cart:", error);
      });
  }, [gotItem]); 


  return (
    <div>
      {order.map((order) => (
        <div key={order.id} className="order-item">
          <img src={order.image} alt={order.name} className="order-image" />
          <h2>{order.name}</h2>
          <p>Category: {order.category}</p>
          <p>Price: ${order.price}</p>
          <p>Quantity: {order.quantity}</p>
        </div>
      ))}
  
      
    </div>
  )
}

export default ShowOrders
