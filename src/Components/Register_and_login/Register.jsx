
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    pwd: ""
  });
  const [errors, setErrors] = useState({});
  const [validation, setValidation] = useState(true);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = true;
    let validationError = {};

    // Validation checks
    if (formData.email === '') {
      isValid = false;
      validationError.email = 'Email is Required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      isValid = false;
      validationError.email = 'Email is not Valid';
    }

    if (formData.pwd === '') {
      isValid = false;
      validationError.pwd = 'Password is Required';
    } else if (formData.pwd.length < 6) {
      isValid = false;
      validationError.pwd = 'Password should be at least six characters';
    }

    // Set validation errors if any
    setErrors(validationError);
    setValidation(isValid);

    // Proceed if form is valid
    if (isValid) {
      axios.post('http://localhost:4001/auth/login', { email: formData.email, password: formData.pwd })
        .then(result => {
          // console.log("result", result.data.data.isAdmin);
          if(result.data.data.isAdmin == true) {
            alert("Login successful");
            localStorage.setItem("token", result.data.token)
            navigate('/admin');
          }else if (result.status === 200) {
            alert("Login successful");
            localStorage.setItem("token", result.data.token)
            navigate('/');

          } else {
            alert("Can't login, refresh the page");
          }
        })
        .catch(err => {
          alert("login failed")
          console.error("Error fetching users:", err);
        });
    }
  };

  return (
    <div className='w-screen h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 flex items-center justify-center'>
      <div className='w-full sm:w-3/4 md:w-1/2 lg:w-1/3 bg-white rounded-lg shadow-lg flex flex-col items-center p-6'>
        <h1 className='text-4xl font-extrabold text-gray-800 mb-8'>Log In</h1>

        <form className='w-full' onSubmit={handleSubmit}>
          <div className='mb-6'>
            <input
              type='text'
              placeholder='Enter Email'
              className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none'
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email}</p>}
          </div>

          <div className='mb-6'>
            <input
              type='password'
              placeholder='Enter Password'
              className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none'
              onChange={(e) => setFormData({ ...formData, pwd: e.target.value })}
            />
            {errors.pwd && <p className="text-red-500 text-sm mt-2">{errors.pwd}</p>}
          </div>

          <button type='submit' className='w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-400'>
            Login
          </button>
        </form>

        <div className='mt-4 text-sm text-gray-600'>
          Don't have an account?{' '}
          <Link to='/register' className='text-indigo-600 hover:underline'>
            Sign up here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
