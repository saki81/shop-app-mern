import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { medium, mobile} from "../../responsive";
import Product from "../../components/Product";
import useFetch from "../../hooks/useFetch";
import useScrollToNeWItem from "../../hooks/useScrollToNewItem";
import loader from "../../image/loader.gif"


const AllProducts = () => {

  const [displayLimit, setDisplayLimit] = useState(9);
  const [searchInput, setSearchInput ] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("")
  const [filteredProducts, setFilteredProducts] = useState([]);
  const productsRef = useRef([])

  const { products,resetPagination, handleLoadMore,loadMore,loading} = useFetch({searchTerm: debouncedSearchTerm});

  const { triggerScroll } = useScrollToNeWItem(productsRef, 80);

 
  useEffect(() => {
    handleLoadMore()
    resetPagination()
    setDisplayLimit(9)
  
  },[])

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchInput)
    }, 500);

    return (() => clearTimeout(timer))
    
  },[searchInput])

  useEffect(()=> {
    console.log("Products:", products);
    console.log("Loading:", loading);
   
    const filtered = products.filter((item) => item.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()));
 
    setFilteredProducts(filtered)
  },[debouncedSearchTerm, products])

  const loadMoreProducts = () => {
    const firstNewIndex = filteredProducts.length
    setDisplayLimit((prev) => prev + 9);
    handleLoadMore();
    
    triggerScroll(firstNewIndex);
  
  }

  const handleSearch = (e) => {
   
         setSearchInput(e.target.value);
      
      }

  return ( 
     <Container>
      <Title>All Products</Title>
      <InputSearch 
        placeholder="Search Product..."
        value={searchInput}  
        onChange={handleSearch}/>

         <Wrapper>
        {loading  ? (
          <div className="loading">
            <img src={loader} alt="loader" />
          </div>
        ) : filteredProducts.length > 0  ? (
          filteredProducts.slice(0, displayLimit).map((item,index) => (
           
             <Product
               key={item._id}   
               item={item} 
               ref={(el) => 
                 (productsRef.current[index] = el)}/>
            
          ))
        ) : (
          <NoProducts>No Products</NoProducts>
        )}
      </Wrapper>
   
      {  loadMore && !loading && 
         (<button type="button" onClick={loadMoreProducts}>Load More</button>) }
     </Container>
   
   );
}
 
export default AllProducts;

const Container = styled.section`
  position: relative;
  text-align: center;
  padding: 60px 0 70px 0;
  background-color:#fff;
`;
const InputSearch = styled.input`
  width: 250px;
  height: 25px;
  outline: none;
  padding: 0 7px;
  border: 2px solid #45C4B0;
  position: relative;
  margin-bottom: 50px;
`
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  max-width: 1280px;
  margin: 0 auto;
  flex-wrap: wrap;
  
   
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
const Title = styled.h1`
  margin-bottom: 30px;
  font-size: 30px;
  letter-spacing: 1px;
  color: #525454;
`;
const NoProducts = styled.h2`
  font-size: 27px;
  text-align: center;
  color: #525454;
  letter-spacing: 1px;
  padding: 65px 0;
`;
