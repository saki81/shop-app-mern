import styled from "styled-components";
import {mobile, medium } from "../responsive";
import Product from "./Product";
import useFetch from "../hooks/useFetch";


const SimilarProducts = ({productId}) => {
  const {products} = useFetch({ similar: productId })
  return ( 
    <Container>
      <Title>Similar Products</Title>
      <Wrapper>
        {products && products.map((product) => (
            <Product item={product} key={product._id}/>
        ))}
      </Wrapper>
     </Container>   );
}
 
export default SimilarProducts;

const Container = styled.section`
   padding:  0 50px;
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
