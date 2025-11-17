import styled from "styled-components";
import {useState} from "react";
import {  useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { publicRequest } from "../../axiosMethod";
import { saveShippingInfo,resetCart } from "../../redux/cartRedux";
import { v4 as uuidv4 } from 'uuid';

const Checkout = () => {

  const [shippingInfo, setShippingInfo] = useState({
      state: "",
      address: "",
      city: "",
  });

  const { total, products} = useSelector((state)=> state.cart);
  const {currentUser} = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeHandler = (e) => {
 
    const {name, value} = e.target
    
     setShippingInfo((prev) => ({
       ...prev, 
       [name]: value
      }));  
  }

  const submitHandler = async (e) => {
     e.preventDefault();

     if(!shippingInfo.state || !shippingInfo.address || !shippingInfo.city) {
         console.log("MOLIMO POPUNITE SVA POLJA")
         
         return;
     }
     console.log("Sadrzaj products iz store-a:", products);
     const dataToSend = {

       orderId: uuidv4(),
       userId: currentUser._id,
       username: currentUser.username,
       email: currentUser.email,
       
       products: products.map((product) => ({
        productId: product.productId,
        img: product.img,
        category: product.categories,
        size: product.size,
        color: product.color,
        quantity: product.quantity,
        title: product.title,
        price: product.price,
        discountedPrice: product.discountedPrice,
        discounts: product.discounts,
        amount: product.amount,
       })),
       
       total: total,
      
       shippingInfo: {
        state: shippingInfo.state,
        address: shippingInfo.address,
        city: shippingInfo.city
       },
       status: "Processing"
     }
    
     dispatch(saveShippingInfo(shippingInfo))
     try {
      const res = await publicRequest.post(`/orders`,dataToSend);
      setShippingInfo(res.data.shippingInfo)

      dispatch(resetCart());
      navigate("/success")

      console.log(res.data)
     } catch (err) {
      
     }
  }

  return ( 
      <>
        <Wrapper>
        <Title>Shipping Address</Title>
          <form
             onSubmit={submitHandler} 
             className="form-checkout"
             style={{backgroundColor: "#fff"}}>
           <Select
               onChange={changeHandler}
               name="state"
               value={shippingInfo.state}
               > 
              <Option
                value="choose country">Choose Country
              </Option>
               <Option value="bosnia">Bosnia</Option>   
            </Select> 
            <Input 
               onChange={changeHandler}
               placeholder="Address"
               name="address"
               value={shippingInfo.address}
               type="text"
               />
            <Input
               onChange={changeHandler}
               placeholder="City"
               name="city"
               value={shippingInfo.city}
               type="text"/>
            <button
               className="pay-btn"
               type="submit"
               style={{
                   width: "100%",
                   backgroundColor: "#13678A"
                   }}>
               
               SEND THE ORDER
            </button>
          </form>
        </Wrapper> 
      </> 
    );
}
 
export default Checkout;

const Wrapper= styled.main`
  height: 90vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Title = styled.h1`
  font-size: 35px;
  color:#525454;
  margin-top: -100px;

`;
const Select = styled.select`
  padding: 8px 10px;
  width: 100%;
  margin-bottom: 25px;
`;
const Option = styled.option`
  
`;
const Input = styled.input`
  padding: 8px 4px;
  margin-bottom: 25px;
`