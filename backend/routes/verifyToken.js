const jwt = require("jsonwebtoken");
const Order = require("../models/Order");

const verifyToken = (req, res, next) => {

 console.log("Headers:", req.headers);
  const authHeader = req.headers.authorization || req.headers.token;
  if(authHeader) {
    const token = authHeader.split(" ")[1]
     jwt.verify(token, process.env.JWT_SEC, (err, user) => {
        if(err) {
          console.error("Token verification error:", err);
          return res.status(403).json("Token is not valid");
        }
        req.user = user;
        next();
     });
  } else {
      return res.status(401).json("You are not authenticated!")
  }
};

const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res,  () => {
        console.log("🔹 JWT user ID:", req.user.id);
    console.log("🔹 URL param userId:", req.params.userId);
    console.log("🔹 isAdmin:", req.user.isAdmin);
  
      if(req.user.id.toString() === req.params.userId.toString() ||  req.user.isAdmin ) {
        next();
      } else {
       return res.status(403).json("Your are not alowed to do that!")
      }

  });
};

const verifyTokenAndOrderAuthorization = async (req, res, next) => {
  verifyToken(req, res, async () => {
    console.log("User verified:", req.user.id);

    try {
      const order = await Order.findOne({ orderId: req.params.orderId }); 
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      if (order.userId === req.user.id || req.user.isAdmin) {
        next();
      } else {
        return res.status(403).json("You are not allowed to do that!");
      }
    } catch (error) {
      return res.status(500).json({ message: "Error verifying order", error });
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res,() => {

    if(req.user.isAdmin) {
      console.log("User is admin:", req.user);
      next();
    } else {
    
    return res.status(403).json("Your are not alowed to do that!")
     
    }
  
  });
};


module.exports = { 
   verifyToken,
   verifyTokenAndAuthorization,
   verifyTokenAndOrderAuthorization,
   verifyTokenAndAdmin 
 }