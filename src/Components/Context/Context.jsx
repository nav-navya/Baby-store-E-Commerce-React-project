import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

export const ProductContext = createContext();

const Context = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

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

  function loadCart(userId){
    let savedcart = localStorage.getItem("cart")
    if(savedcart){
      setCart(JSON.parse(savedcart))
    }
    else
      axios.get(`http://localhost:3000/users/${userId}`)
    .then((res)=>{
      const userCart = res.data.cart || [];
      setCart(userCart)
      localStorage.setItem("cart",JSON.stringify(userCart))
    })
  }
  useEffect(()=>{
    const userId = localStorage.getItem("id");
    if(userId){
      loadCart(userId);
    }

  },[])

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
    <ProductContext.Provider value={{ products, handleLogOut, handlecart, cart }}>
      {children}
    </ProductContext.Provider>
  )
}

export default Context
