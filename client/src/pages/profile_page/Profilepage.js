import React from "react";
import "./Profilepage.scss";

const Profilepage = () => {
     return (
          <div className="profilepage-container">
               <h1>profile page</h1>
               <div className="image-wrap">
                    <img src="https://picsum.photos/800/600" alt="" />
               </div>
               <div className="info-wrap">
                    <div className="name">name</div>
                    <div className="desc">desc</div>
               </div>
          </div>
     );
};

export default Profilepage;
