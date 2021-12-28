import React, { useContext, useEffect, useRef, useState } from "react";
import { FilterContext } from "../context/FilterContext";
import "./PriceRange.scss";
const PriceRange = () => {
     //======================================================
     //======================================================
     const { filterObj, setFilterObj } = useContext(FilterContext);
     //======================================================
     //======================================================
     const [priceRange, setPriceRange] = useState({ low: 0, high: 100 });

     //======================================================
     //======================================================
     // const minSlideRef = useRef();
     // const maxSlideRef = useRef();
     //======================================================
     //======================================================
     const handleSlideChange = (dir, v) => {
          const gap = 20;
          if (dir === "min") {
               let minValue = v;
               // console.log("highis", priceRange.high, priceRange.high + gap);
               if (minValue < priceRange.high - gap) {
                    // console.log("case1");
                    if (minValue < 1) minValue = 0;
                    setPriceRange({
                         ...priceRange,
                         low: minValue,
                    });
               }
               if (minValue > priceRange.high - gap) {
                    // console.log("case2");
                    // if (minValue > 100) minValue = ;
                    minValue = priceRange.high - gap;
                    setPriceRange({
                         ...priceRange,
                         low: minValue,
                    });
               }
          }
          if (dir === "max") {
               // console.log(v);
               // let maxValue = maxSlideRef.current.value;
               let maxValue = v;

               if (maxValue >= priceRange.low + gap) {
                    if (maxValue <= gap) maxValue = gap;
                    if (maxValue > 99) maxValue = 100;
                    setPriceRange({
                         ...priceRange,
                         high: maxValue,
                    });
               }
               if (maxValue < priceRange.low + gap) {
                    maxValue = priceRange.low + gap;
                    if (maxValue <= gap) maxValue = gap;
                    if (maxValue > 99) maxValue = 100;
                    setPriceRange({
                         ...priceRange,
                         high: maxValue,
                    });
               }
          }
     };
     //======================================================
     // console.log(priceRange);
     //======================================================
     useEffect(() => {
          // effect
          setFilterObj({ ...filterObj, priceRange });
          return () => {
               // cleanup
          };
     }, [priceRange]);
     //======================================================
     return (
          <div className="price-range-container">
               <div className="title">Price Range</div>
               <div className="main-wrap">
                    <div className="range-container-1">
                         <div
                              className="track"
                              style={{
                                   background: ` linear-gradient(
                         90deg,
                         #CCCCFF ${priceRange.low}%,
                         #6495ED ${priceRange.low}% ${priceRange.high}%,
                         #CCCCFF ${priceRange.high}%
                    )`,
                              }}
                         ></div>
                         <input
                              type="range"
                              min="0"
                              max="100"
                              value={priceRange.low}
                              className="slide1"
                              // ref={minSlideRef}
                              onChange={(e) => {
                                   handleSlideChange(
                                        "min",
                                        parseInt(e.target.value)
                                   );
                              }}
                         />
                         <input
                              type="range"
                              min="0"
                              max="100"
                              value={priceRange.high}
                              className="slide2"
                              // ref={maxSlideRef}
                              onChange={(e) => {
                                   handleSlideChange(
                                        "max",
                                        parseInt(e.target.value)
                                   );
                              }}
                         />
                    </div>
               </div>
               <div className="values-wrap">
                    <div className="">
                         min-price: <span>{priceRange.low}</span>
                    </div>
                    <div className="">
                         max-price: <span>{priceRange.high}</span>
                    </div>
               </div>
          </div>
     );
};

export default PriceRange;
