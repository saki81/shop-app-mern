import styled from "styled-components";
import Products from "../../components/Products";
import { mobile, medium } from "../../responsive";
import { useLocation } from "react-router";
import { useState} from "react";
import CategoryPage from "../../components/CategoryPage";
import useFetch from "../../hooks/useFetch";


const ProductList = () => {

  const location = useLocation();
  const cat = location.pathname.split("/")[2];

  const [sort, setSort] = useState("newest");
  const [selectedFilters, setSelectedFilters] = useState({
    selectShirts: "AllShirts",
    selectShoes: "AllShoes",
    selectJackets: "AllJackets",
    selectColor: "All",
    selectProduct: "AllProduct",
    selectGender : "AllGender"
  });

  const { products, loading, loadMore,  handleLoadMore,resetPagination, limit } = useFetch({
    cat,
    selectedFilters,
    latest: false,
    discounted: false,
  });

  
  const handleFilterChange = (filterName, filterValue) => {
    setSelectedFilters({
      ...selectedFilters,
      [filterName]: filterValue,
    });
   
  };

  
  const handleResetFilters = () => {
   
    setSelectedFilters({
      selectShirts: "AllShirts",
      selectShoes: "AllShoes",
      selectJackets: "AllJackets",
      selectColor: "All",
      selectProduct: "AllProduct",
      selectGender : "AllGender",

    });
    setSort("newest")
    resetPagination();

  };
  
  
 

  return (
    <Container>
      <CategoryPage/>
      <Wrapper>
      
      <Title>{cat}</Title>
      </Wrapper>
      <FilterContainer>
      
        <Filter>
          <WrappFilter>
        
          <FilterText>Filters: </FilterText>
          <ButtonFilter onClick={handleResetFilters}>
               RESET 
           </ButtonFilter>
          </WrappFilter>
          <Select
            name="color"
            value={selectedFilters.selectColor}
            onChange={(e) => handleFilterChange("selectColor", e.target.value)}
          >
            <Option value="All">All Colors</Option>
            <Option value="white">white</Option>
            <Option value="black">black</Option>
            <Option value="red">red</Option>
            <Option value="blue">blue</Option>
            <Option value="yellow">yellow</Option>
            <Option value="green">green</Option>
          </Select>
          {cat === "shoes" &&  (
           <>
            <Select
              name="size"
              value={selectedFilters.selectShoes}
              onChange={(e) => handleFilterChange("selectShoes", e.target.value)}
            >
              <Option value="AllShoes">All Sizes</Option>
              <Option value="37">37</Option>
              <Option value="38">38</Option>
              <Option value="39">39</Option>
              <Option value="40">40</Option>
              <Option value="41">41</Option>
              <Option value="42">42</Option>
              <Option value="43">43</Option>
              <Option value="44">44</Option>
              <Option value="45">45</Option>
            </Select>

            <Select 
              name="size" 
              value={selectedFilters.selectGender} 
              onChange={(e) => handleFilterChange("selectGender",e.target.value)}>
             <Option value="AllGender">Gender</Option>
             <Option value="men">Men</Option>
             <Option value="women">Women</Option>
             
            </Select>
           </>
          )}
          {cat  === "tshirt" && (
           <>
            <Select
              name="size"
              value={selectedFilters.selectShirts}
              onChange={(e) => handleFilterChange("selectShirts", e.target.value)}
            >
              <Option value="AllShirt">All Size</Option>
              <Option value="xs">XS</Option>
              <Option value="s">S</Option>
              <Option value="m">M</Option>
              <Option value="l">L</Option>
              <Option value="xl">XL</Option>
              <Option value="xxl">XXL</Option>
              <Option value="xxxl">XXXL</Option>
            </Select>

            <Select 
              name="size" 
              value={selectedFilters.selectGender} 
              onChange={(e) => handleFilterChange("selectGender",e.target.value)}>
              <Option value="AllGender">Gender</Option>
              <Option value="men">Men</Option>
              <Option value="women">Women</Option>
            </Select>
           </>
          )}
          {cat === "jackets" && (
           <>
            <Select
              name="size"
              value={selectedFilters.selectJackets}
              onChange={(e) => handleFilterChange("selectJackets", e.target.value)}
            >
              <Option value="AllJackets">All Size</Option>
              <Option value="xs">XS</Option>
              <Option value="s">S</Option>
              <Option value="m">M</Option>
              <Option value="l">L</Option>
              <Option value="xl">XL</Option>
              <Option value="xxl">XXL</Option>
              <Option value="xxxl">XXXL</Option>
            </Select>
            
            <Select 
              name="size" 
              value={selectedFilters.selectGender} 
              onChange={(e) => handleFilterChange("selectGender",e.target.value)}>
              <Option value="AllGender">Gender</Option>
              <Option value="men">Men</Option>
              <Option value="women">Women</Option>
            </Select>
           </> 
          )}
           {cat === 'men' && (
            
           <>
            <Select 
              name="size" 
              value={selectedFilters.selectProduct} 
              onChange={(e) => handleFilterChange("selectProduct",e.target.value)}>
             <Option value="AllProduct">All Product</Option>
             <Option value="jackets">Jackets</Option>
             <Option value="shoes">Shoes</Option>
             <Option value="tshirt">T-Shirt</Option>
           </Select>
             </>
          )}
          
        {cat === 'women' && (
          
          <>
            <Select 
              name="size" 
              value={selectedFilters.selectProduct} 
              onChange={(e) => handleFilterChange("selectProduct",e.target.value)}>
             <Option value="AllProduct">All Product</Option>
             <Option value="jackets">Jackets</Option>
             <Option value="shoes">Shoes</Option>
             <Option value="tshirt">T-Shirt</Option>
           </Select>
           
          </>
          
        )} 
          
           </Filter>
           
           <Filter>
             <FilterText>Sort Products: </FilterText>
             <Select name="sort" value={sort} onChange={(e) => setSort(e.target.value)}>
               <Option value="newest">Newest</Option>
               <Option value="asc">Price asc</Option>
               <Option value="desc">Price desc</Option>  
             </Select>
        </Filter>
        
        </FilterContainer>
        
        <Products  
               cat={cat} 
               sort={sort} 
               selectedFilters={selectedFilters}
               products={products}
               loading={loading}
               loadMore={loadMore}
               limit={limit}
               handleLoadMore={handleLoadMore} 
               resetPagination={resetPagination}
               handleResetFilters={handleResetFilters}
               />
                
        </Container>
        
        
        
        )
      }
  export default ProductList;



