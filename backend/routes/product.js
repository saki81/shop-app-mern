const {
  verifyTokenAndAdmin 
} = require("./verifyToken");
const router = require("express").Router();
const Product = require("../models/Product");
const User = require("../models/User");



// CREATE PRODUCT
// only admin creates product
router.post("/",verifyTokenAndAdmin, async (req, res) => {
  try {
    const {title,desc,img,categories,quantity,sizes,color,price,discountedPrice,discounts,inStock,newProd,sold,views} = req.body;
  
  console.log("Received data:", req.body);
  console.log("Categories IDs:", categories);
 
    const newProduct = await Product.create({
       title,
       desc,
       img,
       categories,
       quantity,
       sizes,
       color,
       price,
       originalPrice: price,
       discountedPrice,
       discounts,
       inStock,
       newProd,
       sold,
       views
    });
   
    const saveProduct = await newProduct.save()
    res.status(200).json(saveProduct)
    
  } catch (err) {
    res.status(500).json({error: err.message});
  }
 
});
// UPDATE PRODUCT
router.put("/:id", verifyTokenAndAdmin, async  (req, res) => {

    try {
      const updateProduct = await Product.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body
        },
        { new: true },
      );
        res.status(200).json(updateProduct) 
    } catch (err) {
        res.status(500).json(err)
    }
});
// DELETE PRODUCT
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
      await Product.findByIdAndDelete(req.params.id);
      res.status(200).json("Product has been deleted...")
    } catch (err) {
      res.status(500).json(err);
    }
});
// GET SINGLE PRODUCT
// admin users and guests can access the data
router.get("/find/:id", async (req, res) => {
 try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);

 } catch (err) {
    res.status(400).json(err)
 }
});
// GET NEW PRODUCTS
router.get("/new-products", async(req, res) => {
   try {
       const newProducts = await Product.find({newProd: {$gt: 0}}).sort({ createdAt: - 1}).limit(4);

       res.status(200).json(newProducts)
   } catch (err) {
      res.status(500).json({message: "Failed to new products",err})
   }
});
// GET PRODUCTS DISCOUNTED
router.get("/discounted",async (req, res) => {
   try {
    const products = await Product.find({discounts: {$gt: 0}})
    .sort({ createdAt: -1 })
    .limit(4) ;
     res.status(200).json(products);
   } catch (err) {
    res.status(500).json({message: "Failed to discount products",err});
   }
});
// PUT PRODUCT INCREASE :productId
router.put("/increase-views/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 }},
      { new: true }
    
  );

  res.status(200).json(updatedProduct);
} catch(err) {
    res.status(500).json({ message: "Failed to increase views", error: err.message });
  }
});
// GET PRODUCTS RECOMMENDED
router.get("/recommended", async (req, res) => {

  const {userId} = req.query;

  try {
    let recommended = [];

    if (userId) {
    const user = await User.findById(userId);
    if (user && user.viewedProducts && user.viewedProducts.length > 0) {
      // Get last viewed product
      const lastViewedProductId = user.viewedProducts[user.viewedProducts.length - 1];
      const lastViewedProduct = await Product.findById(lastViewedProductId);

      if (lastViewedProduct) {
        recommended = await Product.find({
          category: lastViewedProduct.category,
          _id: { $ne: lastViewedProduct._id },
        }).limit(4);
        
        return res.status(200).json(recommended);

       }
     }
   }

   recommended = await Product.find().sort({ views: - 1}).limit(4);
   return res.status(200).json(recommended);

  } catch (err) {
    res.status(500).json({ message: "Failed to fetch recommended products", error: err.message });
  }
});
// BEST SELLERS PRODUCTS
router.get("/best-sellers", async (req, res) => {
 
   try {
     const topProducts = await Product.find()
     .sort({ sold: -1 })
     .limit(4);
     
     res.status(200).json(topProducts);
   } catch (err) {
    res.status(500).json({message:"Failed to fetch top-selling products",
      error: err.message,}) 
  }
});
// GET SIMILAR PRODUCTS / productId
// GET SIMILAR PRODUCTS (advanced version for multiple categories)
router.get("/similar/:id", async (req, res) => {
  try {
    
    const currentProduct = await Product.findById(req.params.id);
    if (!currentProduct) {
      return res.status(404).json("Product not found");
    }

    if (!currentProduct || !Array.isArray(currentProduct.categories)) {
      return res.status(200).json([]); 
    }

    const subCategory = currentProduct.categories[1];

    if (!subCategory) {
      return res.status(200).json([])
    }
 
    const similarProducts = await Product.find({
      _id: { $ne: currentProduct._id },
      categories: subCategory,
    }).limit(4);

    res.status(200).json(similarProducts);
  } catch (err) {
    console.error("Error fetching similar products:", err);
    res.status(500).json(err);
  }
});

