import styled from "styled-components";
import {SlBasket} from "react-icons/sl";
import SearchBar from "./SearchBar";
import { mobile, medium } from "../responsive";
import { Link} from "react-router-dom";
import { useSelector } from "react-redux";
import UserMenu from "./UserMenu";



const Navbar = () => {
  const  amount  = useSelector((state) => state.cart.amount);
 
  return ( 
    <Container>
      <Nav>
       <Wrapper>
        <Left>
         <Link to="/" style={{textDecoration: "none"}}>
          <Logo>SHOP</Logo>
         </Link>
        </Left>
        <Center>
             <SearchBar />   
        </Center>
        
        <Right>

        <UserMenu />
      
           <Link to="/cart">
           <Badget>
             <SlBasket  style={{fontSize: "30px", color: "#9AEBA3"}}/>
           </Badget>
           </Link> 
           <NumProducts>
            <SpanNum>{amount }</SpanNum>
           </NumProducts>
        </Right>
       </Wrapper>
      </Nav>
    </Container>
   );
}
 
export default Navbar;

const Container = styled.div`
  background-color: #2f9d8d;
  width: 100%;
  position: fixed;
  z-index: 10;
  margin: 0;
  box-shadow: 0px 0px 14px -3px rgba(0,0,0,0.56);
  -webkit-box-bottom-shadow: 0px 0px 14px -3px rgba(0,0,0,0.56);
  -moz-box-shadow: 0px 0px 15px -3px rgba(0,0,0,0.56);

  ${mobile({height: "48px"})}
`;
const Nav = styled.nav `
  max-width: 1270px;
  margin: 0 auto;
  position: sticky;

  ${mobile(
    {
      width: "97%"  
    }
  )};
  ${medium(
    {
      width: "95%"  
    }
  )};
   
  
  
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
`;
const Left = styled.div`
  flex: 1;

`;
const Logo = styled.h2 `
  color: #9AEBA3;
  font-size: 20px;
  letter-spacing: 1px;

  ${mobile({
      fontSize: "14px",
      marginLeft: "0px"
    }
    )}
`;
const Center = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`
const Right = styled.div`
  flex: 1;
  display: flex;
  justify-content: end;
  align-items: center;
  position: relative;

  ${mobile(
        {
         
          display: "flex",
         justifyContent: "start",
          marginLeft: "-10px"
        }
        )}
  
`;
const Badget = styled.div `
  margin-left: 10px;
  cursor: pointer;
  z-index: 1;
 
  ${mobile(
        {
          fontSize: "11px",
          
          marginRight: "12px", 
        }
        )}
`;
const NumProducts = styled.div`
  width: 20px;
  height: 20px;
  background-color: #45C4B0;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  position: absolute;
  top: 0;
  right: -15px;

  ${mobile(
    {
    right: "15px",
    width: "17px",
    height: "17px",
    }
    )}
`;
const SpanNum = styled.span`
  font-size: 13px;
  font-weight: bold;
  text-align: center;
  margin: 0 1px 2px 1px; 
`;