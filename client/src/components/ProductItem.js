import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { BasketContext } from "../context/BasketContext";
import "./ProductItem.scss";

const ProductItem = ({ product }) => {
     //======================================================
     //======================================================
     const { addToBasket } = useContext(BasketContext);
     //======================================================
     //======================================================
     //======================================================
     // console.log(product);
     //======================================================
     return (
          <div className="product-item-container">
               {/* product item */}
               <Link to={`/product/${product._id}`} className="link">
                    <div className="title">{product.title}</div>
                    <div className="text-secondary">
                         category: {product.category}
                    </div>
                    <div className="image-wrap">
                         <img src={product.image} alt="" />
                    </div>
                    {/* <div className="desc">{product.description}</div> */}
                    <div className="wrap1">
                         <div className="rate">
                              {" "}
                              Ratings: {product?.rating?.rate}
                         </div>
                         <div className="price">£ {product.price}</div>
                    </div>{" "}
               </Link>
               <div
                    className="add"
                    onClick={() => {
                         addToBasket(product);
                    }}
               >
                    Add To Cart
               </div>
          </div>
     );
};

export default ProductItem;
