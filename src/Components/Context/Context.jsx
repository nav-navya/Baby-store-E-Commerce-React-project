import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'
import { replace, useNavigate } from 'react-router-dom';

export const ProductContext = createContext();

const Context = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [order, setOrder] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [users, setUsers] = useState([]);
  const [quantity, setquantity] = useState(1);
  const [cartLength, setCartLength] = useState(0);

  const [userCart, setUserCart] = useState([])


  const navigate = useNavigate()

  function handleLogOut() {
    console.log("loging out");

    navigate('/', { replace: true })
    localStorage.clear()
  }

  useEffect(() => {
    axios.get('http://localhost:4001/products/allProducts')
      .then((res) => {
        // console.log("allproducts",res.data.allProducts)
        setProducts(res.data.allProducts)
        console.log("product check on context", products)
      })

      .catch((err) => { console.error('error fetching products..', err) })
  }, [])

  const gotItem = localStorage.getItem("id")




  useEffect(() => {
    const userId = localStorage.getItem("id");
    if (userId) {
      loadCart(userId);
    }

  }, [])
  

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`http://localhost:4001/api/users/getUsers`)
      console.log("response user data check",response.data)
      setUsers(response.data)
    }
    catch (err) {
      console.log("error occured when fetching user data", err)
    }
  }


  useEffect(()=>{
    fetchUserData()
  },[])


 




  ////////////////////////////////////////////////////////////////////////////////////////////////////


  async function placeOrder() {
    const gotItem = localStorage.getItem("id"); // Get the user ID

    try {
      // Load the cart and fetch user data
      const userResponse = await axios.get(`http://localhost:3000/users/${gotItem}`);
      const userData = userResponse.data;

      // Create new order
      const newOrder = {
        orderId: new Date().toISOString(),
        products: userData.cart,
        orderDate: new Date(),
        status: "Paid",
      };

      // Update user data with new order and clear the cart
      const newUserData = {
        ...userData,
        order: [...(userData.order || []), newOrder],
        cart: [],
      };

      // Send updated user data to the server
      const updateResponse = await axios.put(`http://localhost:3000/users/${gotItem}`, newUserData);
      console.log('Order placed successfully:', updateResponse.data);

      if (updateResponse.status === 200) {
        localStorage.setItem("cart", []);
        alert("Payment Successful")
        navigate('/order')
      }

      // Optionally handle response or show a success message
      // setOrder(newOrders);

    } catch (err) {
      console.error('Error during the order process:', err);
    }

    // Navigate to the order page
  }




  ///////////////////////////////////////////////////////////////////////////////////////////////////


  function loadCart() {

    axios.get("http://localhost:4001/cart/getCart", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }
    })
      .then((res) => {
        setUserCart(res.data.cart)


      })
      .catch((error) => {
        console.error("error occured...")
      })
  }

  useEffect(() => {
    loadCart()
  }, [])
  
  
  function handlecart(elem) {
    const token = localStorage.getItem("token");
    const blockedStatus = localStorage.getItem("isBlock")

    if (!token) {
      alert("Please log in.");
    } else if (blockedStatus === true) {
      alert("please contact Admin")

    } else {
      console.log(cart)
      let isPresent = cart.some((item) => item._id === elem._id);
      console.log(isPresent)
      //some() returns true or false

      if (isPresent) {
        alert("The product is already in the cart.");
      } else {
        const updatedCart = [...cart, elem]

        axios.post(`http://localhost:4001/cart/add`, {
          productId: elem._id,
          quantity: 1,
        }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,

          }
        })
          .then((res) => {
            console.log(res.data);
            alert("product added succesfully")

          })
          .catch((err) => {
            console.error(" error catch", err);
            if (err?.status == 400) {
              alert("product already in the cart")
            }
            // alert("Failed to add to cart. Please try again.");
          });
      }
    }
  }


  const handleEditSubmit = async (e, currentProduct) => {
    e.preventDefault();
    try {
      const res = await axios.patch(`http://localhost:3000/products/${currentProduct.id}`, currentProduct)
      const updatedProduct = products.map((item) => item.id === currentProduct.id ? currentProduct : item)
      setProducts(updatedProduct)
      // console.log(updatedProduct);

      console.log(res.data)
      navigate(`/admin/AdminViewProducts`)
    }
    catch (err) { console.log("error in editing product", err) }


  }




  // };



  return (
    <ProductContext.Provider value={{ products, handleLogOut, handlecart, cart, setCart, placeOrder, order, setProducts, handleEditSubmit, users, setUsers, cartLength, userCart, loadCart }}>
      {children}
    </ProductContext.Provider>
  )



}

export default Context