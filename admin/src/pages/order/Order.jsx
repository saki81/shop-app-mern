import "./order.css"
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrder, updatedOrderStatus } from "../../redux/apiCalls";
import { Link, useLocation } from "react-router-dom";
import {formatTimeAgo, formatedDate} from "../../helpers/formatDate";


const Order = () => {

  const location = useLocation();
  const orderId = location.pathname.split("/")[2]

 

  const dispatch = useDispatch();

 const order = useSelector((state) => state.order.orders.find((order) => order._id === orderId));

  const [status, setStatus] = useState(order.status)

  useEffect(()=> {
   
    dispatch(getOrder(orderId))
  
    
  },[dispatch, orderId])

  useEffect(() => {
   if (order) {
     setStatus(order.status)
   }
  },[order])

  const handleStatusChange = (newStatus) => {
     updatedOrderStatus(dispatch ,orderId, newStatus);
  
     setStatus(newStatus)
  }

  

  return ( 
     <div className="order">
      <div className="order-container">
        <div className="order-show">
          <div className="order-show-top">
            <span className="order-show-infokey">
            {/* Id: {order?._id} */}
            </span>
            <div className="order-show-username">{order?.username}</div>
            <div className="order-show-email">{order?.email}</div>
            <div className="format-date">
               {formatedDate(order?.createdAt)}
            </div>
           
            <div className="order-show-products">
              {order?.products?.map((product, index)=> (
                
                 
                <div key={index} className="products" >
                  <div className="product-name">
                    <h4>{product.title}</h4>
                    {product?.discounts ? (<div className="order-discount">{`-${product?.discounts}%`}</div>) :(null)}
                    <img className="product-img" src={product.img} alt="" />
                  </div>
                  <div className="product-wrapper">
                    <span className="size">Size: {product.size}</span>
                    <span className="color">Color: {product.color}</span>
                    
                   {product.category.map((cat,index)=> (
                   
                    <span key={index} className="category" > {cat}
                     </span>
                  
                   ))}
                  </div>
                  <div className="amount">
                    <span className="quantity">
                      Qty: {product.amount }  
                    </span>
                    <span className="multiple">X</span>
                    <div className="price-wrapper">
                      {product.discountedPrice ? 
                        (
                          
                          <span className="disc-price">
                             D.Price: {product.discountedPrice.toFixed(2)}$
                          </span> 
                          ) : 
                      ("") }
                      {product.discountedPrice ? (
                        <span className="origin-price">
                       O.Price: {product.price.toFixed(2)}$ 
                       </span>
                      ) : (<span className="price">
                        Price: {product.price.toFixed(2)}$ 
                       </span>)}
                      
                      </div>
                      {product.discountedPrice ? (
                       <span className="product-total">
                        Total: {(product.discountedPrice * product.amount).toFixed(2)} 
                       </span>) : (<span className="product-total">
                        Total: {(product.price * product.amount).toFixed(2)} 
                       </span>)}
                  </div>
                </div> 
              ))}
              
            </div>
          </div>
             <div className="order-total">
              <h2>Total: {order?.total?.toFixed(2)}$</h2>
             </div>
        </div>
            
      </div>
      <div className="order-shipping">
               <h2>Shipping Info</h2>
               <div className="info-wrapper">
                <h3>State: -------- {order?.shippingInfo?.state}</h3>
                <h3>City: --------- {order?.shippingInfo?.city}</h3>
                <h3>Address: --- {order?.shippingInfo?.address}</h3>  
               </div>

           <div className="order-status">
                <h2>Order Status:</h2>
            
              <button className={status === "Processing" ? "status-processing" : "status-delivered"}>
                {status}
              </button> 
              <div className="delivery-date">
                 { order?.deliveredAt ? formatedDate(order.deliveredAt) : <p>Delivered is not yet</p>}
              </div>
              
              
          </div>
          <select
            className="status-change" 
            value={status}
            onChange={(e)=> handleStatusChange(e.target.value)}>
            <option value="Processing">Processing</option>
            <option value="Delivered">Delivered</option>
          </select>
        
      </div>
     </div> 
     );
}
 
export default Order;