import React from "react";

import tweet from "./tweet.png";
import map from "./map.png";
import weatherAndNews from "./weatherAndNews.png";
import { Link } from "react-router-dom";

import "../App.css";
import Carousel from "react-bootstrap/Carousel";

const HomePage = () => {
   const goToSignUp = () => {};
   return (
      <>
         <Carousel>
            <Carousel.Item>
               <img className="d-block w-100 h100" src={tweet} alt="First slide" />
               <Carousel.Caption>
                  <h3
                     style={{
                        color: "white",
                        fontSize: "5em",
                        marginBottom: "7%",
                     }}
                  >
                     This website does just that!
                  </h3>
                  {/* <p style={{ fontSize: "3em", marginBottom: "8.5%" }}>
                  This website fulfills the need of keeping up to date with your team
                  members
               </p> */}
               </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
               <img className="d-block w-100" src={map} alt="Second slide" />

               <Carousel.Caption>
                  <h3
                     style={{
                        //  color: "white",
                        fontSize: "5em",
                        marginBottom: "7%",
                     }}
                  >
                     By utilizing a map view
                  </h3>
               </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
               <img className="d-block w-100" src={weatherAndNews} alt="Third slide" />

               <Carousel.Caption>
                  <h3
                     style={{
                        //  color: "white",
                        fontSize: "5em",
                        marginBottom: "7%",
                     }}
                  >
                     Showing you real time weather reports AND real time news reports
                  </h3>
               </Carousel.Caption>
            </Carousel.Item>
         </Carousel>
         <div
            style={{
               marginTop: "1.6%",
               display: "flex",
               justifyContent: "space-evenly",
               //    position: "absolute",
            }}
         >
            <button
               className="button"
               style={{ backgroundColor: "black", color: "white", padding: "1%" }}
               onClick={() => goToSignUp()}
            >
               <Link
                  className="button"
                  style={{
                     color: "white",
                  }}
                  to="/signup"
               >
                  Sign Up
               </Link>
            </button>
            <button
               className="button"
               style={{ backgroundColor: "black", color: "white", padding: "1%" }}
               onClick={() => goToSignUp()}
            >
               <Link
                  className="button"
                  style={{
                     color: "white",
                  }}
                  to="/login"
               >
                  Log In
               </Link>
            </button>
         </div>
      </>
   );
};

export default HomePage;
