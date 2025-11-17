import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import styled from "styled-components";
import { addToCart } from "../../redux/cartRedux";
import { mobile, medium } from "../../responsive";
import { useDispatch, useSelector } from "react-redux";
import useToaster from "../../hooks/useToaster";
import useFetch from "../../hooks/useFetch";
import SimilarProducts from "../../components/SimilarProducts";
import loader from "../../image/loader.gif";

const SingleProduct = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [selectedSize, setSelectedSize] = useState("");
  const [availableSize, setAvailableSize] = useState([]);
  const [amount, setAmount] = useState(1);

  const dispatch = useDispatch();
  const toaster = useToaster();

  const currentUser = useSelector((state) => state.auth.currentUser);
  const cart = useSelector((state) => state.cart); 
 
  const { product, loading} = useFetch({single: id, userIdRecoman: currentUser?._id});

  useEffect(() => {
    if (product && Array.isArray(product.sizes)) {
      setAvailableSize(product.sizes);
    }
  }, [product]);

    if (loading) {
        return (
            <div className="loading">
              <img src={loader} alt="loader" />
            </div>
          )
  }

  const totalPrice = product?.price ? product.price * amount : 0;
  const totalPriceDiscount = product?.discountedPrice
    ? product?.discountedPrice * amount
    : 0;


  const handleSizeChange = (e) => {
    setSelectedSize(e.target.value);
 
  };

  const handleAmount = (counter) => {
    if (counter === "dec") {
      setAmount((prev) => (prev > 1 ? prev - 1 : prev));
      return
    }
      setAmount((prev) => prev + 1);
  
  };

  const handleSubmit = () => {
    if (!product.inStock) {
      toaster.showInfo("Product Out Of Stock");
      return;
    }
    if (!selectedSize) {
      toaster.showInfo("Select the product size");
      return;
    }

    toaster.showSuccess("Product added to cart", 1300);
   

  const cartItem = {
    productId: id,
    size: selectedSize,
    price: product.price,
    title: product.title,
    amount,
    img: product.img,
    categories: product.categories,
    color: product.color,
    discounts: product.discounts,
    discountedPrice: product.discountedPrice,
    originalPrice: product.originalPrice,
  };

  dispatch(addToCart(cartItem));

  const userId = currentUser?._id || "guest"

  if (userId) {
      addToCart(dispatch, userId, cartItem)
    }
  };

  return (
    <Container>
      <Wrapper>
        <ImgContainer>
          {product?.newProd && <div className="new-product">NEW</div>} 
          {!product?.inStock && <div className="out-stock-product">Out of Stock</div>}
          {product?.discounts ? (
            <div className="discount-product">
               {`Discount -${product?.discounts}%`}
            </div>
          ) : ""}
          <Image src={product?.img} alt={product?.title} />
        </ImgContainer>

        <InfoContainer>
          <Title>{product?.title}</Title>
          <Desc>{product?.desc}</Desc>
          {product?.discounts ? (
            <>
              <OriginalPrice>${product.originalPrice?.toFixed(2)}</OriginalPrice>
              <DiscPrice>${totalPriceDiscount.toFixed(2)}</DiscPrice>
            </>
          ) : (
            <Price>${totalPrice.toFixed(2)}</Price>
          )}

          <FilterContainer>
            <Filter>
              <FilterTitle>Color</FilterTitle>
              {product?.color?.map((c, index) => (
                <FilterColor color={c} key={index} />
              ))}
            </Filter>

            <Filter>
              <FilterTitle>Size</FilterTitle>
              { product?.inStock ? (
                <FilterSize value={selectedSize} onChange={handleSizeChange}>
                  <FilterOption value="">Size</FilterOption>
                  {availableSize.map((size, index) => (
                    <FilterOption value={size} key={index} >
                      {size.toUpperCase()}
                    </FilterOption>
                  ))}
                </FilterSize>
              ) : (
                <FilterSize disabled>
                  <FilterOption value="">Size</FilterOption>
                </FilterSize>
              )}
            </Filter>
          </FilterContainer>

          <QuantityContainer>
            <Minus onClick={() => handleAmount("dec")}>-</Minus>
            <Quantity>{amount}</Quantity>
            <Plus onClick={() => handleAmount("inc")}>+</Plus>
          </QuantityContainer>

          <AdToCart onClick={handleSubmit}>ADD TO CART</AdToCart>
        </InfoContainer>
         
      </Wrapper>
   {product && <SimilarProducts productId={product._id} />}
     
    </Container>
  );
};

