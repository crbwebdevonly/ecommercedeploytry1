import React, { useContext, useEffect, useRef, useState } from "react";
import { FilterContext } from "../context/FilterContext";
import "./FilterBar.scss";
import PriceRange from "./PriceRange";

//======================================================
//======================================================
//======================================================
//======================================================
//======================================================
//======================================================
//======================================================
//======================================================
//======================================================
//======================================================
const FilterBar = () => {
     //======================================================
     //======================================================
     const { filterObj, setFilterObj } = useContext(FilterContext);
     //======================================================
     //======================================================
     // const [priceRange, setPriceRange] = useState({ low: 0, high: 100 });
     const [searchTerm, setSearchTerm] = useState(filterObj.searchTerm);
     const [sort, setSort] = useState(filterObj.sortSelect);
     const lowRef1 = useRef();
     const lowRef2 = useRef();
     const highRef1 = useRef();
     const highRef2 = useRef();
     //======================================================

     //======================================================
     //======================================================
     const [myFilterObj, setMyFilterObj] = useState({
          search: "",

          sort: "RHL",
     });
     //======================================================
     //======================================================
     // const handleChange = (e) => {
     //      setMyFilterObj({ ...myFilterObj, [e.target.name]: e.target.value });
     // };
     //======================================================
     //======================================================
     useEffect(() => {
          // effect
          setFilterObj({ ...filterObj, searchTerm });
          return () => {
               // cleanup
          };
     }, [searchTerm]);
     //======================================================
     useEffect(() => {
          // effect
          setFilterObj({ ...filterObj, sortSelect: sort });
          return () => {
               // cleanup
          };
     }, [sort]);
     //======================================================
     //======================================================
     //======================================================
     //======================================================
     //======================================================
     // console.log(myFilterObj);
     // console.log(priceRange);
     // console.log("contextfilter", filterObj);
     //======================================================
     return (
          <div className="filterbar-container">
               <div className="search-wrap">
                    <input
                         type="text"
                         placeholder="search here"
                         name="search"
                         value={filterObj.searchTerm}
                         onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <i className="fas fa-search"></i>
               </div>
               <div className="range-container">
                    <PriceRange />
               </div>
               <div className="select-wrap">
                    <label htmlFor="">Sort by</label>
                    <select
                         name="sort"
                         id=""
                         // defaultValue="RHL"
                         value={filterObj.sortSelect}
                         onChange={(e) => setSort(e.target.value)}
                    >
                         Sort by
                         {/* <option value="" disabled>
                              Sort by
                         </option> */}
                         <option value="PHL">Price High to low</option>
                         <option value="PLH">Price Low to high</option>
                         <option value="RHL">Ratings High to low</option>
                         <option value="RLH">Ratings Low to high</option>
                    </select>
               </div>
          </div>
     );
};

export default FilterBar;
