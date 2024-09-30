import React from 'react'


import Babyabout from '../../assets/baby-two.jpg';

const About = () => {
  return (
    <div className='m-16'>
      <h2 className='text-center'>About Us..</h2>
      <h2>India's Favorite Baby store..</h2>
      <img src={Babyabout} alt="About Baby" className= 'w-1/2 h-1/2' /> 

    </div>
  );
}

export default About;

