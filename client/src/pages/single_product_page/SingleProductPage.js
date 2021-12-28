import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { MyAxios } from "../../axios/MyAxios";
import { BasketContext } from "../../context/BasketContext";
import "./SingleProductPage.scss";

const SingleProductPage = () => {
     //======================================================
     const [product, setProduct] = useState(null);
     //======================================================
     const { id } = useParams();
     //======================================================
     const { addToBasket } = useContext(BasketContext);
     //======================================================
     //======================================================
     //======================================================
     //======================================================
     useEffect(() => {
          // effect
          const getProduct = async () => {
               try {
                    const loggedInUser = JSON.parse(
                         localStorage.getItem("crbecommerce1_loggedInUser")
                    );
                    const LoggedInUserToken =
                         loggedInUser?.token || "crb blank";
                    const reply = await MyAxios.get(`/products/${id}`, {
                         headers: {
                              crb_ecommerce1_token: LoggedInUserToken,
                         },
                    });
                    // console.log(reply);
                    setProduct(reply.data);
               } catch (error) {}
          };
          //
          getProduct();
          return () => {
               // cleanup
          };
     }, [id]);
     //======================================================
     //======================================================
     //======================================================
     //======================================================
     //======================================================
     //======================================================
     //======================================================
     //======================================================
     //======================================================
     console.log(id);
     //======================================================
     return (
          <div className="single-product-page-container">
               <h1>SingleProductPage</h1>
               {!product && <h1>...loading product</h1>}
               {product && (
                    <div className="product-wrap">
                         <div className="title">{product.title}</div>
                         <div className="image-wrap">
                              <img src={product.image} alt="" />
                         </div>
                         <div className="desc">{product.description}</div>
                         <div className="wrap1">
                              <div className="rate">
                                   {" "}
                                   Ratings: {product.rating.rate}
                              </div>
                              <div className="price">£ {product.price}</div>
                         </div>
                         <div
                              className="add"
                              onClick={() => {
                                   addToBasket(product);
                              }}
                         >
                              Add To Cart
                         </div>
                    </div>
               )}
          </div>
     );
};

export default SingleProductPage;
