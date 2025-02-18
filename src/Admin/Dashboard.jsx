import React, { useContext, useEffect, useState } from 'react'
// import productDetails from '../Components/Shop/productDetails'
import { ProductContext } from '../Components/Context/Context';
import AdminAddProduct from './AdminAddProduct';
import { Link } from 'react-router-dom';

function Dashboard() {
  
 

  const [selectedCategory, setSelectedCategory] = useState('allproducts')
  const { products, setProducts, users } = useContext(ProductContext)
  const [totalOrders, setTotalOrders] = useState(0)
  const [totalEarnings, setTotalEarnings] = useState(0)


  // function handleCategoryChange(category) {
  //   setSelectedCategory(category);

  // }

  const filteredProducts =
    selectedCategory === 'allproducts'
      ? products
      : products.filter((product) => product.category === selectedCategory);






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


  useEffect(() => {
    if (users.length === 0) {
      setTotalOrders(0);
      setTotalEarnings(0);
      return;
    }

    let totalOrders = 0;
    
    users.data.forEach((user) => {
      totalOrders += user.order?.length || 0;
    });
    let totalEarningsTemp = 0; // 
    users.data.forEach((user) => {
      const userOrders = user.order || [];
      userOrders.forEach((order) => {
        const orderProducts = order.products || [];
        orderProducts.forEach((product) => {
          const price = product.price || 0;
          const quantity = product.quantity || 0;
          totalEarningsTemp += price * quantity;
        });
      });
    })

    setTotalOrders(totalOrders);
    setTotalEarnings(totalEarningsTemp);

  }, [users]);



  return (
    <div>
      <div className="flex flex-col gap-4 p-4">

        <button className="bg-pink-600 text-white text-xl font-bold py-4 rounded-lg shadow-md hover:bg-pink-700 transition duration-300" >
          Total Products : {products.length}
        </button>
        <button className="bg-pink-600 text-white text-xl font-bold py-4 rounded-lg shadow-md hover:bg-pink-700 transition duration-300" >
          Total Users : {users.data?.length}
        </button>
        <button className="bg-pink-600 text-white text-xl font-bold py-4 rounded-lg shadow-md hover:bg-pink-700 transition duration-300" >
          Total Orders : {totalOrders}
        </button>
        <button className="bg-pink-600 text-white text-xl font-bold py-4 rounded-lg shadow-md hover:bg-pink-700 transition duration-300" >
          Total Earnings : {totalEarnings}$
        </button>
        <Link to="/admin/AddProduct">
        <button className="bg-blue-200 text-black text-xl font-bold py-4 rounded-lg shadow-md hover:bg-pink-400 transition duration-300" >
          Add products? 
        </button>
        </Link>
        
      </div>

      <div></div>

    </div>
  )
}

export default Dashboard;