// GET PRODUCTS FOR SEARCH AUTOCOMPLETE
router.get("/search", async (req, res) => {
   const searchQuery = req.query.q;
   console.log(searchQuery)
   try {
        if(!searchQuery || searchQuery.trim() === "") {
          return res.status(400).json({message: "Query is required"})
        }

      const normalizeQuery = searchQuery.trim().split(/\s+/).join(".*");
        const regex = new RegExp(normalizeQuery, "i")

        const products = await Product.find({
          title: {$regex: regex}
        }).limit(10);

        const response = products.map(product => ({
          id: product._id,
          title: product.title,
          img: product.img,
          link: `/product/${product._id}`
        }));
        
        res.status(200).json(response)
   } catch (err) {
        res.status(400).json(err)
   }
});
// GET PRODUCTS FOR SEARCH ALL PRODUCTS WITHOUT LIMIT
router.get("/search-all", async (req, res) => {
    const query = req.query.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 9;

    if (!query || query.trim().length < 2) {
      return res.status(400).json({ message: "Query must be at least 3 characters long."})
    }
    try {
      const totalProducts = await Product.countDocuments({
        title: { $regex: query, $options: "i"}
      });
     
      const products = await Product.find({
        title: { $regex: query, $options: "i"}
      }).skip((page - 1) * limit).limit(limit);

      res.status(200).json({
        products,
        currentPage: page,
        totalPage: Math.ceil(totalProducts / limit),
        totalProducts
      })

    } catch (err) {
      res.status(500).json({message: "Search error."})
    }
});

// GET ALL PRODUCT
// admin users and guests can access the data
router.get("/", async (req, res) => {
 const qNew = req.query.new;
 const qCategory = req.query.category;
 const qSize = req.query.size;
 const qStock = req.query.inStock;
 const qPrice = req.query.price;
 const qDiscount = req.query.discounts;
 const qDiscountPrice = req.query.discountedPrice;
 const qOriginalPrice = req.query.originalPrice;

 // Pagination
 const {page = 1, limit = 9} = req.query;
 
 try {
  
     let productsQuery = Product.find().sort({ createdAt: - 1 });

     if(qNew) {
      productsQuery =  productsQuery.sort({ createdAt: - 1 }).limit(9);
     }
     else if(qCategory) {
      productsQuery =  productsQuery.find({
         categories: {
           $in: [qCategory]
         }
        
       })
     }
     else if(qSize) {
      productsQuery =  productsQuery.find({
         sizes: {
          $in: [qSize]
         }
       })
     }
     else if(qPrice) {
      productsQuery =  productsQuery.find({
        price: {
          $in: [qPrice]
        }
      })
     }
     else if(qStock) {
      productsQuery =  productsQuery.find({
        inStock: {
          $in: [qStock]
        }
       })
     }
     else if(qDiscountPrice) {
      productsQuery = productsQuery.find({
        discountedPrice: {
          $in: [qDiscountPrice]
        }
       })
     }
     else if(qOriginalPrice) {
      productsQuery = productsQuery.find({
       originalPrice: {
         $in: [qOriginalPrice]
       }
      })
    }
     else if(qDiscount) { 
      productsQuery = productsQuery.find({
        discounts: {
          $in: [qDiscount]
        }
       })
     }
  
    productsQuery = productsQuery.find();
    

     const totalProducts = await Product.countDocuments(productsQuery.getFilter());
    
    
     const totalPages = Math.ceil(totalProducts / limit);
     const currentPage = Math.min(page, totalPages)
     const products = await productsQuery
     .skip((currentPage - 1) * limit)
     .limit(Number(limit));

    
     res.status(200).json({
          products,
          currentPage,
          totalPage: totalPages,
          totalProducts
     });
    
  } catch (err) {
      res.status(400).json(err)
  }
});

module.exports = router
