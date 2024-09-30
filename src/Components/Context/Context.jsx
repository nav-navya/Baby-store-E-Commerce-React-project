import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

export const ProductContext = createContext();

const Context = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [order, setOrder] = useState([]);

  const navigate = useNavigate()

  function handleLogOut() {
    navigate('/register')
    localStorage.removeItem("id")
    localStorage.removeItem("isLoggedin")
    localStorage.removeItem("cart")
  }

  useEffect(() => {
    axios.get('http://localhost:3000/products')
      .then((res) => { setProducts(res.data) })
      .catch((err) => { console.error('error fetching products..', err) })
  })

  const gotItem = localStorage.getItem("id")

  // function loadCart(userId){
  //   let savedcart = localStorage.getItem("cart")
  //   if(savedcart){
  //     setCart(savedcart)
  //   }
  //   else
  //     axios.get(`http://localhost:3000/users/${userId}`)
  //   .then((res)=>{
  //     const userCart = res.data.cart || [];
  //     setCart(userCart)
  //     localStorage.setItem("cart",JSON.stringify(userCart))
  //   })
  // }
  function loadCart(userId){
    let savedcart = localStorage.getItem("cart");
    
    // Check if the saved cart is a valid JSON string
    try {
        if(savedcart){
            setCart(JSON.parse(savedcart));
        } else {
            axios.get(`http://localhost:3000/users/${userId}`)
            .then((res) => {
                const userCart = res.data.cart || [];
                setCart(userCart);
                // Store the cart as a stringified JSON
                localStorage.setItem("cart", JSON.stringify(userCart));
            });
        }
    } catch (error) {
        console.error("Error parsing saved cart from localStorage:", error);
        // Clear any invalid data from localStorage
        localStorage.removeItem("cart");
    }
}
  useEffect(()=>{
    const userId = localStorage.getItem("id");
    if(userId){
      loadCart(userId);
    }

  },[])
////////////////////////////////////////////////////////////////////////////////////////////////////

  function placeOrder() {
    axios.get(`http://localhost:3000/users/${gotItem}`)
      .then((res) => {
        let cart = res.data.cart;
        let cartElem = [...cart]; // Copy the cart
  
        // Now send the patch request
        axios.patch(`http://localhost:3000/users/${gotItem}`, {
          order: cartElem,  // Set the order to cartElem
        })
        .then((res) => {
          console.log(cartElem);  // Log the cart elements
        })
        .catch((err) => {
          console.error('Error with patch request:', err); // Error handling
        });
      })
      .catch((err) => {
        console.error('Error with get request:', err); // Error handling
      });
      navigate('/order')

  }
  




///////////////////////////////////////////////////////////////////////////////////////////////////
  function handlecart(elem) {
    const gotItem = localStorage.getItem("id");

    if (!gotItem) {
        alert("Please log in.");
    } else {
        let isPresent = cart.some((item) => item.id === elem.id);

        if (isPresent) {
            alert("The product is already in the cart.");
        } else {
          const updatedCart = [...cart, elem]
            axios.patch(`http://localhost:3000/users/${gotItem}`, {
                cart:updatedCart,
            })
            .then((res) => {
                console.log(res.data);
                setCart(updatedCart);
                localStorage.setItem("cart",JSON.stringify(updatedCart));
                console.log(cart);
                
                alert("Cart added successfully.");
            })
            .catch((err) => {
                console.error(err);
                alert("Failed to add to cart. Please try again.");
            });
        }
    }
}
  return (
    <ProductContext.Provider value={{ products, handleLogOut, handlecart, cart,setCart,placeOrder,order }}>
      {children}
    </ProductContext.Provider>
  )
}

export default Context
