import "./topbar.css";
import PersonIcon from '@material-ui/icons/Person';
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../redux/apiCalls";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Topbar = () => {

   const { currentUser } = useSelector((state) => state?.auth);
   const [open, setOpen] = useState(false); 

   const dispatch = useDispatch();
   const navigate = useNavigate();

   const onLogout = () => {
     logoutUser(dispatch);
     navigate("/login")
   }

   return ( 
   <div className="topbar">
      <div className="topbar-wrapper">
         <div className="top-left">
            <span className="logo">ADMIN SHOP</span>
         </div>
         {currentUser ? (
          <div onClick={() => setOpen(!open)}
              className="topbar-icon-container">
            <PersonIcon style={{fontSize: "26px", color:"#9AEBA3", cursor:"pointer"}}/>
         <span className="username">
            {currentUser.username}
        </span>
        {open && (   
             <div className="top-right">
                <span className="open-user"
                      onClick={onLogout}>
                    LOGOUT
                </span>
              </div>     
           )}
       
           </div> 
          ) : ("")}
        </div>  
      </div>   
  );
}
 
export default Topbar;