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
import Cartis from './Components/Cart/Cart'
import Paymentform from './Components/payment/paymentform'
import Pay from './Components/payment/pay'
import ShowOrders from './Components/Orders/ShowOrders'
import Category from './Components/Category'

// import './index.css'

function App() {

  return (
    <div>
    {/* <LoginSignup/> */}
    {/* <Register/> */}
    {/* <Navbar/> */}
   
  <Context>
    <Routes>
      <Route path='/' element={<Navbar/>}>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/About' element={<About/>}></Route>
      <Route path='/register' element={<LoginSignup/>}></Route>
      <Route path='/login' element={<Register/>}></Route>
      <Route path='/viewShop' element={<ViewProducts/>}></Route>
      <Route path='/product/:id' element={<ProductDetails/>} />
      <Route path='/cart' element={<Cartis/>} />
      <Route path='/category' element={<Category/>}/>
      </Route>
      <Route path='/shipping' element={<Paymentform/>} />
      <Route path='/payment' element={<Pay/>} />
      <Route path='/order' element={<ShowOrders/>}/>
      <Route path='/category' element={<Category/>}/>


  


    </Routes>
  </Context>
    {/* <ViewProducts/> */}

    {/* <Main/> */}
    </div>
  )
}

export default App
