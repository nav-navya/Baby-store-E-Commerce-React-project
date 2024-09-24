import React, { useState } from 'react';
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'

const LoginSignup = () => {
  const [formData, setFormData] = useState({
    fname: '',
    email: '',
    pwd: '',
    cpwd: ''
  });

  const [errors, setErrors] = useState({});
  const [validation, setValidation] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = true;
    let validationError = {};

    if (formData.fname === '' || formData.fname === null) {
      isValid = false;
      validationError.fname = 'Full Name is Required..';
    }

    if (formData.email === '' || formData.email === null) {
      isValid = false;
      validationError.email = 'Email is Required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      isValid = false;
      validationError.email = 'Email is not Valid';
    }

    if (formData.pwd === '' || formData.pwd === null) {
      isValid = false;
      validationError.pwd = 'Password is Required';
    } else if (formData.pwd.length < 6) {
      isValid = false;
      validationError.pwd = 'Password should be at least six characters';
    }

    if (formData.pwd !== formData.cpwd) {
      isValid = false;
      validationError.cpwd = 'Please provide matching passwords';
    }

    setErrors(validationError);
    setValidation(isValid);

    if (Object.keys(validationError).length === 0) {
      // alert('Registered Successfully...');
      axios.post('http://localhost:3000/users',formData)
      .then(result =>{
        alert("Registerd Successfully")
        navigate('/')
      })
      .catch(err =>console.log(err))
      
    }
  };

  return (
    <div className='w-screen h-dvh bg-slate-800 flex items-center justify-center'>
      <div className='w-full sm:w-3/4 md:w-1/2 lg:w-1/3 h-3/4 bg-cyan-100 rounded-lg flex-col flex justify-center items-center p-4'>
        <div className='text-blue-900 font-bold text-3xl mb-6'>Sign Up</div>
        <form className='w-full' onSubmit={handleSubmit}>
          <div>
            <input
              type='text'
              placeholder='Name'
              className='w-full m-2 h-10 border border-gray-400 rounded-lg p-2'
              onChange={(e) => setFormData({ ...formData, fname: e.target.value })}
            />
            {validation ? <></> : <span>{errors.fname}</span>}
          </div>

          <div>
            <input
              type='email'
              placeholder='Email'
              className='w-full m-2 h-10 border border-gray-400 rounded-lg p-2'
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            {validation ? <></> : <span>{errors.email}</span>}
          </div>

          <div>
            <input
              type='password'
              placeholder='Password'
              className='w-full m-2 h-10 border border-gray-400 rounded-lg p-2'
              onChange={(e) => setFormData({ ...formData, pwd: e.target.value })}
            />
            {validation ? <></> : <span>{errors.pwd}</span>}
          </div>

          <div>
            <input
              type='password'
              placeholder='Confirm Password'
              className='w-full m-2 h-10 border border-gray-400 rounded-lg p-2'
              onChange={(e) => setFormData({ ...formData, cpwd: e.target.value })}
            />
            {validation ? <></> : <span>{errors.cpwd}</span>}
          </div>

          <div className='submit-container w-full flex place-content-around'>
            <button type='submit' className='bg-slate-800 text-white p-2 rounded-lg'>Sign Up</button>
            
          </div>
        </form>
        <div>Does have an Account ? <Link to='/login'>Log in ...</Link></div>
      </div>
    </div>
  );
};

export default LoginSignup;
