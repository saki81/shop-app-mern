import styled from "styled-components";
import { BsArrowLeft,BsArrowRight} from "react-icons/bs";
import { useState, useEffect} from "react";
import  {sliderItems} from "../data";
import {mobile, medium} from "../responsive";
import { Link } from "react-router-dom";


const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);
 
  const handleClick = (direction) => {
      
     if(direction === 'left') {
       setSlideIndex(slideIndex > 0  ?  slideIndex - 1 : sliderItems.length - 1);
       
     } else {
       setSlideIndex(slideIndex < sliderItems.length - 1 ? slideIndex + 1 : 0);
      
     }
    
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev < sliderItems.length - 1 ? prev + 1 : 0));
    }, 5000);
    return () => clearInterval(interval);
  },[])

  return ( 
    <Hero>
     <Container>
       <Arrow direction="left" onClick={() => handleClick("left")}>
         <BsArrowLeft style={{fontSize: "35px"}} />
       </Arrow>
       <Wrapper slideIndex={slideIndex}>
        {sliderItems.map((item) => ( 
        <Slide bg={item.bg} key={item.id}>
          
        <InfoContainer>
            <Title>
              {item.title}
            </Title>
            <Description>
              {item.desc}
            </Description>
            <Link to={`/allproducts`}>
              <GoToProducts>GO TO ALL PRODUCTS</GoToProducts>
            </Link>
         </InfoContainer>
         <ImageContainer>
           <Image src={item.img} />
         </ImageContainer>
        
        </Slide>
        
        ))}
        
       </Wrapper>
       <Arrow direction="right"  onClick={() => handleClick("right")}>
         <BsArrowRight style={{fontSize: "35px"}} />
       </Arrow>
     </Container>
     </Hero>
   );
}
 
export default Slider;

const Hero =styled.section`
  background: rgb(69, 196, 176);
  background: linear-gradient(90deg, rgba(69,196,176,1) 25%, rgba(154,235,163,1) 76%); 
`;
const Container = styled.div`
   max-width: 100vw;
   margin: 0 auto;
   height: 47vh;
   display: flex;
   padding-bottom: 100px;
   padding-top: 130px;
   margin-left: 200px;
   margin-right: 200px;
   justify-content: space-between;
   align-items: center;
   position: relative;
   overflow: hidden;
  

   ${mobile(
     {
      marginRight:"7px",
      marginLeft: "7px",
      height: "47vh",
      paddingBottom: "40px",
      paddingTop: "80px", 
     }
    )}
    ${medium(
     {
      marginRight:"50px",
      marginLeft: "50px",
      maxWidth: "100vw",
      
      height: "47vh",
      paddingBottom: "30px",
      paddingTop: "70px",
     }
    )}
`;
const Arrow = styled.div`
  background-color: transparent;
  padding: 3px 5px;
  border-radius: 50%;
  color: #012030;
  cursor: pointer;
  left: ${(props)=> (props.direction === "left") && "30px"};
  right: ${(props)=> (props.direction === "right") && "30px"};
  z-index: 2;
  position: absolute;

  ${mobile(
    {
      position: "absolute",
     marginLeft: "-30px",
     marginRight: "-30px",
    }
    )}
`;
const Wrapper = styled.div`
  display: flex;
  transition: all 1.2s ease-in-out;
  transform: translateX(${(props)=>props.slideIndex * -100}vw);
  box-shadow: 0px 0px 13px -3px rgba(0,0,0,0.56);
  -webkit-box-shadow: 0px 2px 12px -5px rgba(0,0,0,0.45);
  -moz-box-shadow: 0px 0px 13px -3px rgba(0,0,0,0.56);

  ${mobile(
     {
      transition: "0.6s ease-in-out",
      height: "45vh",
      
     },
     
  )}
`;
const Slide = styled.div`
  width: 100vw;
  height: 47vh;
  display: flex;
  align-items: center;
  background-color: #${(props)=>props.bg};
  

  ${mobile(
     {
      width: "100vw",
      height: "47vh", 
     }
    )}
    ${medium(
     {
      width: "100vw",
      height: "47vh",
      
     }
    )}
 
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  justify-content: end;
  align-items: center;
  flex: 0 0 30%;
 
 
  ${medium(
     {
      height: "47vh",
      flex: "0 0 45%",
     }
    )}
  ${mobile(
     {
      flex: "0 0 25%",
     }
    )}
  
`;
const Image = styled.img`
  width: 300px;
  height: 280px; 
  

  ${mobile(
    {
     width: "100px",
     height: "130px"
    }
    )}
    ${medium(
    {
     width: "270px",
     height: "250px",
    
    }
    )}
    
`;
const InfoContainer = styled.div`
   width: 100%;
   display: flex;
   align-items: center;
   flex-direction: column;
   text-align:center;
   max-height: 500px;
   flex: 0 0 35%;



   ${mobile(
    {
     width: "60%",
     maxHeight: "500px",
     flex: "0 0 58%",
   
    }
    )}
    ${medium(
    {
     maxHeight: "500px",
    }
    )}
  
`;
const Title = styled.h1`
  font-size: 25px;
  letter-spacing: 1px;
  color:#525454;
  text-align: left;
  ${medium(
    {
      fontSize: "22px",
    }
    )}
  ${mobile(
    {
      fontSize: "17px",
      textAlign: "center",
    }
    )}
`;
const Description = styled.p`
   color:#383838;
   margin-top: 0;
   width: 55%;
   text-align: center;

   ${medium(
    {
      fontSize: "14px",
    }
    )}
    ${mobile(
    {
      fontSize: "15px",
      textAlign: "center"
    }
    )}
`;
const GoToProducts = styled.button`
   padding: 10px 20px;
   letter-spacing: 1px;
   cursor: pointer;
   font-size: 14px;
   border: none;
   background-color:#45C4B0;
   border: 2px solid #012030;
   margin-top: 20px;

   ${medium(
    {
      fontSize: "13px",
      fontWeight: "500",
      
    }
    )}

   ${mobile(
    {
      fontSize: "14px",
      padding: "7px 15px",
      marginTop: "0",
    }
    )}
`;

