import { useState, useEffect } from "react";
import "./featuredinfo.css";
import { ArrowDownward, ArrowUpward,Group,ShoppingCartOutlined,AttachMoneyOutlined } from  '@material-ui/icons/';
import { userRequest } from "../../axiosMethod";


const FeaturedInfo = () => {

   const [userCount, setUserCount] = useState(0);
   const [userPercentChange, setUserPercentChange] = useState(0);

   const [orderCount, setOrderCount] = useState(0);
   const [orderPercentChange, setOrderPercentChange] = useState(0)

   const [totalRevenue, setTotalRevenue] = useState(0)
   const [totalPercentChange, setTotalPercentChange] = useState(0)

   useEffect(() => {
     
      const fetchDataUser = async () => {
         try {
            
            const userRes = await userRequest.get("users/count")
            
            const currentMonthCountUser = userRes.data.currentMonthCountUser;
            const previousMonthCountUser = userRes.data.previousMonthCountUser;

            setUserCount(userRes.data.userCount)
        
            setUserPercentChange(
               previousMonthCountUser ? ((currentMonthCountUser - previousMonthCountUser) / previousMonthCountUser) * 100 : 0
            );

         
            const orderRes = await userRequest.get("orders/summary")

            const currentOrderCount = orderRes.data.currentOrderCount;
            const previousOrderCount = orderRes.data.previousOrderCount;
            setOrderCount(orderRes.data.orderCount)
      
            setOrderPercentChange(
               previousOrderCount ? ((currentOrderCount - previousOrderCount) / previousOrderCount) * 100 : 0
            );

            const currentTotalRevenue = orderRes.data.currentTotalRevenue;
            const previousTotalRevenue = orderRes.data.previousTotalRevenue;
            setTotalRevenue(orderRes.data.totalRevenue)
            setTotalPercentChange(
               previousTotalRevenue ? ((currentTotalRevenue - previousTotalRevenue) / previousTotalRevenue) * 100 : 0
            )
           
         } catch (err) {
            console.log(err)
         }
         
      }
      fetchDataUser();
   },[])

   console.log("User count:", userCount);
   console.log("User percent change:", userPercentChange);
    
   return ( 
      <div className="featured">
         <div className="featured-item">
            <span className="fetured-title">Register User</span>
            <div className="featured-money-wrapper">
               <span className="featured-money"><Group/>{userCount}</span>
               <span className="money-rate"> 
                 {Math.floor(userPercentChange)} %{" "}
                 {userPercentChange < 0 ? (<ArrowDownward className="featured-icon negative"/>)
                              : (<ArrowUpward className="featured-icon positive"/>)} 
                  </span>
            </div>
               <span className="featured-sub">Compared to last month</span>
         </div>

         <div className="featured-item">
            <span className="fetured-title">Sales</span>
            <div className="featured-money-wrapper">
               <span className="featured-money"><ShoppingCartOutlined/>{orderCount}</span>
               <span className="money-rate">
                {Math.floor(orderPercentChange)}%{" "}
                  {orderPercentChange < 0 ? (<ArrowDownward  className="featured-icon negative"/>) 
                           : (<ArrowUpward className="featured-icon positive"/>)}
               </span>
            </div>
               <span className="featured-sub">Compared to last month</span>
         </div>

         <div className="featured-item">
            <span className="fetured-title">Cost</span>
            <div className="featured-money-wrapper">
               <span className="featured-money">
                  <AttachMoneyOutlined/>{totalRevenue.toFixed(2)}
               </span>
               <span className="money-rate">
                   {Math.floor(totalPercentChange)}%{""}
                   {totalPercentChange < 0 ? ( <ArrowDownward className="featured-icon negative"/>) : (<ArrowUpward className="featured-icon positive"/>)}
               </span>
            </div>
               <span className="featured-sub">Compared to last month</span>
         </div>
         </div>
      
    );
}
 
export default FeaturedInfo;