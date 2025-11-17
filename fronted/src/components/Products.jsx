
import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import Product from "./Product";
import useFetch from "../hooks/useFetch";
import useScrollToNewItem from "../hooks/useScrollToNewItem";
import { medium, mobile } from "../responsive";
import loader from "../image/loader.gif"


const Products = ({ cat, sort, selectedFilters}) => {
   
 const { products, loading,loadMore,handleLoadMore,totalProducts } = useFetch ({cat});


  const [filterProducts, setFilterProducts] = useState([]);
  const [displayLimit, setDisplayLimit] = useState(9);  
  const [isFilter, setIsFilter] = useState(false);
  const [currentTotal, setCurrentTotal] = useState(totalProducts);

  
  const productsRef = useRef([])
 

  const { triggerScroll } = useScrollToNewItem(productsRef, 80);

  useEffect(() => {
    setCurrentTotal(totalProducts);
  }, [totalProducts]);

  useEffect(() => {
      setDisplayLimit(9);
      setFilterProducts([]);

      productsRef.current=[];
    
      console.log("Kategorija promenjena:", cat);
      console.log("Fetched proizvodi:", products);
  }, [cat, selectedFilters]); 


  useEffect(() => {
    if ( selectedFilters && Array.isArray(products)) {
      let filtered = products.filter((product) => {
        if ( !product.categories || !product.price || product.categories.length === 0 ) {
         
          return true; 
        }
        if (Array.isArray(product.color)) {
          const productColor = product.color[0];
          if (selectedFilters.selectColor !== "All" && productColor !== selectedFilters.selectColor) {
            setIsFilter(true);
            return false;
          }
        }
        if(cat === "men" || cat === "women" ) {
          const isAllProduct = selectedFilters.selectProduct === "AllProduct";
          if (!isAllProduct && !product.categories.includes(selectedFilters.selectProduct  )) {
            return false;
          }    
        }
        if (cat === "tshirt" || cat === "shoes" || cat === "jackets") {
          const isAllShirtSizes = selectedFilters.selectShirts === "AllShirts";
          const isAllShoeSizes = selectedFilters.selectShoes === "AllShoes";
          const isAllJacketSizes = selectedFilters.selectJackets === "AllJackets";

          if (
            (!isAllShirtSizes && !product.sizes.includes(selectedFilters.selectShirts)) ||
            (!isAllShoeSizes && !product.sizes.includes(selectedFilters.selectShoes)) ||
            (!isAllJacketSizes && !product.sizes.includes(selectedFilters.selectJackets))
          ) {
            
            return false;
          }

          const isAllGender = selectedFilters.selectGender === "AllGender";
          if (!isAllGender && !product.categories.includes(selectedFilters.selectGender)) {
            return false;
          }
        }

        return true; 
      });

      if(sort === "newest") {
        filtered = filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      }
      else if(sort === "desc") {
        filtered = filtered.sort((a, b) => b.price - a.price)
      }
      else if(sort === "asc") {
        filtered = filtered.sort((a, b) => a.price - b.price)
      }
      
      setIsFilter(filtered.length === 0);
      setFilterProducts(filtered);  
  } 
  
  }, [products, cat, selectedFilters, sort, totalProducts]);


  const displayedProducts =
  selectedFilters && Object.values(selectedFilters).some(v => v !== "All" && v !== "") 
    ? filterProducts
    : products;


   const loadMoreProducts = () => {
     const firstNewIndex = displayLimit;
     handleLoadMore(); 
     setDisplayLimit((prev) => prev + 9); 
  
     setTimeout(() => {
    triggerScroll(firstNewIndex); 
  }, 0); 
  };

  const isLoadMoreVisible =
 displayedProducts.length >= displayLimit && !isFilter && !loading;

  useEffect(() => {
    console.log("Products:", products);
    console.log("Filtered Products:", filterProducts);
    console.log("Load More:", loadMore);
    console.log("Total Products from API:", totalProducts);
  }, [products, filterProducts, loadMore, displayLimit,totalProducts]);

  if (loading || products.length === 0) {
    return (
      <Container>
        <NumberProduct>Total Products: {currentTotal}</NumberProduct>
        <Wrapper>
         <div className="loading">
           <img src={loader} alt="loader"/>
         </div>
        </Wrapper>
       </Container>
       )
}

  return (
    <Container>
     <NumberProduct>Total Products: {currentTotal}</NumberProduct>
      <Wrapper>
        { isFilter && displayedProducts.length === 0 
        ? ( <NoProducts>No products</NoProducts>) 
        : (
            displayedProducts.slice(0, displayLimit).map((item, index) => <Product 
              item={item} 
              key={item._id}
              ref={((el)=>productsRef.current[index] = el)}/>)           
          )}
      </Wrapper>
      { isLoadMoreVisible && displayedProducts.length > 0 && 
         (<button onClick={loadMoreProducts}>Load More</button>) }
    </Container>
  );
};
    
export default Products;

const Container = styled.section`
   padding: 60px 0;
   background-color:#fff;
   max-width: 1280px;
   margin: 0 auto;
`;
const NumberProduct = styled.h3`
   font-size: 20px;
   letter-spacing: 1px;
   color: #525454;
   font-weight: 400;
`
const Wrapper = styled.div`
   display: flex;
   justify-content: space-between;
   max-width: 1280px;
   flex-wrap: wrap;
   margin: 0 auto;
   

   ${medium(
     {
      width: "92%",
     
     }
    )}
   ${mobile(
     {
      width: "95%",
      flexDirection: "column"
     
     }
    )}
`;
const Title = styled.p`
   margin-top: 0px;
   font-size: 22px;
   letter-spacing: 1px;
   color: #525454;
`;
const NoProducts = styled.h2`
  font-size: 27px;
  display: inline-block;
  margin: 0 auto;
  text-align: center;
  color: #525454;
  letter-spacing: 1px;
  padding: 85px 0;
`;
