import { useState , useEffect} from "react";
import { Link, useParams } from "react-router-dom";
import { publicRequest,userRequest } from "../../axiosMethod";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { formatedDate, formatTimeAgo } from "../../helpers/formatDate";

const UserOrderDetail = () => {

 const {orderId} = useParams();
  console.log("Order ID:", orderId)

  const [orderDetail, setOrderDetail] = useState(null);

  console.log("Order ID:", orderId)

  useEffect(() => {
     if(!orderId) return;
     fetchOrderDetail(orderId)
  },[orderId])
 
   
    const fetchOrderDetail = async (id) => {
      try {
        const res = await userRequest.get(`orders/order/${id}`);
        setOrderDetail(res.data);
        console.log("UserOrderdetail:", res.data)
      } catch (err) {
        console.error("Error fetching order:", err);
      }  
      
    }
 
  return ( 
     <Container>
      <Wrapper>
        <OrderDetailTitle>
          Order Detail
        </OrderDetailTitle>
        <OrderShow>
          <OrderWrapper>
             <OrderShowTitle>
              DATE & TIME ORDER:
             </OrderShowTitle>
              <Order> 
                {formatedDate(orderDetail?.deliveredAt) }
              </Order> 
          </OrderWrapper>

          <OrderWrapper>
           <OrderShowTitle>
             ORDER RECIPIENT:
           </OrderShowTitle>
           <Order> 
                {orderDetail?.email }
           </Order> 
           </OrderWrapper>

           <OrderWrapper>
           <OrderShowTitle>
             DELIVERY ADDRESS:
           </OrderShowTitle>
           <OrderAddress>
           <Order> 
              {orderDetail?.shippingInfo.state.toUpperCase()}
           </Order>
           <Order> 
              {orderDetail?.shippingInfo.city}
            </Order>
            <Order> 
              {orderDetail?.shippingInfo.address}
            </Order>
            </OrderAddress>
           </OrderWrapper>

           
            <OrderProductTitle>
               Ordered Products
            </OrderProductTitle>

            <OrderWrapper>
               <OrderShowProducts>
                {orderDetail?.products?.map((product, index) => (
                  <Products key={index}>
                 <ProductDetail>
                 <ImgProduct src={product.img} alt=""/>
                   
                 </ProductDetail>
                 <ProductDetail>
                     {product.amount}
                 </ProductDetail>
                 <ProductDetail>
                     {product.price.toFixed(2)}
                 </ProductDetail>
                 </Products>
                 ))}
               </OrderShowProducts>
            </OrderWrapper>
          

           <OrderPayment>
             <TitlePayment>
               TOTAL FOR PAYMENT
             </TitlePayment>
             <TotalPayment>
               ${orderDetail?.total.toFixed(2)}
             </TotalPayment>
           </OrderPayment>
        </OrderShow>

      </Wrapper>
     </Container>
    );
}
 
export default UserOrderDetail;

const Container = styled.div`
  padding: 60px 0;
`;
const Wrapper = styled.div`
  justify-content: center;
  align-items: center;
  max-width: 900px;
  margin: 0 auto;
  color: #525454;
`;
const OrderDetailTitle = styled.h1`
  padding: 60px 0;
  font-size: 25px;
  font-weight: 500;
  text-align: center;
  margin: auto;
  letter-spacing: 1px;
`;
const OrderProductTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  margin-top: 30px;
  text-align: center;
  letter-spacing: 1px;
`;
const OrderShow = styled.div`
  min-height: 80vh;
  background-color: #ffff;
`
const OrderWrapper = styled.div`
max-width: 1000px;
  display: flex;
  justify-content: space-between;
  text-align: left;
  align-items: center;
`;
const OrderAddress = styled.div`
  display: flex;
  flex-direction: column;
`;
const Order = styled.h3`
  text-align: left;
  margin: 2px;
  font-size: 18px;
  font-weight: 600;
`;
const OrderShowProducts = styled.div`
  flex-direction: column;

   width: 100%;
   display: flex;
   justify-content: space-between;
`;
const Products = styled.div`
   display: flex;
   align-items: center;
   font-size: 19px;
   width: 100%;
   justify-content: space-evenly;
 
`;
const ImgProduct = styled.img`
  width: 40px;
  height: 40px;
`;
const ProductDetail = styled.h4`
  
`;
const OrderShowTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  text-align: right;
  color: #525454;
`;
const OrderPayment = styled.div`
  display: flex;
  justify-content: space-around;
  padding-top: 70px;
`;
const TitlePayment = styled.h1`
  font-size: 22px;
  font-weight: 600;
`;
const TotalPayment = styled.h1`
   font-size: 22px;
   font-weight: 600;
   margin-right: 40px;
`;
