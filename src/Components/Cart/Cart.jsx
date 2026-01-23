
import React, { useContext, useEffect, useState } from 'react';
import { ProductContext } from '../Context/Context';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Cartis = () => {
  const { cart, setCart, userCart, loadCart } = useContext(ProductContext);
  const navigate = useNavigate();
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    loadCart();
  }, []);

  const cartItems = userCart?.items || [];
 

  useEffect(() => {
    const total = cartItems.reduce((total, item) => {
      return total + (parseFloat(item.productId.price) || 0) * (parseInt(item.quantity) || 0);
    }, 0);
    setTotalAmount(total);
  }, [cartItems]);

  const updateQuantity = async (item, newQuantity) => {
    if (newQuantity < 1) return; // Prevents negative values

    try {
      if (newQuantity > item.quantity) {
        // Increment quantity
        await axios.patch(`http://localhost:4001/cart/incrementQty/${item.productId._id}`, {}, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Include JWT token
          },
        });
      } else if (newQuantity < item.quantity) {
        // Decrement quantity
        await axios.patch(`http://localhost:4001/cart/decrementQty/${item.productId._id}`, {}, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Include JWT token
          },
        });
      }
      loadCart(); // Reloads cart after updating
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const removeItem = async (item) => {
    try {
      await axios.delete(`http://localhost:4001/cart/deleteFromCart/${item.productId._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Include JWT token
        },
      });
      loadCart(); // Reloads cart after removing item
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const amount = totalAmount;
  const currency = "INR";
  const receiptId = "qwsaq";

  const paymentHandler = async (e) => {
    e.preventDefault();
    if (totalAmount <= 0) {
      alert("Your cart is empty! Add items before proceeding to payment.");
      return;
    }

    const amountInPaise = totalAmount * 100;

    const response = await fetch("http://localhost:4001/order", {
      method: "POST",
      body: JSON.stringify({ amount: amountInPaise, currency, receipt: receiptId }),
      headers: { "Content-Type": "application/json" },
    });

    const order = await response.json();
    console.log("Order Response:", order);

    var options = {
      key: "rzp_test_9wDJriBAQgWa2z",
      amount: amountInPaise,
      currency,
      name: "Baby Products",
      description: "Order Payment",
      image: "https://example.com/your_logo",
      order_id: order.id,
      handler: async function (response) {
        const validateRes = await fetch("http://localhost:4001/order/validates", {
          method: "POST",
          body: JSON.stringify(response),
          headers: { "Content-Type": "application/json" },
        });
        const jsonRes = await validateRes.json();
        console.log(jsonRes);
      },
      prefill: { name: "Navya Suresh", email: "navya@gmail.com", contact: "7736277631" },
      notes: { address: "Customer Billing Address" },
      theme: { color: "#3399cc" },
    };

    var rzp1 = new window.Razorpay(options);
    rzp1.on("payment.failed", function (response) {
      alert("Payment Failed: " + response.error.reason);
    });

    rzp1.open();
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      {cartItems.length==0?(<div className='flex justify-center items-center'>Your cart is empty</div>):(
      cartItems.map((item, index) => (
        <div key={index} className="bg-white shadow-md rounded-lg p-4 mb-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-24 h-24 mr-4">
              <img src={item.productId.image} alt={item.productId.title} className="w-full h-full object-cover rounded-lg" />
            </div>
            <div>
              <p className="text-xl font-bold text-gray-800">{item.productId.title}</p>
              <p className="text-gray-600">Price: ₹{item.productId.price}</p>
              <p className="text-gray-600">Total: ₹{item.productId.price * item.quantity}</p>
              <div className="flex items-center mt-2">
                <button
                  className="px-2 py-1 bg-gray-300 text-gray-700 rounded-md"
                  onClick={() => updateQuantity(item, item.quantity - 1)}
                >
                  ➖
                </button>
                <span className="px-4">{item.quantity}</span>
                <button
                  className="px-2 py-1 bg-gray-300 text-gray-700 rounded-md"
                  onClick={() => updateQuantity(item, item.quantity + 1)}
                >
                  ➕
                </button>
                <button
                  className="ml-4 px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                  onClick={() => removeItem(item)}
                >
                  ❌ Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      )))}

     { cartItems.length==0?(<div></div>):
     <div>
     <div className="mt-6 text-right">
        <p className="text-2xl font-bold text-gray-900">Total Price: ₹{totalAmount.toFixed(2)}</p>
      </div>

      <div className="mt-4 text-right">
        <button
          onClick={paymentHandler}
          className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          Place Order
        </button>
      </div>
      </div>
}
    </div>
  );
};

export default Cartis;