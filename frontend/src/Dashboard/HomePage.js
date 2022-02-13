import React from "react";

import tweet from "./tweet.png";
import "../App.css";

import Carousel from "react-bootstrap/Carousel";

const HomePage = () => {
   return (
      <Carousel>
         <Carousel.Item>
            <img className="d-block w-100" src={tweet} alt="First slide" />
            <Carousel.Caption>
               <h3>First slide label</h3>
               <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
         </Carousel.Item>
         <Carousel.Item>
            <img className="d-block w-100" src={tweet} alt="Second slide" />

            <Carousel.Caption>
               <h3>Second slide label</h3>
               <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
         </Carousel.Item>
         <Carousel.Item>
            <img className="d-block w-100" src={tweet} alt="Third slide" />

            <Carousel.Caption>
               <h3>Third slide label</h3>
               <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
            </Carousel.Caption>
         </Carousel.Item>
      </Carousel>
      //   <div>
      //      <img src={tweet} className={"image"} alt="tweet" />
      //   </div>
   );
};

export default HomePage;
