import { Outlet } from "react-router-dom";
import Topbar from "../components/topbar/Topbar";
import Sidebar from "../components/sidebar/Sidebar";

const Layout = () => {
  return ( 
    <>
      <Topbar/>
       <div className="container"> 
        <Sidebar/>
       <div className="other-pages">
        <Outlet/>
       </div>
      </div> 
    </> 
   );
}
 
export default Layout;