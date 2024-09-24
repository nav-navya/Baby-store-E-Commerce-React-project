import './App.css'
import LoginSignup from './Components/Register_and_login/Login'
import Navbar from './Components/Home/Navbar/Navbar'
import { Routes,Route } from 'react-router-dom'
import Home from './Components/Home/Home'
import About from './Components/About/About'
import Register from './Components/Register_and_login/Register'
import Main from './Components/Home/MainImg'
import Context from './Components/Context/Context'
import ViewProducts from './Components/Shop/ViewProducts'
import ProductDetails from './Components/Shop/productDetails'

// import './index.css'

function App() {

  return (
    <div>
    {/* <LoginSignup/> */}
    {/* <Register/> */}
    <Navbar/>
   
  <Context>
    <Routes>
      <Route path='/navbar' element={<Navbar/>}></Route>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/About' element={<About/>}></Route>
      <Route path='/register' element={<LoginSignup/>}></Route>
      <Route path='/login' element={<Register/>}></Route>
      <Route path='/viewShop' element={<ViewProducts/>}></Route>
      <Route path='/product/:id' element={<ProductDetails/>} />

  


    </Routes>
  </Context>
    

    {/* <Main/> */}
    </div>
  )
}

export default App
