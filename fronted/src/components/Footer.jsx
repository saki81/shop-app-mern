import styled from "styled-components";
import {AiOutlineInstagram,AiOutlineFacebook,AiOutlineTwitter} from "react-icons/ai";
import {FaMapMarkerAlt,FaPhone} from "react-icons/fa";
import {MdEmail} from "react-icons/md"
import { mobile, medium } from "../responsive";
import { Link } from "react-router-dom";


const Footer = () => {
  return ( 
    <Container>
      <Wrapper>
       <Box>
        <Left>
         <Logo>WEB SHOP</Logo>
         <Desc>
           Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut nostrum voluptatibus iure commodi quae. Eligendi deleniti maiores, asperiores, id laboriosam perspiciatis quas tenetur itaque non aliquam sint saepe optio, odio explicabo praesentium blanditiis.
         </Desc>
         <SocialIcons>
           <AiOutlineInstagram style={{marginRight:"10px"}}/>
           <AiOutlineFacebook style={{marginRight:"10px"}}/>
           <AiOutlineTwitter style={{marginRight:"10px"}}/>
         </SocialIcons>
        </Left>
        </Box>
        <Box>
        <Center>
         <Title>Show Links</Title>
          <List>
           <Link to="/" style={{textDecoration: "none"}}>
            <ListItem>Home</ListItem>
           </Link>

           <Link to="/cart" style={{textDecoration: "none"}}>
            <ListItem>Cart</ListItem>
           </Link>

           <ListItem>Man Fassion</ListItem>
           <ListItem>Woman Fassion</ListItem>
           
           <Link to="/register" style={{textDecoration: "none"}}>
            <ListItem>My Account</ListItem>
           </Link>

          </List>
         </Center>
        </Box>
        <Box>
         <Right>
           <TitleCon>Contact</TitleCon>
           <ContactItem>
             <FaMapMarkerAlt style={{color: "#9AEBA3", marginRight: "15px"}}/>
             Svetosavska 54b Teslic
           </ContactItem>
           <ContactItem>
             <FaPhone style={{color: "#9AEBA3", marginRight: "15px"}}/>
             + 387 65 063 678
           </ContactItem>
           <ContactItem>
             <MdEmail style={{color: "#9AEBA3", marginRight: "15px"}}/>
             cike198110@hotmail.com
           </ContactItem>
         </Right>
        </Box>
      </Wrapper>
    </Container>
   );
}
 
export default Footer;

const Container = styled.div`
   background-color: #2f9d8d;
   padding: 70px 0;
   margin-bottom: -23px
`;
const Box = styled.article`
  flex:  0 0 29%;
  
  
  ${mobile(
    {
      flex: "1",
      margin: "0 auto",
      
    }
    )}
`;
const Wrapper = styled.footer`
   display: flex;
   justify-content: space-between;
   max-width: 1280px;
   margin: 0 auto;
   
   ${mobile(
    {
      flexDirection: "column"  
    }
    )}
    ${medium(
    {
      width: "92%"
    }
    )}
`;
const Left = styled.div`
  letter-spacing: 1px;
 
  ${mobile(
    {
      width: "80%" ,
      margin: "0 auto" 
    }
    )}
`;
const Logo = styled.span`
   color: #9AEBA3;
   font-size: 20px;
   font-weight: 600;
`;
const Desc = styled.p`
   color: #fff;
   padding: 30px 0;
`;
const SocialIcons = styled.div`
   font-size: 30px;
   cursor: pointer;
   color: #9AEBA3;
   
`;
const Center = styled.div`
   text-align: center;

   ${mobile(
    {
      textAlign: "left",
      marginRight: "100px",
      padding: "30px 0"
    }
    )}
`;
const Title = styled.h2`
   color: #9AEBA3;
   margin-top: 0;
   text-align: center;
`;
const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  padding: 30px 0;
`;
const ListItem = styled.li`
  color: #fff;
  cursor: pointer;
  margin-bottom: 7px;
  font-size: 18px;
  
  
  
  &:hover{
    color: #45C4B0;
  }
`
const Right = styled.div`
   text-align: center;
   
`;
const TitleCon = styled.h2`
   color: #9AEBA3;
   margin-top: 0;
   text-align: start;
   padding-bottom: 30px;
`
const ContactItem = styled.div`
   display: flex;
   align-items: center;
   margin-bottom: 10px;
   font-size: 18px;
   color: #fff;   
`;