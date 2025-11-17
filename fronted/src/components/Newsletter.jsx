import styled from "styled-components";
import { mobile } from "../responsive";

const Newsletter = () => {
  return ( 
  <Container>
     <Title>Newslatter</Title>
     <Subtitle>Receive updates on your favorite products</Subtitle>
     <Input placeholder="Send email..."/>
     <Button>SEND</Button>
  </Container> 
  );
}
 
export default Newsletter;

const Container = styled.section`
  background-color: #d3e8d5;
  text-align: center;
  padding: 80px 0;
`;
const Title = styled.h1`
   font-size: 30px;
   letter-spacing: 1px;
   color: #525454;
   margin: 0;
`;
const Subtitle = styled.h3`
   font-size: 20px;
   letter-spacing: 1px;
   color: #525454;
`;
const Input = styled.input`
  width: 330px;
  padding: 12px 5px;
  outline: none;
  border: none;

  ${mobile(
    {
      width: "210px",  
    }
    )}
`;
const Button = styled.button`
  padding: 11px 20px 12px;
  border: none;
  font-weight: 600;
  font-size:15px;
  cursor: pointer;
  letter-spacing: 1px;
  background-color: #9AEBA3;
`