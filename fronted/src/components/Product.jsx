import styled from "styled-components";
import { mobile, medium } from "../responsive";
import { Link } from "react-router-dom";
import { forwardRef } from "react";


const Product = forwardRef(({item}, ref) => {
  

  return ( 
   
    <Container ref={ref}>
      {item.discounts===0 
        ? ("") 
        : 
          (<div className="discount-product">
              {`- ${item.discounts}% Discount`}
          </div>
      )}
      {item.newProd &&
      <div className="new-product">
         NEW
      </div> }
      {!item.inStock && <div className="out-stock-product">Out of Stock</div>}
    
      <Wrapper>
      
      <Image src={item.img} alt={item.title}/>
      <TitleProduct>{item.title}</TitleProduct> 
      
    { 
       item.discounts
         ? (<><OriginalPrice>$ {item.originalPrice.toFixed(2)}
              </ OriginalPrice><DiscPrice>$ {item.discountedPrice.toFixed(2)}</DiscPrice></>) 
         : ( <Price>$ {item.price.toFixed(2)}</Price>  ) 
     } 
    
     
      </Wrapper>
       <Link to={`/product/${item._id}`} style={{textDecoration: "none"}}>
        <Button>
        {!item.inStock && <StockButton></StockButton>}
          VIEW PRODUCT
        </Button>
      </Link>
    </Container> 
   );
})
 
export default Product;

const Container = styled.article`
   position: relative;
   display: flex;
   text-align: center;
   justify-content: space-between;
   flex-direction: column;
   margin-bottom: 60px;
   flex: 0 0 22%;
   
   ${mobile(
    {
      width: "100%",
      margin: "0 auto",
      marginBottom: "10px",
     
    }
    )}
`;
const TitleProduct = styled.h2`
   font-size: 18px;
   color: gray;
   text-transform: uppercase;
   text-align: center;  
`;
const Price = styled.h3`
   font-size: 23px;
   font-weight: 600;
   margin-top: -10px;
   color: #363737;
`;
const OriginalPrice = styled.h3`
    margin-top: -13px;
    font-size: 21px;
    font-weight: 600;
    color: #2c2c2c;
    text-decoration-line: line-through;
    
`
const DiscPrice = styled.h3`
    color: #f13434;
    font-size: 21px;
    font-weight: 600;
    margin-top: -20px;
`
const Image = styled.img`
   object-fit: cover;
   width: 64%; 
   height: 64%;
   padding: 0px; 
`;
const Wrapper = styled.div`
   position: relative;
   box-shadow: 0px 0px 7px -2px rgba(0,0,0,0.95);
   -webkit-box-shadow: 0px 0px 7px -2px rgba(0,0,0,0.95);
   -moz-box-shadow: 0px 0px 7px -2px rgba(0,0,0,0.85);
   height: 280px;
   width: 90%;
   padding: 24px 0px;
   transition: 0.2s ease-in-out;
   background-color: #fefefefe;

   &:hover{
      transform: scale(1.01);
      box-shadow: 0px 0px 8px -4px rgba(0,0,0,0.75);
      -webkit-box-shadow: 0px 0px 15px 3px rgba(0,0,0,0.40);
      -moz-box-shadow: 0px 0px 8px -4px rgba(0,0,0,0.75);
   }

   ${mobile(
    {
     margin: "0 auto"
    }
    )}
  ${medium(
    {
 
    width: "100%",
    height: "245px",
    }
    )}
`;
const Button = styled.button`
   position: relative;
   padding: 7px 20px;
   margin-top: 10px;
   letter-spacing: 1px;
   cursor: pointer;
   font-size: 14px;
   font-weight: 600;
   border: none;
   color: #012030;
   background-color:#9AEBA3;
   border: 2px solid #45C4B0; 
   display: block;
   width: 90%;
   transition: 0.1s ease-in-out;

   &:hover {
      transform: scale(1.01); 
      background-color:  #45C4B0;
      border: 2px solid #13678A;; 
   }

   ${mobile(
    {
      width: "90%", 
      margin: "0 auto"
    }
    )}

${medium(
    {
      width: "100%", 
      margin: "0 auto",
      fontSize: "13px",
      marginTop: "10px"
    }
    )}
`;

const StockButton = styled.div`
  background-color: gray;
  opacity: 0.5;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  letter-spacing: 1px; 
`;