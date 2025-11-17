import "./widgetleft.css";
import { Visibility } from "@material-ui/icons";
import {useState, useEffect} from "react"
import {userRequest} from "../../axiosMethod"


const WidgetLeft = () => {

   const [users, setUsers] = useState([]);
  
   useEffect(() => {
      const getUsers = async () => {
       try {
         const res = await userRequest.get("users/?new=true");
         setUsers(res.data);
         console.log(res.data)
       } catch  {}
      };
      
      getUsers()
   },[])

   return ( 
      <div className="widget-left">
        <span className="widget-left-title">New Join Members</span>
         <ul className="widget-left-list">
           {users.map((user) => (
            <li className="widget-left-item" key={user._id}>
               <img src={user.img || "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif" }
                    className="widget-left-img"/>
               <div className="widget-left-user">
                  <span className="widget-left-username">{user?.username}</span>
                  <span className="widget-left-dev">{user?.email}</span>
               </div>
               <button className="widget-left-btn">
                  <Visibility />
                  Display
               </button>
            </li>
            ))}
         </ul>
      </div>
    );
}
 
export default WidgetLeft;