

import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Home from "./pages/home/Home";
import OrderList from "./pages/orderlist/OrderList";
import Order from './pages/order/Order';
import UserList from "./pages/userslist/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newuser/NewUser";
import ProductList from "./pages/productlist/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newproduct/NewProduct";
import Login from "./pages/login/Login";
import Layout from "./layout/Layout";


function App() {
  const ProtectedRoute = ({children}) => {
      
   const admin = JSON.parse(JSON.parse(localStorage.getItem("persist:root"))?.auth || "{}")?.currentUser?.isAdmin;

     if(!admin) {
       return <Navigate to= "/login"/>   
     } 
     
     return  children;
  }

  return (
     <div className="App">
      <BrowserRouter>
       <Routes>
       
           <Route path="/login" 
              element={<Login/>}>
           </Route>
         
        <Route element={
            <ProtectedRoute>
              <Layout/>
            </ProtectedRoute>
          }>
            <Route path="/" element={
             <ProtectedRoute>
               <Home/>
             </ProtectedRoute>
            }/>
            <Route path="/orders" element={
             <ProtectedRoute>
               <OrderList/>
             </ProtectedRoute>
            }/> 
            <Route path="/order/:id" element={
              <ProtectedRoute>
                <Order/>
              </ProtectedRoute>
            }/>
            <Route path="/users" element={
             <ProtectedRoute>
               <UserList/>
             </ProtectedRoute>
            }/>
            <Route path="/user/:id" element={
             <ProtectedRoute>
               <User/>
             </ProtectedRoute>
            }/>
          <Route path="/newuser" element={
             <ProtectedRoute>
               <NewUser/>
             </ProtectedRoute>
            }/>
          <Route path="/products" element={
             <ProtectedRoute>
               <ProductList/>
             </ProtectedRoute>
            }/>
          <Route path="/product/:id" element={
             <ProtectedRoute>
               <Product/>
             </ProtectedRoute>
            }/> 
          <Route path="/newproduct" element={
             <ProtectedRoute>
               <NewProduct/>
             </ProtectedRoute>}/>
        </Route> 
       </Routes> 
      </BrowserRouter>
      </div>
  );
}

export default App;
