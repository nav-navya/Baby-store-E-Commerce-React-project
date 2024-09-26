import React, { useContext } from 'react'
import { ProductContext } from '../Context/Context'
import { useParams } from 'react-router-dom';

const productDetails = () => {
  const { products, handlecart } = useContext(ProductContext);
  const { id } = useParams();

  // Find the product that matches the ID
  const product = products.find((item) => parseInt(item.id) === parseInt(id));

  if (!product) {
    return <h2>Product not found</h2>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-xl mx-auto p-5 text-center border border-grey-300 center shadow-md ">
        <img src={product.image} alt={product.name} className="w-full h-72 object-cover mb-5" />
        <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
        <p className="text-lg mb-1">Price: ${product.price}</p>
        <p className="text-lg mb-1">Category: {product.category}</p>
        <p className="mb-4">
          {"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Soluta nam eaque totam ut fugit, aliquam laborum sequi excepturi minus. Dolorum expedita, impedit quis laborum eius quia dignissimos nostrum pariatur consectetur."}
        </p>
        <button className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-500 transition duration-300"
          onClick={() => handlecart(product)}>
          Add to Cart
        </button>
      </div>
    </div>


  );
};


export default productDetails
