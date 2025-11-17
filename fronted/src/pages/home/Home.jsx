

import Slider from "../../components/Slider";
import Categories from "../../components/Categories";
import { toggleLoader } from "../../redux/loaderSlice";
import Newsletter from "../../components/Newsletter";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import BestSellers from "../../components/BestSellers";
import DiscountLastProducts from "../../components/DiscountLastProducts";
import RecommendedProducts from "../../components/RecommendedProducts";
import NewProducts from "../../components/NewProducts";
import Loading from "../../components/Loading";



const Home = () => {

  
  const dispatch = useDispatch()

  useEffect(() => {
    
    const hasVisited = sessionStorage.getItem("homeVisited");

    if (!hasVisited) {
      
      dispatch(toggleLoader(true));

      const timer = setTimeout(() => {
        dispatch(toggleLoader(false));
        
        sessionStorage.setItem("homeVisited", "true"); 
      }, 300); 

      return () => clearTimeout(timer);
    }
  }, [dispatch]);

 

 
  
  return ( 
    <>
     <Loading/> 
      <Slider/>
      <Categories />
      <BestSellers />
      <DiscountLastProducts/>
      <NewProducts />
      <RecommendedProducts/>
      <Newsletter/> 
    </>
   );
}
 
export default Home;