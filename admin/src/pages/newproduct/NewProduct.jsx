
import { AddAPhotoOutlined } from "@material-ui/icons";
import "./newproduct.css";
import { useState } from "react";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../../firebase";
import { addProducts } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";
import { calculateDiscountedPrice } from "../../helpers/priceCalculator";


const NewProduct = () => {


const [file, setFile] = useState(null);
const [title, setTitle] = useState("");
const [desc, setDesc] = useState("")
const [cat, setCat] = useState([]);
const [color, setColor] = useState([])
const [size, setSize] = useState([]);
const [price, setPrice] = useState(0)
const [loading, setLoading] = useState(false)


const dispatch = useDispatch();


const handleCat = (e) => {
  const catValue = e.target.value.split(",") 
  const catId = catValue.map((cat) => cat.trim()) 
 
  setCat(catId)
};


const handleSize = (e) => {
  setSize(e.target.value.split(","))
};


const handleColor = (e) => {
  setColor(e.target.value);
  
}


const handleClick = (e) => {
  e.preventDefault();
  

  console.log("Categories IDs:", cat);

  if(!cat.length ||!title || !desc || !size || !price || !color ) {
    console.error("Molimo popunite sva polja");
    
    return
 }

  setLoading(true);
  const fileName = new Date().getTime() + file.name;
  const storage = getStorage(app);
  const storageRef = ref(storage, fileName);
  const uploadTask = uploadBytesResumable(storageRef, file);

  // Register three observers:
  // 1. 'state_changed' observer, called any time the state changes
  // 2. Error observer, called on failure
  // 3. Completion observer, called on successful completion

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress =
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
      switch (snapshot.state) {
        case "paused":
          console.log("Upload is paused");
          break;
        case "running":
          console.log("Upload is running");
          break;
        default:
      }
    },
    (error) => {
      // Handle unsuccessful uploads
      console.log(error)
    },
    () => {
      
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        
        const product = { 
         // ...inputs,
          title: title,
          desc: desc,
          img: downloadURL, 
          categories: cat, 
          sizes: size,
          color: color,
          price: price,
        };
        
        addProducts(product, dispatch).then(()=> {
          // reset form inputs
          setFile(null);
          setTitle("");
          setDesc("");
          setCat("");
          setSize("");
          setColor("");
          setPrice(0);
          setLoading(false);
       
      }).catch((err) => {
         console.log(err);
         setLoading(false)
      });
     })
    }
  ) 
}
return (
  <div className="new-product">
    <h1 className="add-product-title">New Product</h1>
    <form className="add-product-form">
      <div className="new-product-add">
        <label>Image</label>
        <div className="product-item">
         <input 
          type="file"
          id="file"
         // style={{display: "none"}}
         onChange={(e) => setFile(e.target.files[0])}
        />
         
        </div>
       </div>
      
      <div className="product-item">
        <label>Title</label>
        <input
          name="title"
          type="text"
          value={title}
          placeholder="Apple Airpods"
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      
      <div className="product-item">
        <label>Description</label>
        <textarea cols="30" rows="10"
          name="desc"
          type="text"
          value={desc}
          placeholder="description..."
          onChange={(e) => setDesc(e.target.value)}
        />
      </div>
      <div className="product-item">
        <label>Price</label>
        <input
          name="price"
          type="number"
          value={price}
          placeholder="100"
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
 
      <div className="product-item">
        <label>Categories</label>
        <input type="text" placeholder="men,women,tshirt,shoes, jackets" onChange={handleCat} />
      </div>
    
      <div className="product-item">
        <label>Colors</label>
        <select name="color" onChange={handleColor}>
          <option hidden="color">Color</option>
          <option value="red">Red</option>
          <option value="blue">Blue</option>
          <option value="green">Green</option>
          <option value="yellow">Yellow</option>
          <option value="black">Black</option>
          <option value="white">White</option>
        </select>
      </div>
      <div className="product-item">
        <label>Size</label>
        <input type="text" 
               placeholder="s,m,l,xl,xxl,xxxl or 36,37,38,39,40..." 
               onChange={handleSize}/>
      </div>
      <div className="product-item">
        <label>Stock</label>
        <select name="inStock"/* onChange={handleChangeStock}*/>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </div>
      <button 
           disabled={loading}
           onClick={handleClick} 
           className={loading ? "loading-btn" : "add-product-btn"}>
            { loading  ? 'Loading...' :  'Create' }
      </button>
    </form>
  </div>
  );
 
}

 
export default NewProduct;