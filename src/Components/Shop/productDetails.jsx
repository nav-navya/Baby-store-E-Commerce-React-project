



import React, { useContext } from 'react';
import { ProductContext } from '../Context/Context';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
  const { products, handlecart } = useContext(ProductContext);
  const { _id } = useParams();

  // Find the product that matches the ID
  console.log("id is",products._id)
  const product = products.find((item) => item._id === _id);
  console.log( "products are",product);

  if (!product) {
    return <h2>Product not found</h2>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-5xl w-full mx-auto bg-white p-8 shadow-md rounded-lg flex">
        {/* Left Section: Product Image */}
        <div className="w-1/2">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-96 object-cover rounded-lg"
          />
        </div>

        {/* Right Section: Product Details */}
        <div className="w-1/2 pl-8 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-4">{product.title}</h2>
          <p className="text-xl mb-2">Price: <span className="font-semibold">${product.price}</span></p>
          <p className="text-lg mb-4">Category: <span className="italic">{product.category}</span></p>
          <p className="text-gray-600 mb-6">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Soluta nam eaque totam ut fugit, aliquam laborum sequi excepturi minus. Dolorum expedita, impedit quis laborum eius quia dignissimos nostrum pariatur consectetur.
          </p>
          <button
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-500 transition duration-300"
            onClick={() => handlecart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
