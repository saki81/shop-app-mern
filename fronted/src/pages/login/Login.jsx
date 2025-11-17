import { useNavigate } from "react-router-dom";
import { useState } from "react"; 
import styled from "styled-components";
import Navbar from "../../components/Navbar";
import { mobile } from "../../responsive";
import {useSelector, useDispatch } from "react-redux";
import { login } from "../../redux/apiCalls";
import useToaster from "../../hooks/useToaster";



const Login = () => {
 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const toaster = useToaster();

  const  {isFetching}  = useSelector((state) => state.auth);

const loginHandleSubmit = async (e) => {
  e.preventDefault();

  if(isFetching)  return;
  
   
    const result = await login(dispatch, { 
        email, 
        password 
      });

    if (result.success) {

   
      toaster.showSuccess("User is login", 3000);
      navigate("/");
    }
    if (result.error) {
      toaster.showError(result.error);
    }
   
}

  return ( 
    <>
  
    <Navbar/>
      <section className="auth-container">
         <Wrapper>
            <Title>Sign in</Title>
            <form className="form-auth" onSubmit={loginHandleSubmit}>
              <Input 
                onChange={(e)=>setEmail(e.target.value)}
                placeholder="Email"
                type="email"/>
              <Input
                onChange={(e)=>setPassword(e.target.value)}  
                placeholder="Password"
                name="password" 
                type="password"/>
              
              <button className="auth-btn"
              type="submit" 
              disabled={isFetching}>
                Login
              </button>
              <Link>Do not you remember password?</Link>
              <Link>Create new account</Link>
            </form>
          </Wrapper>
      </section>
      </>
   );
}
 
export default Login;


const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 60vh; 
  
  ${mobile(
    {
      width: "97%", 
      margin: "auto"  
    }
    )}
`;
const Title = styled.h1`
  font-size: 35px;
  color:#525454;

  ${mobile(
    {
      marginTop: "-40px", 
    }
    )}
`;

const Input = styled.input`
  padding: 8px 4px;
  margin-bottom: 25px;
`;

const Link = styled.li`
   cursor: pointer;
   list-style: none;
   color: #ffff;
   text-decoration: underline;
   transition: 0.2s ease-in-out;

   &:hover {
      color: #9AEBA3;
      transform: scale(1.01); 
   }
   
`;

const Error = styled.div`
   background-color: #ee6565;
   color: #fff;
   letter-spacing: 1px;
   text-align: center;
   font-weight: 600;
   font-size: 17px;
`;