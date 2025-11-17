
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import styled from "styled-components"
import { mobile, medium } from "../responsive"

const CategoryPage = () => {

 const imageUrl = decodeURIComponent(useParams().img)
 const [categoryImg, setCategoryImg] = useState(null);

  useEffect(() => {
    console.log("Image URL from path:", imageUrl);
    setCategoryImg(imageUrl)
  },[imageUrl])

  return ( 
      <ImgContainer>
        {
          categoryImg && (
            <ImgCategory src= {categoryImg} alt=""/>
          )
        } 
      </ImgContainer>
   );
}
 
export default CategoryPage;


const ImgContainer = styled.div`
  width: 1280px;
  margin: 0 auto;
  height: 330px;
  position: relative; 

    ${mobile(
        {
          width: "95%",
          height: "60%"
        }
        )}
        ${medium(
        {
          width: "92%"
        }
        )}
`;
const ImgCategory = styled.img`
  width: 100%;
  height: 100%;
  margin-top: 50px;
  background-repeat: no-repeat;
  background-position: right 30% bottom 55%;
  -webkit-background-position: right 30% bottom 55%;
  -moz-background-position: right 20% bottom 75%;
  -webkit-background-size:cover;
  background-size:cover;
  -moz-background-size:cover;
  -moz-background-size:cover;
  -o-background-size: cover;
  background-size: cover;
  -moz-image-resolution: snap;

  box-shadow: 0px 0px 13px -3px rgba(0,0,0,0.96);
 -webkit-box-shadow: 0px 0px 13px -3px rgba(0,0,0,0.96);
 -moz-box-shadow: 0px 0px 13px -3px rgba(0,0,0,0.96);              
`;

 
  