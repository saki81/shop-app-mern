const { 
        verifyTokenAndAuthorization,
        verifyTokenAndAdmin 
      } = require("./verifyToken");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const moment = require("moment")
const express = require("express");
const router = express.Router();



// GET USER STATISTICS
router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1 ));
 
  try {
    
    // group stats
    const data = await User.aggregate([
      //takes state          more than > last year
       {$match: { createdAt: {$gte: lastYear } } },
       {
         $project: {
            month: { $month: "$createdAt" },
         },
       },
       {
         $group:{
           _id: "$month", 
           total: { $sum: 1 },
         }, 
       },
    ]);
    
    res.status(200).json(data)
  } catch (err) {
    
    res.status(500).json(err)
  }
});
// GET USER COUNT
router.get("/count", verifyTokenAndAdmin, async (req,res) => {
  console.log("Accessing /count route"); // Dodaj log za početak
  
  try {
   
    const startOfCurrentUser =  moment().startOf('month').toDate();
    const startOfPreviousUser = moment().subtract(1, 'month').startOf('month').toDate();
    const endOfPreviousUser = moment().startOf('month').toDate();

    console.log("startOfCurrentMonth:", startOfCurrentUser);
    console.log("startOfPreviousMonth:", startOfPreviousUser);
    console.log("endOfPreviousMonth:", endOfPreviousUser);
    
    const userCount = await User.countDocuments({});
    const currentMonthCountUser = await User.countDocuments({
      createdAt: { $gte: startOfCurrentUser }
    });
    const previousMonthCountUser = await User.countDocuments({
      createdAt: { $gte: startOfPreviousUser, $lt: startOfCurrentUser}
    })
    console.log("User count:", userCount); 
    console.log("Current month count:", currentMonthCountUser);
    console.log("Previous month count:", previousMonthCountUser);
    res.status(200).json({ userCount,currentMonthCountUser, previousMonthCountUser})
  } catch (err) {
    console.error("Error fetching user count:", err);
    res.status(500).json(err)
  }
});

// CREATE USER
 router.post("/",verifyTokenAndAuthorization,  async (req, res) => {
   const { username, email, password } = req.body;
  try {
     const salt = await bcrypt.genSalt(10);
     const hashedPassword = await bcrypt.hash(password, salt)

     const user = User.create({
        username,
        email,
        password: hashedPassword,
     });
     
     if (user) {
      res.status(201).json({
        _id: user.id,
        username: user.username,
        email: user.email,
      })
     } else {
      res.status(400)
      throw new Error("Invalid user data")
     }
    
  } catch (error) {
     res.status(500).json(error)
  }
});

// UPDATE USER
router.put("/:userId",verifyTokenAndAuthorization, async  (req, res) => {

   let updateData = {};

   if(req.body.username) {
     updateData.username = req.body.username
   }

   if(req.body.password) {
    const salt = 10
    const hashedPassword = await bcrypt.hash(req.body.password,salt) 
    
      req.body.password = hashedPassword
   
   }
   try {
     const updateUser = await User.findByIdAndUpdate(
      req.params.userId,
       {
         $set: req.body,
       },
        { new: true }

     );
     res.status(200).json(updateUser)
   } catch (err) {
     res.status(500).json(err)
   }
});

// DELETE USER
router.delete("/:id",verifyTokenAndAuthorization, async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (deletedUser) {
      res.status(200).json({ message: "User has been deleted" });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});
// VIEWED PRODUCT USERID
router.put("/add-viewed/:userId", async(req, res) => {
  const {productId} = req.body;

  try {
    await User.findByIdAndUpdate(req.params.userId, {
      $push: {viewedProducts: productId},
    });

    res.status(200).json("Wiewed Product")
  } catch (err) {
    res.status(500).json(err)
  }
})

// GET USER
router.get("/:userId", verifyTokenAndAuthorization, async (req, res) => {
  try {
     const user = await User.find({userId: req.params.userId});
     
     const {password, ...others} = user._doc;
      res.status(200).json(others);

  } catch (err) {
     res.status(400).json(err)
  }
});

// GET ALL USER
router.get("/",verifyTokenAndAdmin, async (req, res) => {
  const query = req.query.new;
  try {
    let users;
    
    if (query === "true") {
      users = await User.find().sort({ _id: -1 }).limit(5);
    } else {
      users = await User.find();
    }
    
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json(err);
  }
});



module.exports = router;