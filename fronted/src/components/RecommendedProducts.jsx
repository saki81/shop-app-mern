import styled from "styled-components";
import { useSelector } from "react-redux";
import { mobile, medium } from "../responsive";
import Product from "./Product";
import useFetch from "../hooks/useFetch";

const RecommendedProducts = () => {

  const currentUser = useSelector((state) => state.auth.currentUser);

  const { products } = useFetch(
    currentUser
       ? { recommended: true, userIdRecoman: currentUser?._id }
       : { recommended: true }
  );
  console.log("Products recomended",products)
  return ( 
      <Container>
         <Title>Recommended Products</Title>
         <Wrapper>
           {products && products.map((product) => (
             <Product item={product} key={product._id}/>
           ))
         }
         </Wrapper>
      </Container>
   );
}
 
export default RecommendedProducts;

const Container = styled.section`
   padding: 0 50px;
`;
const Wrapper = styled.div`
   display: flex;
   justify-content: space-around;
   align-items: center;
   max-width: 1280px;
   margin: auto;
   flex-wrap: wrap;
   padding-bottom: 20px;
   align-items: center;
  

   ${mobile(
    {
      width: "97%",
      margin: "auto" 
    }
    )}
    ${medium(
    {
      width: "92%"
    }
    )}
`;
const Title = styled.h1`
   text-align: center;
   margin-bottom: 30px;
   font-size: 30px;
   letter-spacing: 1px;
   color: #525454;
`
