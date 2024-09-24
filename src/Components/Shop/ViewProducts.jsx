import React, { useContext } from 'react'
import { ProductContext } from '../Context/Context';
import { Link } from 'react-router-dom';

const ViewProducts = () => {

  const {products} = useContext(ProductContext);


  return (
    <div>
      <h2 className='text-4xl p-8 text-center italic font-sans'>Products..</h2>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
    {products.map((product) => (
      <div key={product.id} style={{ border: '1px solid #ddd', padding: '16px', borderRadius: '8px', textAlign: 'center', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <img src={product.image} alt={product.name} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px 8px 0 0' }} />
        <h3 style={{ margin: '10px 0', fontSize: '1.25rem', color: '#333' }}>{product.name}</h3>
        <p style={{ fontWeight: 'bold', color: '#555' }}>Price: ${product.price}</p>
        <p style={{ fontSize: '0.9rem', color: '#888' }}>Category: {product.category}</p>
        <Link to={`/product/${product.id}`}>
        <button style={{ padding: '10px 16px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          View Product
        </button>
        </Link >
      </div>
    ))}
  </div>
  </div>
  

  )
}

export default ViewProducts
