import React from "react";
import styled from "styled-components";
import { mobile} from "../responsive";
import { useState, useEffect, useCallback, useMemo } from "react"
import { publicRequest } from "../axiosMethod";
import { useNavigate } from "react-router-dom";
import  useClickedOutside from "../hooks/useClickedOutside"

const ResultItem = React.memo(({ product, onClick}) => {
   console.log("🟢 Renderujem product:", product.title);
   return (
    <ItemContainer onClick={() => onClick(product.id)}>
      <img src={product.img} alt={product.title} />
      <span>{product.title}</span>
    </ItemContainer>
   );
});

const SearchBar = () => {
  
  const [query, setQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenNotFound, setIsOpenNotFound] = useState(false)
  const [loading , setLoading] = useState(false)
  const navigate = useNavigate();

  const ref = useClickedOutside(() => setIsOpen(false))


  useEffect(() => {
    
    const handleSearch = async() => {
     
     if(query.length > 2) { 
        setSearchResult([])
     }
    
     if(!query.trim()) { 
     
      return;
    }
   
       try {
        setLoading(true)
          const response = await publicRequest.get(`products/search?q=${query}`);
         
          setSearchResult(response.data);
          console.log(response.data)
       } catch (err) {
        console.error("Error fetching search results", err);
      
       }
       finally {
        setLoading(false)
        setIsOpenNotFound(true)
       }
  };

  const debounceFetch = setTimeout( handleSearch, 500 );
 
  return () => clearTimeout(debounceFetch);
  
},[query])

  const handleInputChange = useCallback((e) => {
   
    const value = e.target.value
    setQuery(value)
    setIsOpen(value.length > 0);
    setIsOpenNotFound(false)
  },[])
  
  const handleResultClick = useCallback((id) => {
     navigate(`/product/${id}`) 
     setQuery("");
     setSearchResult([])
  },[navigate]);

  const filteredResult = useMemo(() => {
    console.log("🟠 useMemo izračunava filteredResults...");
     return searchResult.filter(product => 
      product.title.toLowerCase().includes(query.toLowerCase())
     )
  },[searchResult, query])
 

  return ( 
    <>
      { isOpen &&  filteredResult.length > 0 && (<div className="overlay" onClick={() => setIsOpen(false)}></div>)}
    
      <SearchContainer ref={ref}>
       <Input 
        placeholder="Search..."
        value={query}   
        onChange={handleInputChange}/>
       
        {isOpen && filteredResult.length > 0 
        ? (
           <ResultsContainer>
            {filteredResult.map((product) => (
            <ResultItem 
              key={product.id} 
              product={product}
              onClick={handleResultClick}
              /> 
           ))} 
          </ResultsContainer>
       ):(loading && 
           <LoadingResultContainer>
             LOADING...
           </LoadingResultContainer>
          )}
    
       { isOpenNotFound && !loading && filteredResult.length === 0 && (<div className= "results-not-found">
              Product is not found
          </div>) }   
    </SearchContainer>
  </>
)}  
 
export default SearchBar;

const SearchContainer = styled.div`
   position: relative;
   width: 100%;
`;
const Input = styled.input `
  width: 350px;
  height: 23px;
  outline: none;
  border: 2px solid #9AEBA3;
  position: relative;
  z-index: 20;
  ${mobile(
        {
          height: "20px",
          width: "122px",
          margin: "5px",
          
        }
        )}
`;
const LoadingResultContainer = styled.div`
   position: absolute;
   background: white;
   border: 1px solid #ddd;
   z-index: 100;
`
const ResultsContainer = styled.div`
   position: absolute;
   background: white;
   border: 1px solid #ddd;
  // max-width: 356px;

   width: 100%;
   max-height: 250px;
   overflow-y: auto;
   width: 100%;
   z-index: 10;
`;
const ItemContainer = styled.div`
   display: flex;
   align-items: center;
   padding: 5px 10px;
   cursor: pointer;
   &:hover {
    background: #f0f0f0;
  }
  img {
    width: 40px;
    height: 40px;
    margin-right: 10px;
  }
  span {
    font-size: 14px;
  }
`;