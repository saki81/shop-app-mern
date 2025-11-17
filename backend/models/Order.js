const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
   orderId: {
      type: String,
      required: true,
      unique: true  
   },
   userId: {
      required: true,
      type: String,
    },
   username: {
    type: String,
    required: true
   },
   email: {
    type: String,
    required: true
   },
   products: [

      {
    
      productId: { 
         type: mongoose.Schema.Types.ObjectId, 
         ref: "Product",
         required: true
        },
      quantity: { 
         type: Number,
        },
      img: String,
      category: Array,
      size: String,
      color: Array,
      title: String,
      price: Number,
      discountedPrice: Number,
      discounts: Number,
        
      amount: {
       type: Number,
       required: true
      }, 
   }
],
 
   total: {
      type: Number,
      required: true,
   },

   shippingInfo: {
    state: String,
    address: String,
    city: String

},
   status: {
      type: String,
      enum: ["Processing", "Delivered"],
      default: "Processing",
   },
   deliveredAt: {
      type: Date,
      default: null
   }
},
   {timestamps: true}
);


module.exports = mongoose.model("Order", orderSchema);


