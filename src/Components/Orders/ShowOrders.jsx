import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ShowOrders = () => {
  const [orders, setOrders] = useState([]);
  const userId = localStorage.getItem("id");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/users/${userId}`);
        const userData = response.data;
        if (userData.order && userData.order.length > 0) {
          setOrders(userData.order);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [userId]);

  function totalAmount(order){
    const product = order.products || []; 
   return  product.reduce((total,product)=>{
    return total + product.quantity * product.price
   },0)

  }

  return (
          <div>
              <div className="max-w-5xl mx-auto p-6 bg-white border border-gray-300 rounded-lg shadow-md">
  <h2 className="text-3xl font-semibold text-center mb-6 text-pink-600">Your Orders</h2>
  {orders.length > 0 ? (
    <div className="space-y-6">
      {orders.map((order) => (
        <div key={order.orderId} className="p-6 bg-gray-100 rounded-lg shadow">
          <h3 className="text-xl font-bold mb-4 text-gray-700">
            Order ID: {order.orderId}
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Order Date: {new Date(order.orderDate).toLocaleDateString()}
          </p>
          {order.products && order.products.length > 0 ? (
            <div className="space-y-4">
              {order.products.map((product) => (
                <div key={product.id} className="flex items-center border-b border-gray-300 pb-4 mb-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-24 h-24 object-cover rounded-lg mr-4"
                  />
                  <div>
                    <h4 className="text-lg font-medium">{product.name}</h4>
                    <p className="text-gray-600">Category: {product.category}</p>
                    <p className="text-gray-600">Price: ${product.price}</p>
                    <p className="text-gray-600">Quantity: {product.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No products in this order.</p>
          )}
          <p className="mt-4 text-green-500 font-semibold">Status: {order.status}</p>
          <p className=''>Total amount: <span className='text-green-800'>${totalAmount(order).toFixed(2)}</span></p>
        </div>
      ))}
      <button
        onClick={() => navigate('/')}
        className="w-full bg-pink-600 text-white py-2 px-4 rounded-lg hover:bg-pink-700 transition duration-300"
      >
        Go Home
      </button>
    </div>
  ) : (
    <p className="text-center text-gray-500">No orders found.</p>
  )}
</div>

          </div>
//     <div className="max-w-5xl mx-auto p-6 bg-white border border-gray-300 rounded-lg shadow-md">
//       <h2 className="text-3xl font-semibold text-center mb-6 text-pink-600">Your Orders</h2>
//       {orders.length > 0 ? (
//         <div className="space-y-6">
//           {orders.map((order) => (
//             <div key={order.orderId} className="p-6 bg-gray-100 rounded-lg shadow">
//               <h3 className="text-xl font-bold mb-4 text-gray-700">
//                 Order ID: {order.orderId}
//               </h3>
//               <p className="text-sm text-gray-600 mb-4">Order Date: {new Date(order.orderDate).toLocaleDateString()}</p>
//               {order.products.length > 0 ? (
//                 <div className="space-y-4">
//                   {order.products.map((product) => (
//                     <div key={product.id} className="flex items-center border-b border-gray-300 pb-4 mb-4">
//                       <img
//                         src={product.image}
//                         alt={product.name}
//                         className="w-24 h-24 object-cover rounded-lg mr-4"
//                       />
//                       <div>
//                         <h4 className="text-lg font-medium">{product.name}</h4>
//                         <p className="text-gray-600">Category: {product.category}</p>
//                         <p className="text-gray-600">Price: ${product.price}</p>
//                         <p className="text-gray-600">Quantity: {product.quantity}</p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <p className="text-gray-500">No products in this order.</p>
//               )}
//               <p className="mt-4 text-green-500 font-semibold">Status: {order.status}</p>
//               <p className=''>total amount :<span className='text-green-800'>${totalAmount(order).toFixed(2)}</span> </p>
//             </div>
//           ))}
//           <button 
//             onClick={() => navigate('/')} 
//             className="w-full bg-pink-600 text-white py-2 px-4 rounded-lg hover:bg-pink-700 transition duration-300">
//             Go Home
//           </button>
//         </div>
//       ) : (
//         <p className="text-center text-gray-500">No orders found.</p>
//       )}
//     </div>
//   );
// };
  )}

export default ShowOrders;


