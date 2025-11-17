import { useState, useEffect } from "react";
import "./widgetright.css";
import { userRequest } from "../../axiosMethod";
import { format } from "timeago.js"

const WidgetRight = () => {

   const [orders, setOrders] = useState([])

   useEffect(() => {

      const getOrders = async () => {
         try {
              const res = await userRequest.get("orders/?new=true");
              setOrders(res.data);
              console.log(res.data)
           } catch (err) {
            
         }  
      }
      getOrders();
   },[])

   return ( 
  
      <div className="widget-right">
         <h3 className="widget-right-title">Latest Transaction</h3>
         
         <table className="widget-right-table">
            <thead>
              <tr className="widget-right-tr">
               <th className="widget-right-th">Name</th>
               <th className="widget-right-th">Email</th>
               <th className="widget-right-th">Date</th>
               <th className="widget-right-th">Total</th>
               <th className="widget-right-th">Status</th>
              </tr>
            </thead>
            <tbody>   
            { orders.map((order) => (
              <tr className="widget-right-tr" key={order._id}>
             
               <td className="widget-right-td">
                    <span className="widget-right-name">{order?.username}</span>
               </td>
               <td className="widget-right-td">
                    <span className="widget-right-email">{order?.email}</span>
               </td>
               <td className="widget-right-date">{format(order.createdAt)}</td>
               <td className="widget-right-amount">{order.total}</td>
               <td className="widget-right-status">
                  <span className={order.status === "Processing" ? "status-processing" : "status-delivered"}
                   style={{
                      fontSize: "14px",
                     padding: "3px 5px"
                      }}>
                     {order.status}
                  </span> 
               </td>
            </tr>
         ))} 
           
            </tbody> 
         </table>  
       </div>
      
    );
}
 
export default WidgetRight;