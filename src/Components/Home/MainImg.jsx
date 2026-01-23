

import Hm from '../../assets/baby.webp'
import Kid from '../../assets/kid1.webp'
import Del from '../../assets/delivery.jpeg'
import Price from '../../assets/price.jpg'
import { NavLink } from 'react-router-dom'


const Main = () => {


  return (
    <div className="w-full">

      {/* ================= HERO SECTION ================= */}
      <section className="h-[calc(100vh-80px)] grid grid-cols-1 md:grid-cols-2 px-6 md:px-16 bg-[#fafafa]">
        
        {/* Left Content */}
        <div className="flex flex-col justify-center gap-6">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Everything Your Baby Needs, <br /> In One Place 
          </h1>

          <p className="text-gray-600 text-lg">
            Discover safe, comfortable and high-quality baby products.  
            From clothing to care essentials — we’ve got you covered.
          </p>

          <div className="flex gap-4">
            <NavLink to="/viewShop"><button className="px-6 py-3 bg-black text-white rounded-lg hover:scale-105 transition">
              Shop Now
            </button></NavLink>
            {/* <button className="px-6 py-3 border border-black rounded-lg hover:bg-black hover:text-white transition">
              Explore
            </button> */}
          </div>
        </div>

        {/* Right Image */}
        <div className="flex items-center justify-center overflow-hidden">
          <img 
            src={Hm} 
            alt="Baby Products"
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>

      </section>


      {/* ================= FEATURES ================= */}
      <section className="py-16 px-6 md:px-20 bg-white">
        <h2 className="text-3xl font-bold text-center mb-10">
          Why Parents Love Us ❤️
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center py-5">
          <img src={Kid} className='rounded-2xl h-96'/>
          <img src={Del} className='rounded-2xl h-96'/>
          <img src={Price} className='rounded-2xl h-96'/>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6 rounded-xl shadow">
            <h3 className="text-xl font-semibold mb-2">Safe Products</h3>
            <p className="text-gray-600">
              Baby-safe, dermatologist tested and quality verified products.
            </p>
          </div>

          <div className="p-6 rounded-xl shadow">
            <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
            <p className="text-gray-600">
              Super-fast and reliable delivery at your doorstep.
            </p>
          </div>

          <div className="p-6 rounded-xl shadow">
            <h3 className="text-xl font-semibold mb-2">Best Prices</h3>
            <p className="text-gray-600">
              Affordable pricing with exciting offers every week.
            </p>
          </div>
        </div>
      </section>


      {/* ================= CATEGORIES ================= */}
    
              {/* ================= CATEGORIES ================= */}
<section className="py-16 px-6 md:px-20 bg-[#fafafa]">
  <h2 className="text-3xl font-bold text-center mb-10">
    Shop By Category 🛒
  </h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">

    <NavLink to="/viewShop?category=clothing"
      className="h-40 bg-white shadow rounded-xl flex items-center justify-center text-xl font-semibold hover:scale-105 transition">
      Clothes
    </NavLink>

    <NavLink to="/viewShop?category=toys"
      className="h-40 bg-white shadow rounded-xl flex items-center justify-center text-xl font-semibold hover:scale-105 transition">
      Toys
    </NavLink>

    <NavLink to="/viewShop?category=feeding"
      className="h-40 bg-white shadow rounded-xl flex items-center justify-center text-xl font-semibold hover:scale-105 transition">
      Feeding
    </NavLink>

    <NavLink to="/viewShop?category=care"
      className="h-40 bg-white shadow rounded-xl flex items-center justify-center text-xl font-semibold hover:scale-105 transition">
      Care
    </NavLink>

  </div>
</section>

      {/* ================= CTA ================= */}
      <section className="py-20 bg-black text-white text-center px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Give Your Baby the Best 💕
        </h2>
        <p className="text-gray-300 mb-8">
          Start shopping today and enjoy premium quality products.
        </p>
        
      </section>

    </div>
  )
}

export default Main
