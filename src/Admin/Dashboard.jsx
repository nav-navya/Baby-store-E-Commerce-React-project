import React, { useContext , useState} from 'react'
// import productDetails from '../Components/Shop/productDetails'
import { ProductContext } from '../Components/Context/Context';
function Dashboard() {

  const [selectedCategory , setSelectedCategory] = useState('allproducts')
  const {products,setProducts,users} = useContext(ProductContext)

  function handleCategoryChange(category){
    setSelectedCategory(category);

  }

  const filteredProducts =
    selectedCategory === 'allproducts'
      ? products
      : products.filter((product) => product.category === selectedCategory);

  // const filteredProducts = selectedCategory === 'allproducts'? products :
  // products.filter((product) => product.category === selectedCategory);



  
  
  
  const AdminDeleteProduct = async (id)=>{
    try{
      const response = await axios.delete(`http://localhost:3000/products/${id}`);
      if(response.status === 200) {
        setProducts(products.filter(product => product.id !== id))
        alert(`product deleted successfully`);

      }
    }
    catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product");
  }
 
  }
 
  // }

  return (
    <div>
           <div className="flex flex-col gap-4 p-4">

      <button className="bg-pink-600 text-white text-xl font-bold py-4 rounded-lg shadow-md hover:bg-pink-700 transition duration-300" onClick={()=>{handleCategoryChange('allproducts')}}>
        Total Products is {products.length}
      </button>
      <button className="bg-pink-600 text-white text-xl font-bold py-4 rounded-lg shadow-md hover:bg-pink-700 transition duration-300"   onClick={()=>{handleCategoryChange('totalUsers')}}>
        Total Users is {users.length}
      </button>
      <button className="bg-pink-600 text-white text-xl font-bold py-4 rounded-lg shadow-md hover:bg-pink-700 transition duration-300" onClick={()=>{handleCategoryChange('totalOrders')}}>
        Total Orders
      </button>
      <button className="bg-pink-600 text-white text-xl font-bold py-4 rounded-lg shadow-md hover:bg-pink-700 transition duration-300" onClick={()=>{handleCategoryChange('totalEarnings')}}>
        Total Earnings
      </button>
    </div>

    <div></div>

    </div>
  )
}

export default Dashboard;
