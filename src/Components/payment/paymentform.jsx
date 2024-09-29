import React from "react";
import { useFormik } from "formik";
import { Link } from "react-router-dom";

const PaymentForm = () => {
  const formik = useFormik({
    initialValues: {
      cardName: "",
      cardNumber: "",
      phone: "",
      phone2: "",
      state: "",
      district: "",
      zip: "",
    },
    validate: (values) => {
      const errors = {};
      
      // Full Name validation
      if (!values.cardName) {
        errors.cardName = "Full Name is required";
      }
      
      // Address validation
      if (!values.cardNumber) {
        errors.cardNumber = "Address is required";
      }

      // Phone validation
      if (!values.phone) {
        errors.phone = "Phone is required";
      }

      // State validation
      if (!values.state) {
        errors.state = "State is required";
      }

      // District validation
      if (!values.district) {
        errors.district = "District is required";
      }

      // Pin Code validation
      if (!values.zip) {
        errors.zip = "Pin Code is required";
      } else if (!/^\d{5}$/.test(values.zip)) {
        errors.zip = "Pin Code must be 5 digits";
      }

      return errors;
    },
    onSubmit: (values) => {
      console.log("Form Data:", values);
      alert("Form Submitted");
    },
  });

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-pink-600">Shipping Information</h2>
      
      <form onSubmit={formik.handleSubmit}>
        {/* Full Name */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cardName">
            Enter Full Name
          </label>
          <input
            type="text"
            id="cardName"
            {...formik.getFieldProps("cardName")}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-pink-500 ${
              formik.touched.cardName && formik.errors.cardName ? "border-red-500" : ""
            }`}
            placeholder="John Doe"
          />
          {formik.touched.cardName && formik.errors.cardName ? (
            <p className="text-red-500 text-xs mt-1">{formik.errors.cardName}</p>
          ) : null}
        </div>

        {/* Address */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cardNumber">
            Address
          </label>
          <textarea
            id="cardNumber"
            {...formik.getFieldProps("cardNumber")}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-pink-500 ${
              formik.touched.cardNumber && formik.errors.cardNumber ? "border-red-500" : ""
            }`}
            placeholder="Your address here.."
          />
          {formik.touched.cardNumber && formik.errors.cardNumber ? (
            <p className="text-red-500 text-xs mt-1">{formik.errors.cardNumber}</p>
          ) : null}
        </div>

        {/* Phone Numbers */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
              Phone
            </label>
            <input
              type="text"
              id="phone"
              {...formik.getFieldProps("phone")}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-pink-500 ${
                formik.touched.phone && formik.errors.phone ? "border-red-500" : ""
              }`}
              placeholder="Phone"
            />
            {formik.touched.phone && formik.errors.phone ? (
              <p className="text-red-500 text-xs mt-1">{formik.errors.phone}</p>
            ) : null}
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone2">
              Phone 2
            </label>
            <input
              type="text"
              id="phone2"
              {...formik.getFieldProps("phone2")}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-pink-500"
              placeholder="Another phone number"
            />
          </div>
        </div>

        {/* State */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="state">
            State
          </label>
          <input
            type="text"
            id="state"
            {...formik.getFieldProps("state")}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-pink-500 ${
              formik.touched.state && formik.errors.state ? "border-red-500" : ""
            }`}
            placeholder="State"
          />
          {formik.touched.state && formik.errors.state ? (
            <p className="text-red-500 text-xs mt-1">{formik.errors.state}</p>
          ) : null}
        </div>

        {/* District */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="district">
            District
          </label>
          <input
            type="text"
            id="district"
            {...formik.getFieldProps("district")}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-pink-500 ${
              formik.touched.district && formik.errors.district ? "border-red-500" : ""
            }`}
            placeholder="District"
          />
          {formik.touched.district && formik.errors.district ? (
            <p className="text-red-500 text-xs mt-1">{formik.errors.district}</p>
          ) : null}
        </div>

        {/* Pin Code */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="zip">
            Pin Code
          </label>
          <input
            type="text"
            id="zip"
            {...formik.getFieldProps("zip")}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-pink-500 ${
              formik.touched.zip && formik.errors.zip ? "border-red-500" : ""
            }`}
            placeholder="12345"
          />
          {formik.touched.zip && formik.errors.zip ? (
            <p className="text-red-500 text-xs mt-1">{formik.errors.zip}</p>
          ) : null}
        </div>

        {/* Submit Button */}
        <Link to = '/payment'><button type="submit" className="w-full bg-pink-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-pink-700 transition duration-300">
          Pay Now
        </button>
        </Link>
      </form>
    </div>
  );
};

export default PaymentForm;
