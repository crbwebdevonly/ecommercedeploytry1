import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./FeaturedProducts.scss";

const FeaturedProducts = () => {
     //======================================================
     const sliderTrackRef = useRef();
     //======================================================
     const [count, setCount] = useState(0);
     //======================================================
     // const category = ["category1", "category2", "category/3"];
     //======================================================
     // useEffect(() => {
     //      // effect
     //      sliderTrackRef.style({"transform":translateX})
     //      return () => {
     //           // cleanup
     //      }
     // }, [count])
     //======================================================
     useEffect(() => {
          // effect
          const myInterval = setInterval(() => {
               setCount((p) => {
                    if (p === 2) return 0;
                    else return p + 1;
               });
          }, 10000);
          return () => {
               // cleanup
               clearInterval(myInterval);
          };
     }, []);
     //======================================================
     // console.log("c", count);
     //======================================================
     //======================================================
     //======================================================
     //======================================================
     //======================================================
     return (
          <div className="featured-products-container">
               {/* <h1>featured</h1> */}
               <div className="slider-container">
                    <Link to={`/products/category/${[count]}`}>
                         <div
                              className="slide-track"
                              ref={sliderTrackRef}
                              style={{
                                   transform: `translateX(-${count * 100}%)`,
                              }}
                         >
                              <img
                                   src="https://picsum.photos/1400/800"
                                   alt=""
                              />
                              <img
                                   src="https://picsum.photos/1400/700"
                                   alt=""
                              />
                              <img
                                   src="https://picsum.photos/1400/600"
                                   alt=""
                              />
                         </div>
                         <div className="offer-wrap">
                              <div className="message">
                                   20% off
                                   <span>Today ONLY</span>
                              </div>
                         </div>
                    </Link>
                    <i
                         className="fas fa-arrow-circle-left"
                         onClick={() => setCount((p) => (p > 1 ? 2 : p + 1))}
                    ></i>
                    <i
                         className="fas fa-arrow-circle-right"
                         onClick={() => setCount((p) => (p < 1 ? 0 : p - 1))}
                         // style={{ color: "blue" }}
                    ></i>
               </div>
          </div>
     );
};

export default FeaturedProducts;
