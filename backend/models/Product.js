const mongoose = require("mongoose");



const ProductSchema = new mongoose.Schema({
   title: {
      type: String,
      required: true,
   },
   desc: {
      type: String,
      required: true,
   },
   img: {
      type: String,
      required: true,
   },
   categories: {
      type: Array,
      required: true,
   
   },
   quantity: {
      type: Number,
      default: 1,
    },
   sizes: {
      type: Array,            
   },
   color: {
      type: Array,
   },
   price: {
      type: Number,
   },
   discountedPrice: {
      type: Number,
      default: 0,
   
  },
   originalPrice: {
      type: Number,
     
  },
   discounts: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,

   },
   inStock: {
      type: Boolean,
      default: true,
   },
   newProd: {
      type: Boolean,
      default: false,
   },
   sold: {
      type: Number,
      default: 0,
   },
   views: {
      type: Number,
      default: 0,
   }  
},
   { timestamps: true }
);


module.exports = mongoose.model('Product', ProductSchema);



