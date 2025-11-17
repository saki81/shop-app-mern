import styled from "styled-components";
import { Link } from "react-router-dom";
import check from "../../image/check-green.gif"

const Success = () => {

  return ( 
  <Wrapper>
      <Check>
        <img src={check} alt="" width={90} height={90} />
      </Check>
      <Title>Thanks to Order</Title>
      <Link to="/">
        <BtnBack>
          Back to Home
        </BtnBack>
      </Link>
  </Wrapper> 
  );
}
 
export default Success;

const Wrapper = styled.main`
  height: 100vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Check = styled.div`
 
`
const Title = styled.h1`
  font-size: 35px;
  color:#525454;
  
`;
const BtnBack = styled.button`
  padding: 7px 10px;
  letter-spacing: 1px;
  font-size: 14px;
  border: none;
  background-color:#9AEBA3;
  border: 1px solid #45C4B0;
  cursor: pointer;
`;