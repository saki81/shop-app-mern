import "./sidebar.css";
import { LineStyle,
         Timeline,
         PermIdentity,
         Storefront,
         AttachMoney,
         MailOutline,
         DynamicFeed,
         ChatBubbleOutline,
         PersonAddOutlined,
         AddBoxOutlined,
         } from '@material-ui/icons/';
import { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
   const [active, setActive] = useState("/")

   const activeSidebar = (link) => {
     setActive(link)
   }

   return ( 
      <div className="sidebar">
        <div className="sidebar-wrapper">
          <div className="sidebar-menu">
             <h3 className="sidebar-title">Dashboard</h3>
             <ul className="sidebar-list">
             
               <Link 
                 to="/" 
                 className={`sidebar-list-item ${active=== "/" ? 'active' : ""}`}
                 onClick={() => activeSidebar("/")}
                 >
                  <LineStyle 
                   className="sidebar-icon"
                   />
                  Home
               </Link>
                
               <li className="sidebar-list-item">
                   <Timeline className="sidebar-icon"/>
                   Analitics
               </li>
               <Link to="/orders"
               className= {`sidebar-list-item ${active === '/orders' ? 'active' : ""}`}
               onClick={() => activeSidebar("/orders")}
               >
                   <AttachMoney className="sidebar-icon"/>
                   Orders
               </Link>
             </ul>

             <h3 className="sidebar-title">Quick Menu</h3>
             <ul className="sidebar-list">
               <Link to="/users" className={`sidebar-list-item ${active === '/users' ? 'active' : ''}`}
                onClick={() => activeSidebar("/users")}>
                   <PermIdentity className="sidebar-icon"/>
                   Users
               </Link>
               <Link to="/newuser" className={`sidebar-list-item ${active === '/newuser' ? 'active' : ''}`}
                onClick={() => activeSidebar("/newuser")}>
                   <PersonAddOutlined className="sidebar-icon"/>
                   Add User
               </Link>
               <Link to="/products" className={`sidebar-list-item ${active === '/products' ? 'active' : ''}`}
                onClick={() => activeSidebar("/products")}>
                   <Storefront className="sidebar-icon"/>
                   Products
               </Link>
               <Link to="/newproduct" className="sidebar-list-item">
                   <AddBoxOutlined className="sidebar-icon"/>
                   Add Product
               </Link>
             </ul>

             <h3 className="sidebar-title">Notifications</h3>
             <ul className="sidebar-list">
               <li className="sidebar-list-item">
                   <MailOutline className="sidebar-icon"/>
                   Mail
               </li>
               <li className="sidebar-list-item">
                   <DynamicFeed className="sidebar-icon"/>
                   Feedback
               </li>
               <li className="sidebar-list-item">
                   <ChatBubbleOutline className="sidebar-icon"/>
                   Message
               </li>
             </ul>
           
          </div>
        </div>
      </div>
    );
}
 
export default Sidebar;