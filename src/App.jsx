import './App.css'
import LoginSignup from './Components/Register_and_login/Login'
import Navbar from './Components/Home/Navbar/Navbar'
import { Routes, Route } from 'react-router-dom'
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
import AdminSidebar from './Admin/AdminSidebar'
import Dashboard from './Admin/Dashboard'
import User from './Admin/User'
import AdminViewProducts from './Admin/ViewProducts'
import AdminHome from './Admin/AdminSidebar'
import EditProduct from './Admin/EditProduct'
// import UsersList from './Admin/AdminEditUser'
// import './index.css'

function App() {

  return (
    <div>
      {/* <LoginSignup/> */}
      {/* <Register/> */}
      {/* <Navbar/> */}

      <Context>
        <Routes>
          <Route path='/' element={<Navbar />}>
            <Route path='/' element={<Home />}></Route>
            <Route path='/About' element={<About />}></Route>
            <Route path='/register' element={<LoginSignup />}></Route>
            <Route path='/login' element={<Register />}></Route>
            <Route path='/viewShop' element={<ViewProducts />}></Route>
            <Route path='/product/:id' element={<ProductDetails />} />
            <Route path='/cart' element={<Cartis />} />
            <Route path='/category' element={<Category />} />
          </Route>
          <Route path='/shipping' element={<Paymentform />} />
          <Route path='/payment' element={<Pay />} />
          <Route path='/order' element={<ShowOrders />} />
          <Route path='/category' element={<Category />} />
          <Route path='/admin' element={<AdminHome />} >
            <Route path='/admin/Dashboard' element={<Dashboard />} />
            <Route path='/admin/User' element={<User />} />
            <Route path='/admin/AdminViewProducts' element={<AdminViewProducts />} />
            <Route path='/admin/EditProducts/:id' element={<EditProduct />} />
            {/* <Route path='/admin/Users/' element={<UsersList />} /> */}
            

            
            

          </Route>










        </Routes>
      </Context>
      {/* <ViewProducts/> */}

      {/* <Main/> */}
    </div>
  )
}

export default App
