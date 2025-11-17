import styled from "styled-components";
import { categories } from "../data";
import CategoryItem from "./CategoryItem";
import { mobile,medium } from "../responsive";


const Categories = () => {
  return (
    <Container>
    <Title>Categories</Title>
     <Wrapper>
      {categories.map((item) => (
        <CategoryItem item={item}  key={item.id}/>
       
      ))}
      </Wrapper>
     
    </Container>
   
   );
}
 
export default Categories;

const Container = styled.section`
   padding: 20px 0 70px;
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
      width: "95%",
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
`;
