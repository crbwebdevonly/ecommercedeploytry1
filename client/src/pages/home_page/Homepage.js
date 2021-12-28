import React, { useEffect, useReducer, useState } from "react";
import { myaxiox2 } from "../../axios/MyAxios";
import CategoryBar from "../../components/CategoryBar";
import FeaturedProducts from "../../components/FeaturedProducts";
import Navbar from "../../components/Navbar";
import "./Homepage.scss";

const Homepage = () => {
     //======================================================
     //======================================================
     //======================================================
     //======================================================
     // useEffect(() => {
     //      // effect
     //      const getdata = async () => {
     //           const reply = await myaxiox2.get(
     //                "/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6"
     //           );
     //           console.log("houses>>", reply);
     //      };
     //      getdata();

     //      return () => {
     //           // cleanup
     //      };
     // }, []);
     //======================================================

     //======================================================
     return (
          <div>
               {/* <Navbar /> */}
               {/* <h1>home page</h1> */}
               <FeaturedProducts />
               <CategoryBar />
          </div>
     );
};

export default Homepage;
