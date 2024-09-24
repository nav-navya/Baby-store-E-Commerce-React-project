import React from 'react'
import { IoIosMenu } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css'

const Navbar = () => {

  const [isMenuOpen , setisMenuOpen] = useState(false)

  function toggleMenu(){
    setisMenuOpen(!isMenuOpen);
  }

  return (
    <div >
      <nav className='bg-slate-800 p-4 flex items-center justify-between '>
        
          <div className='text-white text-2xl font-bold '>Baby<span className='text-pink-600'>Boo</span></div>
       

        <div className='block md:hidden  fixed top-4 right-4'>
          <button onClick={toggleMenu} className='pr-10 text-white'>
          <IoIosMenu />
          </button>
        </div>

        <ul className=' hidden md:flex space-x-12'>
          <NavLink to='/'><li className='text-white '>Home</li></NavLink>
          <NavLink to='viewShop' ><li className='text-white '>Shop</li></NavLink>
          <NavLink to='About' ><li className='text-white '>About Us</li></NavLink>
          <NavLink to='Test' ><li className='text-white '>Testimonial</li></NavLink>
          <NavLink to='Contact' ><li className='text-white '>Contact Us</li></NavLink>
          <NavLink to='/register' ><li className='text-white '><FaUser /></li></NavLink>
        </ul>

        {/* mobile  display*/}

        {isMenuOpen ? (
          <ul className='flex flex-col md:hidden'>
            <NavLink to='/home'><li className='text-white py-4'>Home</li></NavLink>
          <NavLink to='Shop' ><li className='text-white py-4'>Shop</li></NavLink>
          <NavLink to='About' ><li className='text-white py-4'>About Us</li></NavLink>
          <NavLink to='Test' ><li className='text-white py-4'>Testimonial</li></NavLink>
          <NavLink to='Contact' ><li className='text-white py-4'>Contact Us</li></NavLink>
          <NavLink to='/' ><li className='text-white py-4'><FaUser /></li></NavLink>
          </ul> 
        ) : null}

      </nav>
      
    </div>
  )
}

export default Navbar
