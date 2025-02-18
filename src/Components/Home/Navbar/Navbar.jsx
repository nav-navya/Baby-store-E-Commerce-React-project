// import React, { useContext, useEffect } from 'react'
// import { IoIosMenu } from "react-icons/io";
// import { FaUser } from "react-icons/fa";
// import { useState } from 'react';
// import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
// import './Navbar.css'
// import { ProductContext } from '../../Context/Context';
// import { FaShoppingCart } from "react-icons/fa";




// const Navbar = () => {

//   const { handleLogOut, cart ,userCart} = useContext(ProductContext)
//   const [cartLength , setCartLength] = useState(0);

//   const [isMenuOpen, setisMenuOpen] = useState(false)

//   const id = localStorage.getItem("id");
//   const token = localStorage.getItem("token");

//   useEffect(()=>{
//     if(id){
//       const length = cart?.length || 0
//     setCartLength(length)
//     }
//     else{
//       setCartLength(0)
//     }
//   },[cart,id])

//   function toggleMenu() {
//     setisMenuOpen(!isMenuOpen);
//   }
//   const isLoggedIn = localStorage.getItem("isLoggedin")
//   return (
//     <div >
//       <nav className='bg-slate-800 p-4 flex items-center justify-between '>

//         <div className='text-white text-2xl font-bold '>Baby<span className='text-pink-600'>Boo</span></div>


//         <div className='block md:hidden  fixed top-4 right-4'>
//           <button onClick={toggleMenu} className='pr-10 text-white'>
//             <IoIosMenu />
//           </button>
//         </div>

//         <ul className=' hidden md:flex space-x-12'>
//           {/* <NavLink to='/cart'><div className='flex'><li className='text-white '><FaShoppingCart /></li>
//           <p className='text-white'>{cartLength}</p>
//           </div></NavLink> */}
//           <NavLink to='/cart'>
//             <div className='relative flex'>
//               <li className='text-white text-2xl'>
//                 <FaShoppingCart />
//               </li>
//               <p className='absolute -top-4 -right-4 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center'>
//                 {/* {userCart.items.length} */}0
//               </p>
//             </div>
//           </NavLink>
//           <NavLink to='/'><li className='text-white '>Home</li></NavLink>
//           <NavLink to='/viewShop' ><li className='text-white '>Shop</li></NavLink>
//           {/* <NavLink to='/order' ><li className='text-white '> Orders</li></NavLink> */}

//           {
//             (!token) ? <NavLink to='/register' ><li className='text-white '><FaUser /></li></NavLink> :
//               <button onClick={handleLogOut} className='text-white px-4 border border-black'>Log out</button>
//           }

//         </ul>

//         {/* mobile  display*/}

//         {isMenuOpen ? (
//           <ul className='flex flex-col md:hidden'>
//             <NavLink to='/'><li className='text-white py-4'>Home</li></NavLink>
//             <NavLink to='category' ><li className='text-white py-4'>Shop</li></NavLink>
//             <NavLink to='About' ><li className='text-white py-4'>About Us</li></NavLink>

//             <NavLink to='Contact' ><li className='text-white py-4'>Contact Us</li></NavLink>
//             <NavLink to='/' ><li className='text-white py-4'><FaUser /></li></NavLink>
//           </ul>
//         ) : null}

//       </nav>
//       <Outlet />
//     </div>
//   )
// }

// export default Navbar

import React, { useContext, useEffect } from 'react';
import { IoIosMenu } from 'react-icons/io';
import { FaUser } from 'react-icons/fa';
import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { ProductContext } from '../../Context/Context';
import { FaShoppingCart } from 'react-icons/fa';

const Navbar = () => {
  const { handleLogOut, cart, userCart } = useContext(ProductContext);

  
  const cartItems = userCart?.items || [];

  const [cartLength, setCartLength] = useState(0);
  const [isMenuOpen, setisMenuOpen] = useState(false);
  const navigate = useNavigate();

  const id = localStorage.getItem('id');
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (id) {
      const length = cart?.length || 0;
      setCartLength(length);
    } else {
      setCartLength(0);
    }
  }, [cart, id]);

  const toggleMenu = () => {
    setisMenuOpen(!isMenuOpen);
  };

  const handleCartClick = (e) => {
    if (!token) {
      e.preventDefault(); // Prevent navigation
      alert('Please log in to access your cart.');
      navigate('/register'); // Redirect to the registration or login page
    }
    // If the user is logged in, the NavLink will work as usual
  };

  return (
    <div>
      <nav className="bg-slate-800 p-4 flex items-center justify-between">
        <div className="text-white text-2xl font-bold">
          Baby<span className="text-pink-600">Boo</span>
        </div>

        <div className="block md:hidden fixed top-4 right-4">
          <button onClick={toggleMenu} className="pr-10 text-white">
            <IoIosMenu />
          </button>
        </div>

        <ul className="hidden md:flex space-x-12">
          <NavLink
            to={token ? '/cart' : '#'} // Disable link if not logged in
            onClick={handleCartClick}
          >
            <div className="relative flex">
              <li className="text-white text-2xl">
                <FaShoppingCart />
              </li>
              <p className="absolute -top-4 -right-4 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cartItems.length}
              </p>
            </div>
          </NavLink>
          <NavLink to="/">
            <li className="text-white">Home</li>
          </NavLink>
          <NavLink to="/viewShop">
            <li className="text-white">Shop</li>
          </NavLink>

          {!token ? (
            <NavLink to="/register">
              <li className="text-white">
                <FaUser />
              </li>
            </NavLink>
          ) : (
            <button onClick={handleLogOut} className="text-white px-4 border border-black">
              Log out
            </button>
          )}
        </ul>

        {/* Mobile display */}
        {isMenuOpen ? (
          <ul className="flex flex-col md:hidden">
            <NavLink to="/">
              <li className="text-white py-4">Home</li>
            </NavLink>
            <NavLink to="category">
              <li className="text-white py-4">Shop</li>
            </NavLink>
            <NavLink to="About">
              <li className="text-white py-4">About Us</li>
            </NavLink>
            <NavLink to="Contact">
              <li className="text-white py-4">Contact Us</li>
            </NavLink>
            <NavLink to="/">
              <li className="text-white py-4">
                <FaUser />
              </li>
            </NavLink>
          </ul>
        ) : null}
      </nav>
      <Outlet />
    </div>
  );
};

export default Navbar;

