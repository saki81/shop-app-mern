
const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// REGISTER
router.post('/register',async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  try {
    if (!username || !email || !password || !confirmPassword) {
      res.status(400);
      throw new Error('Please add all fields');
    }

    if (password !== confirmPassword) {
      res.status(400);
      throw new Error('Password does not match');
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error('User already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    if (user) {
      const accessToken = jwt.sign(
        { id: user._id },
        process.env.JWT_SEC,
        { expiresIn: '30d' }
      );

      const { password: userPassword, ...userWithoutPassword } = user._doc;

     return res.status(200).json({ ...userWithoutPassword, accessToken });
    } else {
      res.status(400);
      throw new Error('Invalid user data');
    }
   
  } catch (err) {
     return res.status(400).json({ message: err.message });
  }
});

// LOGIN
router.post("/login",async(req, res) => {

     const {email, password} = req.body;
  
   try {

    if(!email || !password) {
      res.status(400)
      throw new Error("Please add all fields")
     }
  
     
     const user = await User.findOne({email: email} );

     
     if(!user) {
      throw new Error( 'Wrong email or password')
     }
     
     const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password,
     
    );
    if (!isPasswordCorrect || !user && ( !email) ) {

      throw new Error( "Wrong password");
    }
     
     if (user && (await bcrypt.compare(password, user.password))) {
  
      const accessToken = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.JWT_SEC,
        { expiresIn: "30d" }
      );
      console.log("Generated Token:", accessToken);

      const { password, ...others } = user._doc;
      
      return res.status(200).json({ ...others,accessToken });
      }    
     else {
        res.status(404)
        throw new Error('Invalid credentials')
     
    }  
   
   } catch (err) {
      
      return res.status(400).json({message: err.message})
    }
});

module.exports = router; 
