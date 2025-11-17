
import Home from "./pages/home/Home";
import ProductList from "./pages/products/ProductList";
import Product from "./pages/product/SingleProduct";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile"
import Cart from "./pages/cart/Cart";
import Checkout from "./pages/checkout/Checkout";
import { BrowserRouter,Routes,Route, useLocation, Navigate } from "react-router-dom";
import Layout from "./layout/Layout";
import AllProducts from "./pages/allproducts/AllProducts";
import { useLayoutEffect } from "react";
import Toaster from "./components/Toaster";
import { useSelector } from "react-redux";
import Success from "./pages/success/Success";
import UserOrders from "./pages/userorders/UserOrders";
import UserOrderDetail from "./pages/userorderdetail/UserOrderDetail";





const Wrapper = ({children}) => {
  const location = useLocation()
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0,0)
  },[location.pathname])
   return children
}



function App() {
  
  const { currentUser } = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);


   return (
    <div className="App">
      <BrowserRouter>
       <Wrapper> 
       <> 
          <Toaster />  
        <Routes>
            <Route path='/register'element={currentUser ? <Navigate to="/"/> : <Register />}/>
            <Route path='/login'element={currentUser ? <Navigate to="/" /> : <Login/>}/>
            <Route path='/'element={ <Layout/> }>
            <Route index element={ <Home/> }/>
            
            <Route path='/allproducts'element={<AllProducts/>}/>
            <Route path='/products/:category/:img'element={<ProductList/>}/>  
            <Route path='/product/:id'element={<Product/>}/>
            <Route path='/user/:id'element={currentUser ? <Profile/> : <Navigate to="/"/>}/>
            <Route path='/user/orders/:id' element={currentUser ? <UserOrders/> : <Navigate to="/"/>}/>
           <Route path='/user/order/:orderId' element={<UserOrderDetail/>}/>
            <Route path='/cart'element={<Cart/>}/>
            <Route path='/checkout' element={currentUser ? <Checkout/> : <Navigate to="/login"/>}/>
            <Route path='/success' element={ <Success/> }/> 
          </Route>
         </Routes>
         </>
        </Wrapper>
      </BrowserRouter>

    </div>
   )
}

export default App;
 