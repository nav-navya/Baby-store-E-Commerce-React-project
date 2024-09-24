import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'

export const ProductContext = createContext();

const Context = ({children}) => {
  
  const [ products,setProducts ] = useState([]);
  useEffect(()=>{
    axios.get('http://localhost:3000/products')
    .then((res)=>{setProducts(res.data)})
    .catch((err)=>{console.error('error fetching products..',err)})
  })
  return (
   <ProductContext.Provider value={{products}}>
    {children}
   </ProductContext.Provider>
  )
}

export default Context
