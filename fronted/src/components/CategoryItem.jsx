import styled from "styled-components";
import { mobile,medium } from "../responsive";
import { Link } from "react-router-dom";

const CategoryItem = ({item}) => {
  return ( 
      <Container>
       <Link to={`/products/${item.cat}/${encodeURIComponent(item.img)}`}>
         <Image src={item.img}/>
         <Info>
          <Title>
            {item.title}
          </Title>
          <Button>SHOP NOW</Button>
         </Info>
        </Link>
      </Container>
   );
}
 
export default CategoryItem;

const Container = styled.div`
   position: relative;
   border: 2px solid #45C4B0;
   height: 230px;
   margin-bottom: 30px;
   

   ${mobile(
    {
      marginBottom: "10px",
      width: "100%" 
    }
    )}
    ${medium(
    {
      width: "30%"
    }
    )}
`;
const Image = styled.img`
   width: 400px;
   height: 100%;
   object-fit: cover;
  background-position: center;


   ${mobile(
    {
      width: "100%",
      height: "100%",
  
    }
    )}
    ${medium(
    {
      width: "100%",
      height: "100%",  
    }
    )}
   
`;
const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  
`;
const Title = styled.h2`
   letter-spacing: 1px;
   margin-top: -15px;
   color: #9AEBA3;
   text-shadow: 1px 1px 1px gray;
`;
const Button = styled.button`
   padding: 7px 20px;
   letter-spacing: 1px;
   cursor: pointer;
   font-size: 14px;
   font-weight: 600;
   border: none;
   margin-top: -10px;
   color: #012030;
   background-color:#9AEBA3;
   border: 2px solid #45C4B0;
`;
