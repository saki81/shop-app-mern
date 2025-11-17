import "./product.css";
import { Link,  useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import { Publish } from "@material-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import {getProducts, updateProduct } from "../../redux/apiCalls";
import { calculateDiscountedPrice } from "../../helpers/priceCalculator";



  const Product = () => {
   
    const { id: productId } = useParams()
   
    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch();
   

    const product = useSelector((state) => {
       const productsData= state.product.products;
       
       if(productsData && Array.isArray(productsData.products)) {
         return productsData.products.find((prod) => prod._id === productId)
       }

       return null;
 
  });
    
    const [updatedProduct, setUpdatedProduct] = useState({
      _id: product?._id || "",
      title: product?.title || "",
      desc: product?.desc || "",
      sizes: product?.sizes || "",
      price: parseFloat(product?.price) || 0,
      price: parseFloat(product?.discountedPrice) || 0,
      originalPrice: parseFloat(product?.originalPrice) || 0,
      discounts: parseFloat(product?.discounts) || 0,
      discountedPrice: parseFloat(product?.discountedPrice) || 0,
      img: product?.img || "",
      inStock: product?.inStock ?? true,
      newProd: product?.newProd ?? false,
    });

   
  
   const handlePriceChange = (e) => {
      const priceValue = parseFloat(e.target.value) || 0
       setUpdatedProduct((prev) => ({
         ...prev,
         price: priceValue,
         originalPrice: priceValue,   
       }))
   };
 
    const handleDiscountChange = (e) => {
      const discountValue = parseFloat(e.target.value) || 0;

      const updatedDiscountedPrice = calculateDiscountedPrice(
        updatedProduct.originalPrice,

        discountValue, 
          
      ).discountedPrice.toFixed(2);


      setUpdatedProduct((prev) => ({
        ...prev,
        discounts: discountValue,
        discountedPrice: updatedDiscountedPrice,
        }));
      };

      const handleResetDiscount = () => {
        setUpdatedProduct((prev) => ({
          ...prev,
          discountedPrice: prev.originalPrice,
          price: prev.originalPrice, 
          discounts: 0,   
        }));
      };
      
      const handleUpdate = () => {
        const {  discounts,originalPrice } = updatedProduct;
  
        const updatedDiscountedPrice = calculateDiscountedPrice(
          originalPrice,
          discounts,
        ).discountedPrice;
  
        const updatedProductData = {
          ...updatedProduct,
          discountedPrice: updatedDiscountedPrice,
        }
        setLoading(true);
       
        updateProduct(product._id, updatedProductData,  dispatch).then(() => {
          
            setLoading(false)
            
        }).catch((err) => {
          console.log(err)
        })
      };
     
    

    return (
      <div className="product">
        <div className="product-container">
          <h1 className="product-title">Product</h1>
          <Link to="/newproduct">
            <button className="create-product-btn">Create</button>
          </Link>
        </div>
        <div className="product-top">
          <div className="product-top-right">
            <div className="product-info-top">
              <img src={product?.img } alt="" />
              <span className="product-name">{product?.title}</span>
            </div>
            <div className="product-info-bottom">
              <div className="product-info-item">
                <span className="product-infokey">Id: </span>
                <span className="product-infovalue">{product?._id}</span>
              </div>
  
              <div className="product-info-item">
                <span className="product-infokey"
                style={{marginRight: "30px" }}>  Stock:</span>
                <span className="product-infovalue">
                  {updatedProduct?.inStock === true ? "product in Stock" : "product out Stock"}
                </span>
              </div>
              <div className="product-info-item">
                <span className="product-infokey" 
                style={{marginRight: "10px" }}>  Product:</span>
                <span className="product-infovalue">
                  {updatedProduct?.newProd === false ? "product is Standard" : "product is New"}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="product-bottom">
          <form className="product-form">
            <div className="product-form-left">
              <label>Product Name</label>
              <input
                type="text"
                placeholder={product?.title}
                value={updatedProduct?.title}
                onChange={(e) =>
                  setUpdatedProduct({ ...updatedProduct, title: e.target.value })
                }
              />
              <label>Product Description</label>
              <textarea
                type="text" rows={10}
                placeholder={product?.desc}
                value={updatedProduct?.desc}
                onChange={(e) =>
                  setUpdatedProduct({ ...updatedProduct, desc: e.target.value })
                }
              />
              <label>Product Size</label>
              <input
                type="text"
                palaceholder={product?.sizes}
                value={updatedProduct?.sizes}
                onChange={(e) => 
                  setUpdatedProduct({...updatedProduct, sizes: e.target.value.split(",")})
                }/>
             
              <label>Price</label>
            
            <input
              type="number"
              placeholder={product?.price || ""} 
              value={updatedProduct?.price || "" || updatedProduct?.originalPrice || ""}
              onChange={handlePriceChange}
            />
           
           {updatedProduct?.discounts > 0 && (
              <>
                <label>Discounted Price</label>
                <input
                  type="number"
                  placeholder={product?.discountedPrice}
                  value={updatedProduct?.discountedPrice || ""}
                  onChange={(e) => setUpdatedProduct({ ...updatedProduct, discountedPrice: parseFloat(e.target.value) || 0 })}
                  readOnly               
                />
                    <button type="button" onClick={handleResetDiscount}>
                       Reset Discount
                   </button>
              </>
         
            )}
            <label>Discounts (%)</label>
                <input
                  type="number"
                  placeholder={product?.discounts}
                  value={updatedProduct?.discounts || 0}
                  onChange={handleDiscountChange}/>
              <label>In Stock</label>
              <select name="in-stock" 
                      id="in-stock"
                      value={updatedProduct?.inStock?.toString()}
                      onChange={(e) =>
                        setUpdatedProduct({
                          ...updatedProduct,
                          inStock: e.target.value === "true" 
                        })
                      }>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>

              <label>Product is New</label>
              <select name="is-new" 
                      id="is-new"
                      value={updatedProduct?.newProd?.toString()}
                      onChange={(e) =>
                        setUpdatedProduct({
                          ...updatedProduct,
                          newProd: e.target.value === "true" 
                        })
                      }>
                <option value="false">No</option>
                <option value="true">Yes</option>
              </select>
            </div>
  
            <div className="product-form-right">
              <div className="product-upload">
                <img src={product?.img} alt="" />
              </div>
              <label htmlFor="file">
                <Publish className="publish-icon" style={{ cursor: "pointer" }} />
              </label>
              <input type="file" id="file" style={{ display: "none" }} />
            </div>

          </form>
          
            <button
             disabled={loading}
             onClick={handleUpdate}
             className={loading ? "loading-btn" : "product-update-btn"} 
             >
             {loading ? "Loading..." : "Update"}
          </button>  
        </div>
      </div>
    
    );
  
  };

  export default Product;

 