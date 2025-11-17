import {  MailOutline, PermIdentity,  Publish, LockOutlined} from "@material-ui/icons";
import { useState } from "react";
import { Link, useLocation} from "react-router-dom";
import "./user.css";
import { useDispatch, useSelector }  from "react-redux"
import { updateUser } from "../../redux/apiCalls";


const User = () => {
   const location = useLocation();
   const userId = location.pathname.split("/")[2];

   const dispatch = useDispatch();
   const user = useSelector((state) =>  state.user.users.find((user) => 
      user._id === userId));

   const [updatedUser, setUpdateUser] = useState({
      _id: user?._id || "",
      username: user?.username || "",
      email: user?.email || "",
      password: user?.password || "",
   })

   const handleUpdate = () => {
      updateUser(user._id, updatedUser, dispatch)
   }
   return ( 
      <div className="user">
         <div className="user-title-container">
            <h1 className="user-title">Edit User</h1>
            <Link to="/newuser">
               <button className="user-add-btn">Create</button> 
            </Link> 
         </div>
         <div className="user-container">
            <div className="user-show">
               <div className="user-showtop">
                  <img src="https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2" 
                  alt="" 
                  className="user-show-img"/>
                   <div className="user-show-bottom">
                  <span className="user-show-title">Account Details</span>
                  <div className="user-show-info">
                     
                     <span className="user-show-infokey"> Id:  {user?._id}</span>
                     
                  </div>
                  <div className="user-show-info">
                     <PermIdentity className="user-show-icon"/>
                     <span className="user-show-username">{user?.username}</span>
                     
                  </div>
               </div>
           
                  <div className="user-show-info">
                    <MailOutline className="user-show-icon"/>
                    <span className="user-show-infotitle">{user?.email}</span>
                  </div>

                  <div className="user-show-info">
                    <LockOutlined className="user-show-icon"/>
                    <span className="user-show-infotitle">{user?.password}</span>
                  </div>
                  
                  
               </div>
            </div>


         <div className="user-update">
                <span className="user-update-title">Edit</span>
               <form className="user-update-form">
                   <div className="user-update-left">
                    <div className="user-update-item">
                     <label>Username</label>
                     <input type="text" 
                            placeholder={user?.username}
                            value={updatedUser?.username}
                            onChange={(e) =>
                              setUpdateUser({
                                 ...updatedUser, 
                                 username: e.target.value
                              }) 
                            } 
                            className="userupdate-input"/>
                    </div>
                    
                    <div className="user-update-item">
                     <label>Email</label>
                     <input type="text" 
                            placeholder={user?.email}
                            value={updatedUser?.email}
                            onChange={(e) =>
                             setUpdateUser({
                              ...updatedUser,
                              email: e.target.value
                             })} 
                            className="userupdate-input"/>
                    </div>

                    <div className="user-update-item">
                     <label>Password</label>
                     <input type="text" 
                           
                           placeholder={user?.password}
                           value={updatedUser?.password}
                            onChange={(e) =>
                             setUpdateUser({
                              ...updatedUser,
                              password: e.target.value
                             })} 
                            className="userupdate-input"/>
                    </div> 
                   </div> 

                   <div className="user-update-right">
                      <div className="user-update-upload">
                      <img src="https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2" 
                      alt="" 
                      className="user-upload-img"/>
                      <label htmlFor="file"><Publish 
                      className="publish-icon" style={{cursor: "pointer"}}/></label>
                      <input type="file" id="file" style={{display: "none"}} />
                      </div>  
                   </div>
                </form>
                <button className="user-update-btn"
                     onClick={handleUpdate}>
                           Update
                </button>
            </div>
         </div>
      </div>
    );
}
 
export default User;