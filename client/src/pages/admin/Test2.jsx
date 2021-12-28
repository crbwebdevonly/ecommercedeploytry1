import React from "react";
import style from "styled-components";

const Div1 = style.h1`
     
`
const Test2 = () => {
     return (
          <div>
               <h1 className="test">
                    <div className="test"></div>
                    <h1><h2 className="test"></h2></h1>
               </h1>
          </div>
     );
};

export default Test2;
