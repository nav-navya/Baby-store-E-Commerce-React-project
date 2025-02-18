
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
;

const LoginSignup = () => {
  const [formData, setFormData] = useState({
    fname: '',
    email: '',
    pwd: '',
    cpwd: '',
    isBlock: false,
  });

  const [errors, setErrors] = useState({});
  const [validation, setValidation] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = true;
    let validationError = {};

    if (!formData.fname) {
      isValid = false;
      validationError.fname = 'Full Name is required.';
    }

    if (!formData.email) {
      isValid = false;
      validationError.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      isValid = false;
      validationError.email = 'Email is not valid.';
    }

    if (!formData.pwd) {
      isValid = false;
      validationError.pwd = 'Password is required.';
    } else if (formData.pwd.length < 6) {
      isValid = false;
      validationError.pwd = 'Password should be at least six characters.';
    }

    if (formData.pwd !== formData.cpwd) {
      isValid = false;
      validationError.cpwd = 'Passwords do not match.';
    }

    setErrors(validationError);
    setValidation(isValid);

    if (isValid) {
      axios
        .post('http://localhost:4001/auth/register', {
          name: formData.fname,
          email: formData.email,
          password: formData.cpwd,
        })
        .then(() => {
          alert('Registered Successfully');
          navigate('/login'); // Redirect after success
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              className={`w-full mt-2 p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.fname ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
              }`}
              onChange={(e) => setFormData({ ...formData, fname: e.target.value })}
            />
            {errors.fname && <p className="text-red-500 text-sm mt-1">{errors.fname}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className={`w-full mt-2 p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.email ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
              }`}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className={`w-full mt-2 p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.pwd ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
              }`}
              onChange={(e) => setFormData({ ...formData, pwd: e.target.value })}
            />
            {errors.pwd && <p className="text-red-500 text-sm mt-1">{errors.pwd}</p>}
          </div>

          <div className="mb-6">
            <label className="block text-gray-700">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm your password"
              className={`w-full mt-2 p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.cpwd ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
              }`}
              onChange={(e) => setFormData({ ...formData, cpwd: e.target.value })}
            />
            {errors.cpwd && <p className="text-red-500 text-sm mt-1">{errors.cpwd}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-300"
          >
            Sign Up
          </button>
        </form>
        <p className="text-center text-gray-600 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-500 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginSignup;
