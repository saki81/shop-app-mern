import styled from "styled-components";
import { Link} from "react-router-dom";
import { MdAdd,  MdRemove } from "react-icons/md";
import { useEffect } from "react";
import { mobile, medium } from "../../responsive";
import { useSelector, useDispatch } from "react-redux";
import { clearCart, incrementAmount, decrementAmount, removeItem } from "../../redux/cartRedux";
import   useToaster from "../../hooks/useToaster";
import { forceCartRefresh, loadCartFromStorage, resetCart } from "../../redux/cartRedux";
import { userRequest } from "../../axiosMethod";




const Cart = () => {

  const cart = useSelector((state) => state.cart);
  const { currentUser} = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const toaster = useToaster();

/*  useEffect(() => {
    if (!currentUser ||!currentUser.accessToken) {
      return;
    }
    const getCart = async () => {
      try {
        const res = await userRequest.get(`cart/${currentUser._id}`);
         console.log("🛒 Cart data:", res.data);
      } catch (err) {
         console.error("❌ Error fetching cart", err);
      }
    };

   const timer = setTimeout(getCart, 400)
   return () => clearTimeout(timer)
  },[currentUser]) */
  
  const cartSubmit = () => {
     if(currentUser._id && cart?.products?.length === 0) {
      toaster.showInfo("PUT THE PRODUCT IN CART", 2000)
      return
      
     }
  }


  const handleAllClear = () => {
      
      dispatch(clearCart());
    
  };

      const getTotalPrice = () => {
        return cart.products.reduce((acc, product) => {
          const productPrice = product?.discountedPrice > 0 ? product.discountedPrice : product.price;
          return acc + (product.amount * (productPrice || 0)); 
        }, 0);
      };
 
  return ( 
      <Container>
           <Wrapper>
             <Title>Your Bag</Title>
             <Link to="/allproducts">
                  <GoToProducts>
                    BACK TO PRODUCTS
                  </GoToProducts>
                </Link>
             <Top>
              <TopText>
                 Shopping Bag {cart?.products?.length} 
              </TopText>
             </Top>
             <Bottom>
              <Info>
                
               { cart?.products?.length === 0
               ? ( <CartEmpty>CART IS EMPTY</CartEmpty>)
               : ( cart?.products?.map((product) => (
                
                 <Product key={`${product.id} ${product.size}`}> 
                   <ProductDetail >
                    <Image src={product.img} />
                     <Details>
                      <ProductName>{product.title} </ProductName>
                      <ProductColor color={product.color}/>
                      <ProductSize ><b>Size:</b> {product?.size}</ProductSize>
                      {product.categories?.map((cat, index) => (
                      <ProductCat cat={cat} key={index}>
                         {cat.toUpperCase()}
                      </ProductCat>
                      ))}
                    </Details>
                  <RemoveProduct onClick={()=> dispatch(removeItem({id: product.id, size: product.size}))}>
                        X
                    </RemoveProduct>
                    <PriceDetail>
                      <ProductAmountWrapper>
                        <MdRemove 
                               size={28} 
                               style={{cursor: "pointer", color: "#525454"}}
                               onClick={() => dispatch(decrementAmount({id: product.id, size: product.size, price: product.price, discountedPrice: product.discountedPrice}))}/>
                         <ProductAmount>{product.amount}</ProductAmount>
                        <MdAdd 
                               size={28} 
                               style={{cursor: "pointer", color: "#525454"}}
                               onClick={() => dispatch(incrementAmount({id: product.id, size: product.size, price: product.price, discountedPrice: product.discountedPrice }))}/>     
                      </ProductAmountWrapper>
                      <PriceWrapper>
                    
                    {product.discounts > 0 ? ( 
                     <>
                      <h2 className="original-price">${(product.originalPrice).toFixed(2)}</h2> <h2 className="discounted-price">${(product.amount * product.discountedPrice).toFixed(2)}</h2>
                      </>) 
                      :
                      ( <ProductPrice >
                      ${(product.amount * product.price).toFixed(2)}
                        </ProductPrice>) }
                     </PriceWrapper> 
                    </PriceDetail>
                  </ProductDetail>
                 </Product>  
                )))}
                
               {cart.products.length===0 ? "" 
                  : <AllRemove onClick={handleAllClear}>
                      ALL REMOVE
                    </AllRemove>}    
              </Info>
                
              <>
               <Summary>
                 <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                 <SummaryItem>
                   <SummaryText>Subtotal</SummaryText>
                   <SummaryPrice> $ {getTotalPrice().toFixed(2)}</SummaryPrice>
                 </SummaryItem>
                 <SummaryItem>
                   <SummaryText>Estimated Shipping</SummaryText>
                   <SummaryPrice> $ 5.00</SummaryPrice>
                 </SummaryItem>
                 <SummaryItem>
                   <SummaryText>Shipping Discount</SummaryText>
                   <SummaryPrice> $ -5.00</SummaryPrice>
                 </SummaryItem>
                 <SummaryItem style={{marginTop: "30px"}}>
                   <SummaryText type="total">Total</SummaryText>
                <SummaryPrice type="total"> $ {getTotalPrice().toFixed(2)}</SummaryPrice>
                 </SummaryItem>
             
              { currentUser && cart.products.length 
                 ? <Link to="/checkout">
                     <button
                       className="checkout-btn"  
                       style={{background: "#13678A"}}>
                       CHECKOUT NOW
                     </button>
                   </Link> 
                 : <Link to= {!currentUser ? "/login" : "/cart"}>
                      <button 
                        className="checkout-btn"
                        onClick={cartSubmit}>
                         LOG IN AND PUT THE PRODUCT FOR PAYMENT
                      </button> 
                     </Link>   
                 } 
               </Summary>
               </> 
             </Bottom>      
           </Wrapper>
      </Container>
   );
}
 
