import React from "react";
import { Link } from "react-router-dom";
import "./CategoryBar.scss";

const CategoryBar = () => {
     return (
          <div className="categorybar-container">
               <div className="card">
                    <Link to={"products/category/1"} className="link">
                         <div className="title">Category title</div>
                         <div className="image-wrap">
                              <img src="https://picsum.photos/800/600" alt="" />
                         </div>
                         <div className="desc-short">
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit. Repudiandae, tenetur?
                         </div>
                    </Link>
               </div>
               <div className="card">
                    <Link to={"products/category/2"} className="link">
                         <div className="title">Category title</div>
                         <div className="image-wrap">
                              <img src="https://picsum.photos/800/500" alt="" />
                         </div>
                         <div className="desc-short">
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit. Repudiandae, tenetur?
                         </div>
                    </Link>
               </div>
               <div className="card">
                    <Link to={"products/category/3"} className="link">
                         <div className="title">Category title</div>
                         <div className="image-wrap">
                              <img src="https://picsum.photos/800/400" alt="" />
                         </div>
                         <div className="desc-short">
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit. Repudiandae, tenetur?
                         </div>
                    </Link>
               </div>
          </div>
     );
};

export default CategoryBar;
