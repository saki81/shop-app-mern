import "./newuser.css";
import { useState } from "react";
import { addUser } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";

const NewUser = () => {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("") 
  const [loading, setLoading] = useState(false)
  const [inputs, setInputs] = useState({});
  const dispatch = useDispatch();

  const handleChange = (e) => {
    
    setInputs((prev) => {
      return {...prev, [e.target.name]: e.target.value };
    });
  };

  const handleClick = (e) => {
    e.preventDefault();

    if(!username || !email || !password) {
       console.log("Molimo unesite sva polja")
    }
    
    setLoading(true)
    const user = {
      ...inputs,
      username: username,
      email: email,
      password: password
    }
    
    addUser(user, dispatch).then(() => {
       
       setUsername("")
       setEmail("")
       setPassword("")

       setLoading(false)

    }).catch((err) => {
        console.log(err)
        setLoading(false)
    });
   
   
  };
  
   return (
        <div className="newuser">
          <span className="newuser-title">New User</span>
          <form className="newuser-form">
             <div className="newuser-item">
               <label>Username</label>
               <input 
                 name="username"
                 type="text"
                 value={username} 
                 placeholder="Username" 
                 onChange={((e) => setUsername(e.target.value))}/>
             </div>
             
             <div className="newuser-item">
               <label>Email</label>
               <input 
                 name="email"
                 type="email"
                 value={email} 
                 placeholder="Email" 
                 onChange={((e) => setEmail(e.target.value))}/>
             </div>
             <div className="newuser-item">
               <label>Password</label>
               <input
                 name="password" 
                 type="text" 
                 value={password}
                 placeholder="Password" 
                 onChange={((e) => setPassword(e.target.value))}/>
             </div>
             
             
            <div className="newuser-item">
               <label>Gender</label>
               <div className="newuser-gender">
                  <input onChange={handleChange}type="radio" name="gender" id="female" value="female" />
                  <label htmlFor="female">Female</label>
               </div>
               <div className="newuser-gender">
                  <input onChange={handleChange}type="radio" name="gender" id="male" value="male" />
                  <label htmlFor="male">Male</label>
               </div>
             </div>
             <div className="newuser-item">
               <label>Active</label>
               <select name="active" id="active" className="newuser-select"
               onChange={handleChange}>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                  </select>  
              </div>
          </form>
          <button 
              disabled={loading}
              onClick={handleClick} 
              className="newuser-create-btn">
                { loading  ? 'Loading...' :  'Create' }
                
          </button> 
        </div> 
   );
}
 
export default NewUser;