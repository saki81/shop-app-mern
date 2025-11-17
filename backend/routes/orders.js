const {
  verifyToken, 
  verifyTokenAndAuthorization,
  verifyTokenAndOrderAuthorization,
  verifyTokenAndAdmin 
} = require("./verifyToken");
const router = require("express").Router();
const mongoose = require("mongoose");
const Order = require("../models/Order");
const moment = require("moment");
const Product = require("../models/Product");



// CREATE ORDER SHOP 
router.post("/", async (req, res) => {

   const {orderId,userId,username,email, products, total, shippingInfo} = req.body;


   const shippingState = shippingInfo.state.toString();
   const shippingAddress = shippingInfo.address.toString();
   const shippingCity = shippingInfo.city.toString();

   const newOrder = new Order({
      orderId,
      userId,
      username,
      email,
      products: products.map(({productId,quantity,img,category,size,color,title,price,discountedPrice,discounts,amount})=>({
        productId: mongoose.Types.ObjectId(productId),
        quantity: amount,
        img,
        category,
        size,
        color,
        title,
        price,
        discountedPrice,
        discounts,
        amount,
    
      })),
     
      total,
      
      shippingInfo: {
        state: shippingState,
        address: shippingAddress,
        city: shippingCity
      },
      status: "Processing"
   });

   try {

    const savedOrder = await newOrder.save();
    
    for (const product of savedOrder.products) {
     
      if (product.productId && typeof product.quantity === "number") {
        
        await Product.findByIdAndUpdate(
          product.productId,
          { $inc: { sold: product.quantity } },
          { new: true }
        );
      }
    }
   
     res.status(200).json(savedOrder)
     
   } catch (err) {
    console.error("Error occurred while processing order:", err);
     res.status(500).json(err)
   }
});

// GET SUMMARY ADMIN
router.get("/summary", verifyTokenAndAdmin, async (req, res) => {

  try {
    const startOfCurrentOrder = moment().startOf('month').toDate();
    const startOfPreviousOrder = moment().subtract(1, 'month').startOf('month').toDate();
    const endOfPreviousOrder = moment().startOf('month').toDate(); 

    const orderCount = await Order.countDocuments({});

    const currentOrderCount = await Order.countDocuments({
      createdAt: { $gte: startOfCurrentOrder }
    })

    const previousOrderCount = await Order.countDocuments({
       createdAt: { $gte: startOfPreviousOrder, $lt: startOfCurrentOrder }
    })
    const totalRevenue = await Order.aggregate([
      
      {
        $group: {_id: null, total: { $sum: "$total" }}
      },
    ]);

    const currentTotalRevenue = await Order.aggregate([
      {
        $match: {createdAt: {$gte: startOfCurrentOrder}}
      },
      {
        $group: {_id: null, total: { $sum: "$total"}}
      }
    ])

    const previousTotalRevenue = await Order.aggregate([

      {
        $match: {createdAt: {$gte: startOfPreviousOrder, $lt: startOfCurrentOrder}}
      },
      {
        $group: {_id: null, total: { $sum: "$total"}}
      }
    ])
    
    res.status(200).json({
      orderCount,
      currentOrderCount,
      previousOrderCount,
      totalRevenue: totalRevenue[0] ? totalRevenue[0].total : 0,
      currentTotalRevenue: currentTotalRevenue[0] ? currentTotalRevenue[0].total : 0,
      previousTotalRevenue: previousTotalRevenue[0] ? previousTotalRevenue[0].total : 0
    })
    
  } catch (err) {
    res.status(500).json(err)
  }
})

// UPDATE ORDER STATUS ADMIN
router.put("/:id/status", verifyTokenAndAdmin, async  (req, res) => {
    try {
      const existingOrder = await Order.findOne(req.params.orderId);
      if(!existingOrder) {
        return res.status(404).json({message: "Order not found"})
      }
     
      const updateOrder = await Order.findByIdAndUpdate(
        req.params.id,
        
        {
         
          status: req.body.status ,
          deliveredAt:  req.body.status === "Delivered" ? new Date().toISOString() : null
          // }
        },
        { new: true },
      );
        res.status(200).json(updateOrder) 
    } catch (err) {
        res.status(500).json(err)
    }
}); 

// DELETE ORDER ADMIN
 router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
      await Order.findByIdAndDelete(req.params.id);
      res.status(200).json("Order has been deleted...")
    } catch (err) {
      res.status(500).json(err);
    }
});
// GET SINGLE ORDER  ADMIN
router.get("/:orderId", verifyTokenAndAdmin, async (req, res) => {
   try {
     const order = await Order.findById(req.params.orderId);

     if (!order) {
      return res.status(404).json({message: "Order not found"})
     }

     res.status(200).json(order)
   } catch (err) {
    console.error("Error fetching order:", err);
    res.status(500).json({ message: "Internal server error", error: err.message })
   }
});
///:userId
// GET USER ORDERS FRONTED
router.get("/user/:userId",verifyTokenAndAuthorization, async (req, res) => {

 try {
 
  const ordersUser = await Order.find({userId: req.params.userId});

    if (ordersUser.length === 0) {
      return res.status(404).json({message: "Orders user not found"})
    }
    
    res.status(200).json(ordersUser);

 } catch (err) {
    res.status(500).json({ message: "Internal Server Error", error: err.message })
  }
 })
   
// GET SINGLE ORDER FRONTED
router.get("/order/:orderId",verifyTokenAndOrderAuthorization, async (req, res) => {
   try {
    
    const order = await Order.findOne({orderId: req.params.orderId})
      if (!order) {
        return res.status(404).json({message: "Order not found"})
      }
      
      res.status(200).json(order)
   } catch (err) {
     res.status(500).json({message: "Error fetching order", error: err})
   }
});

// GET ALL ORDER  ADMIN
 router.get("/",verifyTokenAndAdmin, async (req, res) => {
    const query = req.query.new;
    try {
      let orders;

      if(query === "true") {
      
         orders = await Order.find().sort({_id: -1 }).limit(9)
      } else {
         orders = await Order.find().sort({_id: -1});
      }
      res.status(200).json(orders)
    } catch (err) {
      res.status(500).json(err);
    }
});



module.exports = router