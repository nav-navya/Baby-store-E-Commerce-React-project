
import React, { useState } from 'react';
import axios from 'axios';

function AdminAddProduct() {
  const [isOpen, setIsOpen] = useState(false);
  const [productData, setProductData] = useState({
    title: '',
    price: '',
    category: '',
    description: '',
    image:""
  });

  // Toggle form visibility
  const handleToggleForm = () => setIsOpen(!isOpen);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const form = new FormData()
      form.append("title",productData.title) 
      form.append("price",productData.price) 
      form.append("category",productData.category) 
      form.append("description",productData.description) 
      form.append("image",productData.image) 

      const response = await axios.post(
        'http://localhost:4001/api/products/addProduct',
        productData,
        { headers: { 'Content-Type':"multipart/form-data" } }
      );
      if (response.status === 201) {
        alert('Product added successfully!');
        setProductData({
          title: '',
          price: '',
          category: '',
          description: '',
          image:""
        });
        setIsOpen(false); // Close the form
      }
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product. Please try again.');
    }
  };

  return (
    <div>
      <button onClick={handleToggleForm} className="bg-blue-500 text-white py-2 px-4 rounded">
        Add Product +
      </button>

      {isOpen && (
        <form onSubmit={handleSubmit} className="mt-4 p-4 border rounded">
          <div className="flex flex-col gap-2">
            <input
              type="text"
              name="title"
              value={productData.title}
              onChange={handleInputChange}
              placeholder="Product Name"
              className="p-2 border rounded"
              required
            />
            <input
              type="number"
              name="price"
              value={productData.price}
              onChange={handleInputChange}
              placeholder="Product Price"
              className="p-2 border rounded"
              required
            />
            <input
              type="text"
              name="category"
              value={productData.category}
              onChange={handleInputChange}
              placeholder="Category"
              className="p-2 border rounded"
              required
            />
        <input 
        type='file'
        name='image'
        className="p-2 border rounded"
        onChange={(e)=>{setProductData((data)=>({...data,image:e.target.files[0]}))}}/>    
        <textarea
              name="description"
              value={productData.description}
              onChange={handleInputChange}
              placeholder="Product Description"
              className="p-2 border rounded"
              required
            ></textarea>
            <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded mt-2">
              Add Product
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default AdminAddProduct;