export default Cart;

const Container = styled.section`
   ${mobile(
    {
      width: "97%",
      margin: "0 auto",
    }
   )}
`;
const Wrapper = styled.div`
   max-width: 1280px;
   margin: 0 auto;
   min-height: 80vh;
   padding: 10px 0;
   flex-wrap: wrap;
   padding: 50px 0;
   ${mobile(
    {
      width: "97%",
      margin: "0 auto",
    }
    )}
     ${medium(
    {
      width: "92%", 
      
    }
     )}
   
    
`;
const GoToProducts = styled.button`
   padding: 7px 20px;
   letter-spacing: 1px;
   font-weight: 600;
   cursor: pointer;
   font-size: 14px;
   border: none;
   color: #012030;
   background-color:#9AEBA3;
   border: 2px solid #45C4B0;

   &:hover {
      transform: scale(1.03); 
      background-color:  #45C4B0;
      border: 2px solid #13678A;
      color: #012030; 
   }

   ${mobile(
    {
      fontSize: '13px',
      padding: "6px 12px",
      marginBottom: "10px",
    }
    )} 
   
`
const Title = styled.h1`
   text-align: center;
   font-size: 35px;
   color:#525454;

   ${mobile(
    {
      fontSize: '25px',
      padding: "6px 13px",
      marginBottom: "10px",
    }
    )} 
   
`;
const Top = styled.div`
   text-align: center;
   margin-top: 0;
`;
const TopText = styled.span`
   text-decoration: underline;
   color:#525454;
   font-size: 20px;
`;
const Bottom = styled.div`
   display: flex;
   justify-content: space-between;
   flex-wrap: wrap;

   ${mobile(
    {
      flexDirection: "column"
    }
    )}   
`;
const Info = styled.div`
   flex: 4;
   color: #252424;    
`;
const Summary = styled.div`
   flex: 1;

   ${medium(
    {
      flex: 2
      
    }
   )}

`;
const Product = styled.div`

${mobile(
    {
     
      width: "98%",
    }
    )}
`;
const ProductDetail = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 30px 0;
  padding: 20px;
  box-shadow: 0px 0px 13px -3px rgba(0,0,0,0.56);
  -webkit-box-shadow: 0px 0px 13px -3px rgba(0,0,0,0.56);
  -moz-box-shadow: 0px 0px 13px -3px rgba(0,0,0,0.56);
  width: 90%;
  position: relative;

 
  