export default SingleProduct;


const Container = styled.section`
  background-color:#dcdcdc;

  
  ${mobile(
    {
      height: "100%",   
    }
    )}
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 1280px;
  margin: 0 auto;
  padding: 55px 0;
  flex-wrap: wrap;
  background-color:#dcdcdc;

  ${mobile(
    {
      width: "92%",
      margin: "0 auto",
      flexDirection: "column",
    }
    )}
  ${medium(
    {
      width: "95%"
      
    }
    )}

`;
const ImgContainer = styled.div`
  position: relative;
  box-shadow: 0px 0px 6px -8px rgba(0,0,0,0.67);
  -webkit-box-shadow: 0px 0px 8px -4px rgba(0,0,0,0.58);
  -moz-box-shadow: 0px 0px 6px -8px rgba(0,0,0,0.67);
  border-radius: 5px;
  height: 650px;
  padding: 20px;
  object-fit: cover;
  flex: 1;
  background-color: #ffff;
  margin-top: 40px;
  

  ${mobile(
    {
      width: "92vw",
      padding: "20px 0 20px 0px",
      height: "50vh",  
    }
    )}
  ${medium(
    {
      width: "100%",
      height: "450px",
      padding: "20px"
    }
    )}
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;

  ${medium(
    {
      width: "95%",
      objectFit: "cover" 
    }
    )}

  ${mobile(
    {
      width: "95%",
       
    }
    )}
`;
const InfoContainer = styled.div`
  flex: 1;
  margin-left: 65px;
 
  ${mobile(
    {
      width: "100%",
      margin: "0 auto"  
    }
    )}

${medium(
    {
      marginLeft: "25px"
    }
    )}
    
`;
const Title = styled.h1`
  color: #525454;
  font-size: 30px;
  letter-spacing: 1px;
  padding-top: 40px;
`;
const Desc = styled.div`
  color: #525454;
  font-size: 17px;
  letter-spacing: 1px;

  ${mobile(
    {
      width: "95%",
     
    }
    )}
`;
const Price = styled.h2`
  color: #363737;
  font-size: 35px;
  font-weight: 600;
`;
const OriginalPrice = styled.h3`
  font-size: 35px;
  font-weight: 600;
  color: #2c2c2c;
  text-decoration-line: line-through;
    
`;
const DiscPrice = styled.h3`
  color: #f13434;
  font-size: 35px;
  font-weight: 600;
  margin-top: -40px;
`;
const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 50%;
  flex-wrap: wrap;

`;
const Filter = styled.div`
  display: flex;
  margin: 20px 30px 0 0;
`;
const FilterTitle = styled.div`
  font-size: 25px;
  color: #343232;
`;
const FilterColor = styled.div`
  width: 33px;
  height: 33px;
  background-color: ${props=> props.color};
  margin: 0 8px;
  cursor: pointer;
`;
const FilterSize = styled.select`
  position: relative;
  margin-left: 10px;
  width: 100px;
  padding: 5px 5px;
  font-size: 17px;
  letter-spacing: 1px;
  border: 2px solid #13678A; 
`;
const FilterOption = styled.option`
   font-size: 17px;
`;
const QuantityContainer = styled.div`
   margin-top: 30px;
   display: flex;
   font-size: 25px;
`;
const Minus = styled.button`
  font-size: 18px;
  padding: 4px 12px;
  border: none;
  border: 1px solid #343232;
  color: #343232;
  cursor: pointer;
`;
const Quantity = styled.span`
  margin: 0 10px;
  text-align: center;
  font-size: 25px;
  
`;
const Plus = styled.button`
  font-size: 18px;
  padding:  4px 9px;
  border: none;
  border: 1px solid #343232;
  color: #343232;
  cursor: pointer;
`;
const AdToCart = styled.button`
  padding: 10px 6px;
  margin-top: 15px;
  letter-spacing: 1px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  border: none;
  color: #012030;
  border: 2px solid #9AEBA3;
  background-color: #45C4B0; 
  display: block;
  transition: 0.2s ease-in-out;

   &:hover {
      transform: scale(1.03); 
      border: 2px solid #13678A;; 
   }  
`;
