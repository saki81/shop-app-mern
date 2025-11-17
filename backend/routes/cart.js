const {
  verifyToken, 
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin 
} = require("./verifyToken");
const router = require("express").Router();
const Cart = require("../models/Cart");


// CREATE CART 
router.post("/", async (req, res) => {
  try {
    const cart = new Cart({
      userId: req.body.userId,
      products: req.body.products || [],
    });
    const savedCart = await cart.save();
    res.status(201).json(savedCart)
  } catch (err) {
    res.status(500).json(err)
  }
})

// GET USER CART
router.get("/:userId", verifyTokenAndAuthorization, async (req, res) => {
 try {
    const cart = await Cart.findOne({userId: req.params.userId});
    res.status(200).json(cart);

 } catch (err) {
    res.status(400).json(err)
 }
}); 
// CLEAR cart
router.delete("/:userId",verifyTokenAndAuthorization,async (req, res) => {
  try {
    const cart = await Cart.findOneAndUpdate(
      { userId: req.params.userId },
      { $set: { products: [] } },
      { new: true }
    );
    res.status(200).json(cart)
  } catch (err) {
    
  }
})

// GET ALL 
 router.get("/",verifyTokenAndAdmin, async (req, res) => {
    try {
      const carts = await Cart.find();
      res.status(200).json(carts)
    } catch (err) {
      res.status(500).json(err);
    }
}); 

module.exports = router