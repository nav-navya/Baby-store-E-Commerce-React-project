import React, { useState } from 'react';
import axios from 'axios';
import { Link,useNavigate} from 'react-router-dom';


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
      axios.get('http://localhost:3000/users')
        .then(result => {
          const user = result.data.find(user => user.email === formData.email);
          console.log(user)

          if (user) {
            if (user.pwd === formData.pwd) {
              alert("Login Successfully");
              navigate('/')
              localStorage.setItem("isLoggedin",true)
              localStorage.setItem("id",user.id)
              localStorage.setItem("cart",[])
              
            } else {
              setErrors({ ...validationError, pwd: "Wrong password" });
              setValidation(false);
            }
          } else {
            setErrors({ ...validationError, email: "Email not found" });
            setValidation(false);
          }
        })
        .catch(err => {
          console.error("Error fetching users:", err);
        });
    }
  };

  return (
    <div className='w-screen h-screen bg-slate-800 flex items-center justify-center'>
      <div className='w-full sm:w-3/4 md:w-1/2 lg:w-1/3 h-3/4 bg-cyan-100 rounded-lg flex-col flex justify-center items-center p-4'>
        <div className='text-blue-900 font-bold text-3xl mb-6'>Log In</div>

        <form className='w-full' onSubmit={handleSubmit}>
          <div>
            <input
              type='text'
              placeholder='Enter Email'
              className='w-full m-2 h-10 border border-gray-400 rounded-lg p-2'
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}
          </div>

          <div>
            <input
              type='password'
              placeholder='Enter Password'
              className='w-full m-2 h-10 border border-gray-400 rounded-lg p-2'
              onChange={(e) => setFormData({ ...formData, pwd: e.target.value })}
            />
            {errors.pwd && <p className="text-red-500">{errors.pwd}</p>}
          </div>

          <button type='submit' className='mt-4 bg-blue-500 text-white p-2 rounded'>
            Login
          </button>
        </form>
        <div>Don't have an account? <Link to='/register'>Sign up here</Link></div>
      </div>
    </div>
  );
};

export default Register;