const Container = styled.section`
   padding-top: 30px;
  background-color: #fff;
`;
const Wrapper = styled.div`
   position: absolute;
   top: 20%;
   left: 45%;
   bottom: 50%;
`
const Title = styled.h2`
  text-align: center;
  color: #9AEBA3;
  letter-spacing: 2px;
  text-shadow: 2px 2px 2px black;
  text-transform: uppercase;
  font-size: 38px;
`
const FilterContainer = styled.div`
   display: flex;
   justify-content: space-between;
   max-width: 1280px;
   margin: 0 auto;

   ${mobile(
    {
      width: "97%",
      
    }
   )}

   ${medium(
    {
      width: "95%",
      margin: "0 auto"  
    }
   )}
`;
const WrappFilter = styled.div`
  display: flex;
`;
const Filter = styled.div`
   color: #525454;
   padding-top: 65px;
   ${mobile(
    {
      
    }
   )}
`;
const FilterText = styled.span`
   font-size: 22px;
   letter-spacing: 1px;
   display: block;
   margin-bottom: 12px;
   ${mobile(
    {
      fontSize: "16px" ,
      display: "inline-block"
    }
   )}
`;
const Select = styled.select`
   width: 140px;
   padding: 5px 5px;
   font-size: 17px;
   letter-spacing: 1px;
   border: 2px solid #13678A;
   margin-right: 10px;

   ${mobile(
    {
      width: "87px",
      display: "block",
      fontSize: "15px",
      width: "110px"
    }
   )}
`;
const Option = styled.option`
   font-size: 17px;

   ${mobile(
    {
      fontSize: "14px",
    }
   )}
`;
const ButtonFilter = styled.button`
  font-size: 13px;
  height: 28px;
  width: 53px;
  border: none;
 background:#9AEBA3;
 letter-spacing: 1px;
 margin-top: 4px;
 margin-left: 10px;
 border: 1px solid #13678A;
 cursor: pointer;

`;