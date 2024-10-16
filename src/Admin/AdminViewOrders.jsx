import React, { useEffect, useContext, useState } from 'react';
import { ProductContext } from '../Components/Context/Context';

const AdminViewOrders = () => {
  const { users } = useContext(ProductContext);
  const [order, setOrder] = useState([]);
  const [viewUsers, setUsers] = useState([]);

  useEffect(() => {
    setUsers(users);
  }, [users]);

  useEffect(() => {
    if (viewUsers.length === 0) {
      setOrder([]);
      return;
    }

    // Collecting all user orders
    const allOrders = viewUsers.reduce((acc, user) => {
      const userOrders = user.order || [];
      const userId = user.id;
      const username = user.fname;

      const mappedOrders = userOrders.map((item) => ({
        ...item, userId, username
      }));

      return [...acc, ...mappedOrders]; // Combine all orders into one array
    }, []);

    setOrder(allOrders);
  }, [viewUsers]);

  const calculateSubtotal = (products  = []) => {
    return products.reduce((acc, product) => acc + product.price * product.quantity, 0);
  };

  const calculateTotal = (orders) => {
    return orders.reduce((acc, order) => acc + calculateSubtotal(order.products), 0);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin View Orders</h1>

      {order.map((userOrder, index) => (
        <div key={index} className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">Order ID: {userOrder.orderId}</h2>
          <p className="text-lg">User ID: {userOrder.userId}</p>
          <p className="text-lg mb-4">Username: {userOrder.username}</p>

          {/* Products in the Order */}
          <div className="space-y-4">
            {userOrder.products && userOrder.products.map((product, idx) => (
              <div key={idx} className="flex items-center border-b pb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-20 h-20 object-cover mr-4"
                />
                <div className="flex-grow">
                  <h3 className="text-xl font-semibold">{product.name}</h3>
                  <p className="text-gray-600">Category: {product.category}</p>
                  <p className="text-gray-600">Price: ${product.price}</p>
                  <p className="text-gray-600">Quantity: {product.quantity}</p>
                </div>
                <p className="text-lg font-bold">Subtotal: ${(product.price * product.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>

          {/* Total Amount for the Order */}
          <div className="mt-6 flex justify-between">
            <p className="text-xl font-semibold">Order Date: {new Date(userOrder.orderDate).toLocaleDateString()}</p>
            <p className="text-xl font-bold">Total: ${calculateSubtotal(userOrder.products).toFixed(2)}</p>
          </div>
        </div>
      ))}

      {/* Grand Total of all Orders */}
      {order.length > 0 && (
        <div className="bg-white shadow-md rounded-lg p-6 mt-6">
          <h2 className="text-2xl font-bold">Grand Total of All Orders: ${calculateTotal(order).toFixed(2)}</h2>
        </div>
      )}
    </div>
  );
};

export default AdminViewOrders;
