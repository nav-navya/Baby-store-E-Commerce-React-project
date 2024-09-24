import React from 'react'
import Babyimg from '../../assets/baby-one.jpg'
import BabyTitle from '../../assets/title.png'


const Main= () => {
  return (
    <div className='flex flex-col md:flex-row'>
    <div className='bg-red-300 w-full md:w-1/2'>
    <img src={BabyTitle} className='w-full h-auto md:h-screen object-cover'></img>
  </div>
  <div className='w-full md:w-1/2'>
    <img src={Babyimg} className='w-full h-auto md:h-screen object-cover'></img>
  </div>
</div>

  )
}

export default Main
