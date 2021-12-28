import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const Errorpage = () => {
     //======================================================
     const nav = useNavigate();
     const [count, setCount] = useState(3);
     //======================================================
     // useEffect(() => {
     //      // effect
     //      setTimeout(() => {
     //           nav("/");
     //      }, 3000);
     //      return () => {
     //           // cleanup
     //      };
     // }, []);
     //======================================================
     //======================================================
     useEffect(() => {
          // effect
          const interval = setInterval(() => {
               setCount((p) => (p > 0 ? p - 1 : 0));
          }, 1000);
          return () => {
               // cleanup
               clearInterval(interval);
          };
     }, []);
     //======================================================
     useEffect(() => {
          // effect
          if (count < 1) nav("/");
          return () => {
               // cleanup
          };
     }, [count, nav]);
     //======================================================

     return (
          <div>
               <h1>Error: Page NOT Found</h1>
               <h2>Redirecting is {count}</h2>
          </div>
     );
};

export default Errorpage;
