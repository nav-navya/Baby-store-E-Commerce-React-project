import React, { useContext, useState } from 'react'
import { ProductContext } from './Context/Context'

const Category = () => {

  const {products} = useContext(ProductContext)
  const [selectedCategory , setSelectedCategory] = useState('allproducts');
  
  function handleCategoryChange(category){
    setSelectedCategory(category)
  }

  const filteredProducts = products.filter(
    (product) => product.category === selectedCategory
  );
  return (


   

    


    <div>
      <h2>Nutritions</h2>
      {/* <div>
        {
          products.filter(product=>product.category === 'nutrition')
          .map(product =>(<div key={product.id}>
            <img src={product.image} alt={product.name} className="product-image" />
            <h3>{product.name}</h3>
            <p>Price: ${product.price}</p>
          </div>

          ))
        }
      </div> */}
      <div className="flex flex-wrap justify-between p-4">
      <button className="flex-1 m-2 p-3 bg-pink-500 text-white rounded-lg hover:bg-blue-600 transition"
      onClick={()=>handleCategoryChange('allproducts') } >
        All Products
      </button>
      <button className="flex-1 m-2 p-3 bg-pink-500 text-white rounded-lg hover:bg-green-600 transition"
      onClick={()=>handleCategoryChange('nutrition') } >
        Nutrition
      </button>
      <button className="flex-1 m-2 p-3 bg-pink-500 text-white rounded-lg hover:bg-red-600 transition"
      onClick={()=>handleCategoryChange('clothes') } >
        Clothes
      </button>
      <button className="flex-1 m-2 p-3 bg-pink-500 text-white rounded-lg hover:bg-yellow-600 transition" 
      onClick={()=>handleCategoryChange('nursery')}>
        Nursery
      </button>
      <button className="flex-1 m-2 p-3 bg-pink-500 text-white rounded-lg hover:bg-purple-600 transition"
      onClick={()=>handleCategoryChange('toys') } >
        Toys
      </button>
    </div>

    {/* ??????????????------Displaying products with category---------?????????????? */}

    
  

      
    </div>
  )
}

export default Category
