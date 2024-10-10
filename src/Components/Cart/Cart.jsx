// import React, { useContext, useEffect, useState } from 'react'
// import { ProductContext } from '../Context/Context'
// import axios from 'axios'
// import { useNavigate, Link } from 'react-router-dom';


// const Cartis = () => {
//   const [cart, setCart] = useState([]);
//   const navigate = useNavigate();
//   const [quantity, setQuantity] = useState(1);
//   const [order, setOrder] = useState([])


//   // const { cart } = useContext(ProductContext) //1)if user already has a cart, get the cart
//   function loadCart(userId) {
//     const savedcart = localStorage.getItem("cart")
//     if (savedcart) {
//       try {
//         setCart(JSON.parse(savedcart));
//       }
//       catch (error) {
//         console.error("Error parsing saved cart:", error);
//         localStorage.removeItem("cart");
//       }
//     }
//     else
//       axios.get(`http://localhost:3000/users/${userId}`)
//         .then((res) => {
//           const userCart = res.data.cart || [];//array works when new signup occurs and cart is empty

//           setCart(userCart)
//           localStorage.setItem("cart", JSON.stringify(userCart))
//         })
//         .catch((err) => console.log(err))
//   }

//   useEffect(() => {
//     const userId = localStorage.getItem("id");
//     if (userId) {
//       loadCart(userId);
//     }
//     else {
//       alert("Please log in..")
//       navigate('/login')
//     }
//   }, [navigate])
//   /////////////////////////////////////////////////////////////////////////////////////////////////////

//   const user = localStorage.getItem("id");
//   // handling remove from cart
//   function handleRemove(id) {
//     const removeCart = cart.filter(item => item.id !== id)
//     setCart(removeCart)
//     axios.patch(`http://localhost:3000/users/${user}`, { cart: removeCart })
//     localStorage.setItem("cart", JSON.stringify(removeCart))
//   }

//   function handleremoveorder(id) {
//     const removeOrder = order.filter(item => item.id !== id)
//     setOrder(removeOrder)
//     axios.patch(`http://localhost:3000/users/${user}`, { order: removeOrder })
//     localStorage.setItem("order", JSON.stringify(removeOrder))
//     setCart([]);
//   }

//   const calculateTotal = (cart) => {
//     return cart.reduce((total, item) => {
//       const price = parseFloat(item.price) || 0;
//       const quantity = parseInt(item.quantity) || 0;
//       return total + (price * quantity);
//     }, 0);
//   };


//   // quantity increase and decrease 
//   function handleQuantityChange(id, change) { //id of the product
//     // axios.patch(`http://localhost:3000/users/${user}`)
//     const updatedCart = cart.map(item => {
//       if (item.id === id) {
//         const newQuantity = item.quantity + change;

//         return { ...item, quantity: Math.max(newQuantity, 1) }; // Prevent quantity from going below 1
//       }
//       return item;
//     });

//     setCart(updatedCart);
//     localStorage.setItem("cart", JSON.stringify(updatedCart))
//     const itemToUpdate = updatedCart.find(item => item.id === id);
//     axios.patch(`http://localhost:3000/users/${userId}`, {
//       quantity: itemToUpdate.quantity
//     })

//   }

//   return (

//     <div className="max-w-3xl mx-auto p-6 border border-gray-300 rounded-lg bg-white shadow-md">
//       <h2 className="text-2xl font-semibold text-center mb-4">Your Shopping Cart</h2>
//       {cart.length > 0 ? (
//         <div className="space-y-4">
//           {cart.map((item, index) => (
//             <div className="flex items-center p-4 border-b border-gray-200" key={index}>
//               {item.image && (
//                 <img src={item.image} alt={item.title || "Product"} className="w-20 h-20 object-cover mr-4" />
//               )}
//               <div className="flex-grow">
//                 <h3 className="text-lg font-medium">{item.title}</h3>
//                 <p className="text-gray-600">${item.price} x {item.quantity}</p>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <button
//                   className="bg-gray-300 text-black py-1 px-2 rounded hover:bg-gray-400"
//                   onClick={() => handleQuantityChange(item.id, -1)}
//                 >
//                   -
//                 </button>
//                 <span>{item.quantity}</span>
//                 <button
//                   className="bg-gray-300 text-black py-1 px-2 rounded hover:bg-gray-400"
//                   onClick={() => handleQuantityChange(item.id, 1)}
//                 >
//                   +
//                 </button>
//                 <button
//                   className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition duration-200"
//                   onClick={() => handleRemove(item.id)}
//                 >
//                   Remove
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p className="text-center text-gray-500">No items in the cart</p>
//       )}
//       <div className="mt-4 flex justify-between items-center">
//         <p className="text-xl font-semibold">
//           Total: <span className="text-green-600">${calculateTotal(cart).toFixed(2)}</span>
//         </p>
//         <div>
//           {cart.length > 0 && (
//             <Link to='/shipping' ><button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-200" onClick={() => handleremoveorder(user)}>
//               Proceed to Checkout
//             </button></Link>
//           )
//           }
//         </div>
//       </div>
//     </div>


