
import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom';

const ViewProducts = () => {

  const [searchParams] = useSearchParams();
  const category = searchParams.get("category"); // toys, care, feeding...

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        let url = "http://localhost:4001/products/allproducts";

        if (category) {
          url = `http://localhost:4001/products/category/${category}`;
        }

        const res = await fetch(url);
        const data = await res.json();

        if (category) {
          setProducts(data);
        } else {
          setProducts(data.allProducts);
        }

      } catch (error) {
        console.log(error);
      } finally {
         setTimeout(() => {
        setLoading(false);
      }, 1500);
        // setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

 if (loading) {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-12 h-12 border-4 border-gray-300 border-t-gray-800 rounded-full animate-spin"></div>
    </div>
  );
}

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">

      <h2 className="text-4xl text-center font-semibold text-gray-800 mb-8 italic">
        Products {category && `- ${category}`}
      </h2>

      {products.length === 0 && (
        <p className="text-center text-gray-500 text-lg">No products found.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.map((product) => (
          <Link key={product._id} to={`/product/${product._id}`}>
            <div className="bg-white p-4 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl ">
              
              <div className="relative w-full h-64 mb-4 p-2">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>

              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {product.title}
              </h3>

              <p className="text-lg font-bold text-gray-600 mb-1">
                ₹{product.price}
              </p>

            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default ViewProducts;
