


import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../Components/Context/Context";
import { useParams } from "react-router-dom";
import axios from "axios";

const EditProduct = () => {
  const [editingProduct, setEditingProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const { id } = useParams();
  const { products } = useContext(ProductContext);

  useEffect(() => {
    console.log("Products from context:", products);
    console.log("Product ID from URL:", id);

    if (products && products.length > 0) {
      const itemSearch = products.find((item) => item._id === id);
      if (itemSearch) {
        console.log("Product found:", itemSearch);
        setEditingProduct(itemSearch);
      } else {
        console.warn("Product not found");
        setEditingProduct(null);
      }
    } else {
      console.warn("Products array is empty or not loaded yet.");
    }
  }, [products, id]);

  const updateProduct = async (productId, updatedData) => {
    try {
      console.log("Product ID being sent:", productId);

      const formData = new FormData();
      formData.append("title", updatedData.title);
      formData.append("category", updatedData.category);
      formData.append("price", updatedData.price);

      if (selectedImage) {
        formData.append("image", selectedImage);
      }

      const response = await axios.put(
        `http://localhost:4001/api/products/product/${productId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log("Updated successfully:", response.data);
      alert("Product updated successfully!");
    } catch (error) {
      console.error("Error updating product:", error.message);
      alert("Failed to update product");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
    if (editingProduct) {
      console.log("Submitting product:", editingProduct);
      updateProduct(editingProduct._id, {
        title: editingProduct.title,
        category: editingProduct.category,
        price: editingProduct.price,
      });
    } else {
      console.warn("No product data available for submission.");
    }
  };

  if (!editingProduct) {
    return (
      <div className="flex justify-center mt-5">
        Loading or product not found...
      </div>
    );
  }

  return (
    <div className="flex justify-center mt-5">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md max-w-md w-full space-y-4"
        encType="multipart/form-data"
      >
        <h3 className="text-lg font-semibold text-gray-700 text-center">
          Edit Product
        </h3>
        <label className="block">
          <span className="text-gray-600 text-sm">ID</span>
          <input
            type="text"
            value={editingProduct._id}
            disabled
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-sm"
          />
        </label>
        <label className="block">
          <span className="text-gray-600 text-sm">Name</span>
          <input
            type="text"
            value={editingProduct.title}
            onChange={(e) =>
              setEditingProduct({ ...editingProduct, title: e.target.value })
            }
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-sm"
          />
        </label>
        <label className="block">
          <span className="text-gray-600 text-sm">Category</span>
          <select
            value={editingProduct.category}
            onChange={(e) =>
              setEditingProduct({ ...editingProduct, category: e.target.value })
            }
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-sm"
          >
            <option value="toys">Toys</option>
            <option value="nursery">Nursery</option>
            <option value="nutrition">Nutrition</option>
            <option value="clothes">Clothes</option>
          </select>
        </label>
        <label className="block">
          <span className="text-gray-600 text-sm">Price</span>
          <input
            type="number"
            value={editingProduct.price}
            onChange={(e) =>
              setEditingProduct({ ...editingProduct, price: e.target.value })
            }
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-sm"
          />
        </label>

        {/* Image Upload Section */}
        <label className="block">
          <span className="text-gray-600 text-sm">Product Image</span>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setSelectedImage(e.target.files[0])}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-sm"
          />
        </label>

        {/* Preview Selected Image */}
        {selectedImage && (
          <div className="mt-2">
            <p className="text-sm text-gray-600">Selected Image Preview:</p>
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="Selected"
              className="mt-2 rounded-md w-32 h-32 object-cover"
            />
          </div>
        )}

        {/* Existing Image Preview */}
        {editingProduct.image && !selectedImage && (
          <div className="mt-2">
            <p className="text-sm text-gray-600">Current Image:</p>
            <img
              src={editingProduct.image}
              alt="Current Product"
              className="mt-2 rounded-md w-32 h-32 object-cover"
            />
          </div>
        )}

        <div className="flex justify-between mt-4">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={() => setEditingProduct(null)}
            className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