//   )
// }

// export default Cartis
import React, { useContext, useEffect, useState } from 'react';
import { ProductContext } from '../Context/Context';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

/////handle cart in context//////////

const Cartis = () => {
  const { cart, setCart } = useContext(ProductContext);
  const navigate = useNavigate();
  const [order, setOrder] = useState([]);

  // Load cart from local storage or API
  function loadCart(userId) {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error("Error parsing saved cart:", error);
        localStorage.removeItem("cart");
      }
    } else {
      axios.get(`http://localhost:3000/users/${userId}`)
        .then((res) => {
          const userCart = res.data.cart || [];
          setCart(userCart);
          localStorage.setItem("cart", JSON.stringify(userCart));
        })
        .catch((err) => console.log(err));
    }
  }

  useEffect(() => {
    const userId = localStorage.getItem("id");
    if (userId) {
      loadCart(userId);
    } else {
      alert("Please log in..");
      navigate('/login');
    }
  }, [navigate]);

  const userId = localStorage.getItem("id");

  // Remove item from cart
  function handleRemove(id) {
    const removeCart = cart.filter(item => item.id !== id);
    setCart(removeCart);
    axios.patch(`http://localhost:3000/users/${userId}`, { cart: removeCart });
    localStorage.setItem("cart", JSON.stringify(removeCart));
  }

  // Place order and empty the cart
  const placeOrder = () => {
    if (cart.length === 0) {
      alert("Your cart is empty. Please add items before proceeding.");
      return;
    }

    axios.get(`http://localhost:3000/users/${userId}`)
      .then((res) => {
        const existingOrders = res.data.order || []; // Get existing orders or initialize empty
        const newOrders = [...existingOrders, ...cart]; // Combine existing orders with current cart

        // Patch request to update the user's order and clear the cart
        axios.patch(`http://localhost:3000/users/${userId}`, {
          order: newOrders, // Update the order to include the new items
          cart: [] // Clear the cart
        })
        .then(() => {
          console.log("Order placed successfully:", newOrders);
          setCart([]); // Clear the cart from state
          localStorage.removeItem("cart"); // Clear cart from local storage
          navigate('/s'); // Navigate to order page
        })
        .catch(err => {
          console.error('Error with patch request:', err);
        });
      })
      .catch(err => {
        console.error('Error fetching user data:', err);
      });
  };

  // Calculate total price
  const calculateTotal = (cart) => {
    return cart.reduce((total, item) => {
      const price = parseFloat(item.price) || 0;
      const quantity = parseInt(item.quantity) || 0;
      return total + (price * quantity);
    }, 0);
  };

  // Handle quantity change
  function handleQuantityChange(id, change) {
    const updatedCart = cart.map(item => {
      if (item.id === id) {
        const newQuantity = item.quantity + change;
        return { ...item, quantity: Math.max(newQuantity, 1) }; // Prevent quantity from going below 1
      }
      return item;
    });

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    const itemToUpdate = updatedCart.find(item => item.id === id);
    axios.patch(`http://localhost:3000/users/${userId}`, {
      cart: updatedCart // Update the user's cart
    });
  }

  return (
    <div className="max-w-3xl mx-auto p-6 border border-gray-300 rounded-lg bg-white shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-4">Your Shopping Cart</h2>
      {cart.length > 0 ? (
        <div className="space-y-4">
          {cart.map((item, index) => (
            <div className="flex items-center p-4 border-b border-gray-200" key={item.id}>
              {item.image && (
                <img src={item.image} alt={item.title || "Product"} className="w-20 h-20 object-cover mr-4" />
              )}
              <div className="flex-grow">
                <h3 className="text-lg font-medium">{item.title}</h3>
                <p className="text-gray-600">${item.price} x {item.quantity}</p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  className="bg-gray-300 text-black py-1 px-2 rounded hover:bg-gray-400"
                  onClick={() => handleQuantityChange(item.id, -1)}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  className="bg-gray-300 text-black py-1 px-2 rounded hover:bg-gray-400"
                  onClick={() => handleQuantityChange(item.id, 1)}
                >
                  +
                </button>
                <button
                  className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition duration-200"
                  onClick={() => handleRemove(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No items in the cart</p>
      )}
      <div className="mt-4 flex justify-between items-center">
        <p className="text-xl font-semibold">
          Total: <span className="text-green-600">${calculateTotal(cart).toFixed(2)}</span>
        </p>
        <div>
          {cart.length > 0 && (
            <button
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-200"
              onClick={() => navigate('/shipping')}
            >
              Proceed to Checkout
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cartis;

