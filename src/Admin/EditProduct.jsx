import React, { useContext, useEffect, useState } from 'react'
import { ProductContext } from '../Components/Context/Context';
import { useParams } from 'react-router-dom';

const EditProduct = () => {
  const [editingProduct, setEditingProduct] = useState(null);
  const { id } = useParams()

  const { handleEditSubmit, products } = useContext(ProductContext)

  useEffect(() => {
    const itemSearch = products.find((item) => item.id == id);
    if (itemSearch) {
      setEditingProduct(itemSearch)
      console.log("success");
    }
    else {
      console.warn("product not found")
    }
  }, [products,id])


  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingProduct) {
      handleEditSubmit(e, editingProduct)
    }
  }



  // const { products }= useContext(ProductContext);
  return (

    <div className="flex justify-center mt-5">
      {editingProduct && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-md w-full space-y-4">
          <h3 className="text-lg font-semibold text-gray-700 text-center">Edit Product</h3>
          <label className="block">
            <span className="text-gray-600 text-sm">ID</span>
            <input
              type="text"
              value={editingProduct.id}
              disabled
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-sm"
            />
          </label>
          <label className="block">
            <span className="text-gray-600 text-sm">Name</span>
            <input
              type="text"
              value={editingProduct.name}
              onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-sm"
            />
            
          </label>
          <label className="block">
            <span className="text-gray-600 text-sm">Category</span>
            <select
              type="text"
              value={editingProduct.category}
              onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-sm"
            >
              <option value='toys'>toys</option>
              <option value='nursery'>nursery</option>
              <option value='nutrition'>nutrition</option>
              <option value='clothes'>clothes</option>
            </select>
            
          </label>
          
          <label className="block">
            <span className="text-gray-600 text-sm">Category</span>
            <input
              type="text"
              value={editingProduct.category}
              onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-sm"
            />
          </label>
          <label className="block">
            <span className="text-gray-600 text-sm">Price</span>
            <input
              type="number"
              value={editingProduct.price}
              onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-sm"
            />
          </label>
          <div className="flex justify-between mt-4">
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
              Save Changes
            </button>
            <button type="button" onClick={() => setEditingProduct(null)} className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400">
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>




  )
}





export default EditProduct;
