



// import React, { useContext } from 'react';
// import { ProductContext } from '../Context/Context';
// import { useParams } from 'react-router-dom';

// const ProductDetails = () => {
//   const { products, handlecart } = useContext(ProductContext);
//   const { _id } = useParams();

//   // Find the product that matches the ID
//   console.log("id is",products._id)
//   const product = products.find((item) => item._id === _id);
//   console.log( "products are",product);

//   if (!product) {
//     return <h2>Product not found</h2>;
//   }

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="max-w-5xl w-full mx-auto bg-white p-8 shadow-md rounded-lg flex">
//         {/* Left Section: Product Image */}
//         <div className="w-1/2">
//           <img
//             src={product.image}
//             alt={product.name}
//             className="w-full h-96 object-cover rounded-lg"
//           />
//         </div>

//         {/* Right Section: Product Details */}
//         <div className="w-1/2 pl-8 flex flex-col justify-center">
//           <h2 className="text-3xl font-bold mb-4">{product.title}</h2>
//           <p className="text-xl mb-2">Price: <span className="font-semibold">${product.price}</span></p>
//           <p className="text-lg mb-4">Category: <span className="italic">{product.category}</span></p>
//           <p className="text-gray-600 mb-6">
//             Lorem, ipsum dolor sit amet consectetur adipisicing elit. Soluta nam eaque totam ut fugit, aliquam laborum sequi excepturi minus. Dolorum expedita, impedit quis laborum eius quia dignissimos nostrum pariatur consectetur.
//           </p>
//           <button
//             className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-500 transition duration-300"
//             onClick={() => handlecart(product)}
//           >
//             Add to Cart
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetails;




import React, { useContext } from 'react';
import { ProductContext } from '../Context/Context';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
  const { products, handlecart } = useContext(ProductContext);
  const { _id } = useParams();

  // Find the product that matches the ID
  const product = products.find((item) => item._id === _id);

  if (!product) {
    return <h2 className="text-center text-2xl font-semibold mt-10">Product not found</h2>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 py-10">
      <div className="max-w-7xl w-full mx-auto bg-white p-10 shadow-xl rounded-xl flex flex-wrap lg:flex-nowrap gap-8">
        {/* Left Section: Product Image */}
        <div className="w-full lg:w-1/2">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-80 sm:h-96 object-cover rounded-xl shadow-lg transition-transform duration-300 transform hover:scale-105"
          />
        </div>

        {/* Right Section: Product Details */}
        <div className="w-full lg:w-1/2 flex flex-col justify-start gap-4">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">{product.title}</h2>
          <p className="text-2xl font-semibold text-blue-600 mb-4">${product.price}</p>
          <p className="text-lg text-gray-600 mb-6">{product.category}</p>
          <p className="text-base text-gray-700 mb-6">
            {product.description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor."}
          </p>

          <div className="flex items-center gap-4">
            <button
              className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-full shadow-md hover:bg-blue-500 transition duration-300 ease-in-out transform hover:scale-105"
              onClick={() => handlecart(product)}
            >
              Add to Cart
            </button>
            <button
              className="px-8 py-4 border-2 border-blue-600 text-blue-600 font-semibold rounded-full shadow-md hover:bg-blue-600 hover:text-white transition duration-300 ease-in-out transform hover:scale-105"
              onClick={() => alert('Product added to wishlist!')}
            >
              Add to Wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
