import { useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useSelector, useDispatch } from "react-redux";
import {FiUser} from "react-icons/fi";
import { logout, reset} from "../redux/apiCalls";
import { Link, NavLink } from "react-router-dom";
import useToaster from "../hooks/useToaster";
import useClickedOutside from "../hooks/useClickedOutside";



const UserMenu = () => {


  const currentUser = useSelector((state) => state.auth.currentUser);
  const cart = useSelector((state) => state.cart);

  const [open, setOpen] = useState(false);
  
  const toaster = useToaster();
  const dispatch = useDispatch();

  const ref = useClickedOutside(() => setOpen(false))

 const onLogout = () => {
    logout(dispatch, currentUser, cart);

     toaster.showSuccess("User Is Logout", 1400)
  };


  return (
    <>
      {open && <div className="overlay" onClick={(() => setOpen(false))}></div>}
      <div ref={ref}>
       {currentUser 
        ? ( <User onClick={() => setOpen(!open)}>
             <FiUser style={{fontSize: "26px", color:"#9AEBA3", cursor:"pointer"}}/>
               <Username>
                  {currentUser?.username} 
                </Username>

          {open && (
              <OpenUser>
                 {currentUser.isAdmin &&   
                    <Link className="link" to={`http://localhost:3001/login`} target="_blank" rel="noopener noreferrer">DASHBOARD</Link> 
                 } 

                <Link className="link" to={`/user/${currentUser._id}`}>
                    PROFILE
                </Link>

                <Link className="link" to={`user/orders/${currentUser._id}`}>
                    ORDERS
                </Link>
               
               <Link className="link" to={"/"} onClick={onLogout}>
                    LOGOUT
                </Link>     
              </OpenUser>
             
            )} 
      </User>

     ) : ( 
      <RightAccount>
         <NavLink to="/login" style={{listStyle: "none",textDecoration: "none"}}>
           <MenuItem >LOG IN</MenuItem>
         </NavLink> 
   
         <NavLink to="/register" style={{listStyle: "none",textDecoration: "none"}}>
           <MenuItem >REGISTER</MenuItem>
         </NavLink>
      </RightAccount>
   ) }
   </div> 
   </>
   );
}
 
export default UserMenu;

const User = styled.div`
  display: flex;
  z-index: 10;
  justify-content: center;
  align-items: center;
`;
const Username = styled.span`
   cursor: pointer;
   margin-left: 8px;
   letter-spacing: 1.5px;
   color: #9AEBA3;
`;

const OpenUser = styled.div`
  width: 90px;
  height: 50px;
  padding: 20px 35px 40px;
  color: white;
  position: absolute;
  z-index: 20;
  display: flex;
  flex-direction: column;
  top: 43px;
  right: 37px;
  background-color: #45c4b0;
  box-shadow: 0px 0px 13px -3px rgba(0,0,0,0.56);
  -webkit-box-shadow: 0px 2px 12px -5px rgba(0,0,0,0.45);
  -moz-box-shadow: 0px 0px 13px -3px rgba(0,0,0,0.56);
 
  &::before {
    content: "";
    display: block;
    position: absolute;
    top: -10px;
    left: 80px;
    border-left: 0;
    width: 0; 
    height: 0; 
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid #45c4b0;
  }
`;
const RightAccount = styled.div`
  display: flex;  
`;
const MenuItem = styled.li`
  margin-left: 15px;
  font-weight: 600;
  letter-spacing: 1px;
  color: #9AEBA3;
  cursor: pointer;
  text-decoration-line: unset;

  ${mobile(
        {
          width: "41px",
          fontSize: "11px",
          paddingRight: "0px", 
          marginLeft: "10px"
        }
        )}
 
`;