`;
const Image = styled.img`
  width: 100px;
  height: 80px;
  object-fit: cover;

  ${mobile(
    {
      width: "50px",
      height: "50px"
    }
    )}
`;
const PriceDetail = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 20px; 


  ${mobile(
    {
      marginBottom: "0px", 
    }
    )}
`;
const PriceWrapper = styled.div`
   display: flex;
   align-items: center;
   justify-content: center;
   flex-direction: column;
`
const Details = styled.div`
   width: 100%;
   margin-left: 40px;

   ${mobile(
    {
      marginLeft: "0",  
    }
    )}
  `;
const ProductName = styled.span`
   font-size: 25px;

   ${mobile(
    {
      fontSize: "20px"
    }
    )}
     ${medium(
    {
      fontSize: "20px"
    }
    )}
`;

const ProductColor = styled.div`
   width: 20px;
   height: 20px;
   background-color: ${props=> props.color};
   margin: 5px 0;
`;
const ProductSize = styled.span`
   font-size: 20px;
`;
const ProductCat = styled.span`
   margin-left: 15px;
   
`;
const ProductAmountWrapper = styled.div`
   margin-bottom: -15px;
   display: flex;
   justify-content: center;
   align-items: center;

   ${mobile(
    {
      marginTop: "-20px",
    }
    )}
`;
const ProductAmount = styled.span`
   font-size: 25px; 
   font-weight: 500;
   margin: 0 10px;
   
   text-align: center;

   ${mobile(
    {
      fontSize: "22px",
    }
    )}


   ${medium(
    {
      fontSize: "20px"
    }
    )}
`;
const ProductPrice = styled.h2`
   font-size: 21px;  
   font-weight: 600; 
   margin-left: 10px;


   ${mobile(
    {
      fontSize: "20px",
      margin: "0 0 0 28px"
    }
    )}
     ${medium(
    {
      fontSize: "25px"
    }
    )}
`;
const SummaryTitle = styled.h1`
  font-size: 24px;
  color: #252424;
  margin-bottom: 30px;

  ${medium(
    {
      fontSize: "20px"
    }
    )}
`;
const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
 
`;
const SummaryText = styled.span`
  font-size: 19px;
  color: #252424;
  letter-spacing: 1px;
  font-weight: ${props=> props.type === "total" && "600"};
  font-size: ${props=> props.type === "total" && "28px"};

  ${medium(
    {
      fontSize: "17px"
    }
    )}
`;
const SummaryPrice = styled.span`
  font-size: 23px;
  margin-left: 10px;
  font-weight: ${props=> props.type === "total" && "600"};
  font-size: ${props=> props.type === "total" && "28px"};

  ${medium(
    {
      fontSize: "20px"
    }
    )}
`;
const AllRemove = styled.button`
  border: none;
  font-size: 16px;
  font-weight: 500;
  padding: 5px 12px;
  margin-right: 40px;
  letter-spacing: 1.5px;
  cursor: pointer;
  background-color: #ee6565;
  color: #fff;
  display: block;
  margin: 0 auto;

  ${mobile(
    {
      fontSize: '13px',
     
    }
    )} 
`;
const RemoveProduct = styled.button`
  position: absolute;
  top: 7px;
  right: 7px;
  border: none;
  font-size: 15px;
  font-weight: 500;
  padding: 1px 6px;
  cursor: pointer;
  background-color: #ee6565;
  color: #fff;

  ${mobile(
    {
      fontSize: '13px',
      
    }
    )} 
`;
const CartEmpty = styled.h2`
  font-size: 27px;
  text-align: center;
  color: #525454;
  letter-spacing: 1px;
  padding-top: 150px;
`;



