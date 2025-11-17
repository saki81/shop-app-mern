import { useState, useEffect } from "react";
import {useDispatch,useSelector} from "react-redux";
import { login } from "../../redux/apiCalls"



const Login = () => {

  const  [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const {email, password} = formData;
  const [errLocal, setErrorLocal] = useState(null);
  const [redirect, setRedirect] = useState(false)

  const dispatch = useDispatch();
 
  
  const admin = useSelector((state) => state.auth?.currentUser?.isAdmin);
  const {currentUser, message, error} = useSelector((state) => state?.auth)
 
  useEffect(() => {
 
    if(admin) {
      setRedirect(true)  
      window.location.href = "/"; 
    } 
  },[admin,currentUser,redirect])

  const onChange = (e) => {
    setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
    }))
  }

  const validateForm = () => {
      console.log("validateForm pokrenut:", email, password)
     if (!email || !password) {
       setErrorLocal("Please fill all fields")
       return false;
     };

     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
     if (!emailRegex.test(email)) {
       setErrorLocal("Email is not valid");
        console.log("Email nije validan:", email);
       return false;
     };
      if (password.length < 4) {
      setErrorLocal("Password must have at least 4 characters");
      return false;
    }
    setErrorLocal(null);
    return true;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
        console.log("handleSubmit pokrenut");
      if (!validateForm()) return;

       
    login(dispatch, { email,password } )
      
   
  }

  return ( 
    <main className="login">
        <h2 className="title">Login</h2>

        {/*fronted error*/}
        {errLocal && <p style={{color: "red"}}>{errLocal}</p>}

        {/*backend error*/}
         {!errLocal && error && message && <p style={{ color: "red" }}>{message}</p>}

        
        <form onSubmit={handleSubmit}>
           <input 
               type="text"
               onChange={onChange}
               placeholder='Email'
               id="email"
               value={email || ""}
               name="email"
               />
           
           <input
               type="password"
               placeholder="password"
               onChange={onChange}
               id='password'
               value={password || ""}
               name='password'
               />
                  
              <button type="submit" >
                Login
              </button>
        </form>
    </main> 
    );
}
 
export default Login;