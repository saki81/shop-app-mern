import styled from "styled-components";
import { mobile } from "../../responsive";
import { useState } from "react";
import Navbar from "../../components/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate} from "react-router-dom";
import { register} from "../../redux/apiCalls";
import { reset } from "../../redux/authSlice";
import useToaster from "../../hooks/useToaster";


const Register = () => {
  
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfPassword] = useState("");


  
  const toaster = useToaster();
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { isFetching } = useSelector((state)=> state.auth)


  const registerHandleSubmit = async (e) => {
    
    e.preventDefault();

    if(isFetching) return;
    
    dispatch(reset());
   
      const result = await register(dispatch, {
          username,
          email,
          password,
          confirmPassword
        })
          
      if (result.success){     
       toaster.showSuccess("User is register", 3000);
       navigate("/")
      }  
      if (result.error) {
       toaster.showError(result.error, 3000)
      }
  }


  return ( 
    <>
      <Navbar/>
       <section className="auth-container">
          <Wrapper>
            <Title>Register</Title>
            <form className="form-auth"
            onSubmit={registerHandleSubmit }>
              <Input onChange={(e)=>setUsername(e.target.value)}
                     placeholder="Username"
                     name="username" 
                     type="text"/>
              <Input onChange={(e)=>setEmail(e.target.value)}
                     placeholder="Email"
                     name="email"
                     type="email"/>
              <Input onChange={(e)=>setPassword(e.target.value)}
                     placeholder="Password"
                     name="password"
                     type="password"/>
              <Input onChange={(e)=>setConfPassword(e.target.value)}
                     placeholder="Confirm password" 
                     name="confirmPassword"
                     type="password"/>
              <button 
                  className="auth-btn"
                  type="submit"
                  disabled={isFetching}
                  >Create Account
              </button>
            </form>
          </Wrapper>
       </section>
     </>
    );
}
 
export default Register;


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
  opacity: 1;
`;


