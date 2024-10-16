import React, { useState } from 'react'
import { useContext } from 'react'
import { ProductContext } from '../Components/Context/Context'
import ViewProducts from '../Components/Shop/ViewProducts'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import EditProduct from './EditProduct'


const AdminViewProducts = () => {
  const { products, setProducts } = useContext(ProductContext)

  const [newProduct, setNewProduct] = useState({ name: '', description: '' });
  const [editingProduct, setEditingProduct] = useState(null);

  const navigate = useNavigate();


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

  function AdminEditProduct(id){
    


  }

///////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <div>
      <h1 className='text-xl p-6 text-center'>View and Manage Products</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
        {products.map((product) => (
          <div key={product.id} style={{ border: '1px solid #ddd', padding: '16px', borderRadius: '8px', textAlign: 'center', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <img src={product.image} alt={product.name} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px 8px 0 0' }} />
            <h3 style={{ margin: '10px 0', fontSize: '1.25rem', color: '#333' }}>{product.name}</h3>
            <p style={{ fontWeight: 'bold', color: '#555' }}>Price: ${product.price}</p>
            <p style={{ fontSize: '0.9rem', color: '#888' }}>Category: {product.category}</p>
            <div className='mt-5'>
            <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out" onClick={()=>navigate(`/admin/EditProducts/${product.id}`)}>Edit</button>

            <button className="bg-red-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-red-600 transition duration-300 ease-in-out ml-2" onClick={()=>AdminDeleteProduct(product.id)}>Deletess</button>
            </div>
            
            {/* <Link to={`/product/${product.id}`}>
        <button style={{ padding: '10px 16px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          View Product
        </button>
        </Link > */}
          </div>
        ))}
      </div>

    </div>
  )
}

export default AdminViewProducts
