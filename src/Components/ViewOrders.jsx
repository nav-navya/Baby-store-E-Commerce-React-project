import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ViewOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      const userId = localStorage.getItem("userId"); // Get userId from local storage or context

      if (!userId) {
        console.error("User ID not found.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`http://localhost:4001/order/getOrder/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setOrders(response.data.data); // Ensure correct response structure
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Your Orders</h1>
      {orders.length === 0 ? (
        <p className="text-gray-600">You have no orders yet.</p>
      ) : (
        orders.map((order, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-4 mb-4">
            <div className="flex justify-between items-center">
              <p className="text-lg font-bold text-gray-800">Order ID: {order._id}</p>
              <p className="text-gray-600">Total Amount: ₹{order.totalAmount.toFixed(2)}</p>
            </div>
            <div className="mt-4">
              <p className="text-gray-600">Status: {order.status}</p>
              <p className="text-gray-600">Date: {new Date(order.createdAt).toLocaleString()}</p>
            </div>
            <div className="mt-4">
              <h2 className="text-xl font-bold text-gray-800">Items:</h2>
              {order.items.map((item, itemIndex) => (
                <div key={itemIndex} className="mt-2">
                  <p className="text-gray-600">
                    {item.productId?.title} - {item.quantity} x ₹{item.productId?.price}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ViewOrders;
