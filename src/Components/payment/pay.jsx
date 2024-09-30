import React, { useContext } from 'react'
import { ProductContext } from '../Context/Context';

const Pay = () => {

  const {placeOrder,order,setCart} = useContext(ProductContext)
  return (
   


    <div>
      <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-pink-600">
          Payment Information
        </h2>

        <form action="#" method="POST">
          <div className="mb-4">
            <p
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="cardName"
            >
              Cardholder Name
            </p>
            <input
              type="text"
              id="cardName"
              name="cardName"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-pink-500"
              placeholder="John Doe"
              required
            />
          </div>

          <div className="mb-4">
            <p
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="cardNumber"
            >
              Card Number
            </p>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-pink-500"
              placeholder="1234 5678 9101 1121"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="expiry"
              >
                Expiration Date
              </p>
              <input
                type="text"
                id="expiry"
                name="expiry"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-pink-500"
                placeholder="MM/YY"
                required
              />
            </div>
            <div>
              <p
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="cvv"
              >
                CVV
              </p>
              <input
                type="text"
                id="cvv"
                name="cvv"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-pink-500"
                placeholder="123"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <p
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="address"
            >
              Billing Address
            </p>
            <input
              type="text"
              id="address"
              name="address"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-pink-500"
              placeholder="123 Main St"
              required
            />
          </div>

          <div className="mb-4">
            <p
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="zip"
            >
              Zip Code
            </p>
            <input
              type="text"
              id="zip"
              name="zip"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-pink-500"
              placeholder="12345"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-pink-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-pink-700 transition duration-300" onClick={()=>placeOrder(order) }
          >
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default Pay
