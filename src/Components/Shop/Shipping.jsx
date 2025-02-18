import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Shipping = () => {
  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("shippingAddress", JSON.stringify(address)); // Store address temporarily
    navigate("/payment"); // Redirect to payment page
  };

  return (
    <div className="max-w-lg mx-auto p-6 border rounded shadow-lg">
      <h2 className="text-xl font-bold mb-4">Shipping Address</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="fullName" placeholder="Full Name" onChange={handleChange} required className="w-full p-2 border rounded" />
        <input type="text" name="phone" placeholder="Phone Number" onChange={handleChange} required className="w-full p-2 border rounded" />
        <input type="text" name="street" placeholder="Street Address" onChange={handleChange} required className="w-full p-2 border rounded" />
        <input type="text" name="city" placeholder="City" onChange={handleChange} required className="w-full p-2 border rounded" />
        <input type="text" name="state" placeholder="State" onChange={handleChange} required className="w-full p-2 border rounded" />
        <input type="text" name="zip" placeholder="ZIP Code" onChange={handleChange} required className="w-full p-2 border rounded" />
        <input type="text" name="country" placeholder="Country" onChange={handleChange} required className="w-full p-2 border rounded" />
        
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">Proceed to Payment</button>
      </form>
    </div>
  );
};

export default Shipping;
