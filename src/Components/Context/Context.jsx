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
  const [cartLength , setCartLength] = useState(0);


  const navigate = useNavigate()

  function handleLogOut() {
    navigate('/', { replace: true })
    localStorage.removeItem("id")
    localStorage.removeItem("isLoggedin")
    localStorage.removeItem("cart")
    localStorage.removeItem("isBlock")
  }

  useEffect(() => {
    axios.get('http://localhost:3000/products')
      .then((res) => { setProducts(res.data) })
      .catch((err) => { console.error('error fetching products..', err) })
  }, [])

  const gotItem = localStorage.getItem("id")














  function loadCart(userId) {
    let savedcart = localStorage.getItem("cart");

    // Check if the saved cart is a valid JSON string
    try {
      if (savedcart) {
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
    }
    catch (error) {
      console.error("Error parsing saved cart from localStorage:", error);
      // Clear any invalid data from localStorage
      localStorage.removeItem("cart");
    }
  }
  useEffect(() => {
    const userId = localStorage.getItem("id");
    if (userId) {
      loadCart(userId);
    }

  }, [])
  ///////////////////////////////Admin users////////////////////////////////////////////////////////////////
  useEffect(
    () => {
      const fetchUsers = async () => {
        try {
          const res = await axios.get(`http://localhost:3000/users`)
          setUsers(res.data)

        }
        catch (error) {
          console.log(`an error occured`, error)
        }

      }
      fetchUsers()

    }, []
  )








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



  ///////////////////////////////////////////////////////////////////////////////////////////////

  const AdminDeleteProduct = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/products/${id}`);
      if (response.status === 200) {
        setProducts(products.filter(product => product.id !== id))
        alert(`product deleted successfully`);

      }
    }
    catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product");


    }

  }
  ///////////////////////admin delete user//////////////////////////////////


  const adminDeleteUser = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/users/${id}`);
      if (response.status === 200) {
        setUsers(users.filter(user => user.id !== id))
        alert("deleted succesfully")


      }
    } catch (err) {
      console.log("error occured", err)
    }

  }





  ///////////////////////////////////////////////////////////////////////////////////////////////////
  function handlecart(elem) {
    const gotItem = localStorage.getItem("id");
    const blockedStatus = localStorage.getItem("isBlock")

    if (!gotItem) {
      alert("Please log in.");
    } else if (blockedStatus === "true") {
      alert("please contact Admin")

    } else {
      let isPresent = cart.some((item) => item.id === elem.id);//some() returns true or false

      if (isPresent) {
        alert("The product is already in the cart.");
      } else {
        const updatedCart = [...cart, elem]
        axios.patch(`http://localhost:3000/users/${gotItem}`, {//if cart is already in it. no need to create . adding new key as cart 
          cart: updatedCart,
        })
          .then((res) => {
            console.log(res.data);
            setCart(updatedCart);
            localStorage.setItem("cart", JSON.stringify(updatedCart));
            alert("Cart added successfully.");
            const length = updatedCart.length;
            setCartLength(length)

          })
          .catch((err) => {
            console.error(err);
            alert("Failed to add to cart. Please try again.");
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
    <ProductContext.Provider value={{ products, handleLogOut, handlecart, cart, setCart, placeOrder, order, setProducts, handleEditSubmit, users, setUsers, adminDeleteUser,cartLength }}>
      {children}
    </ProductContext.Provider>
  )



}

export default Context