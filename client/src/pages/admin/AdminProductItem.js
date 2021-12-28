import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MyAxios } from "../../axios/MyAxios";
import { AdminContext } from "../../context/AdminContext";
// import { BasketContext } from "../context/BasketContext";
import "./AdminProductItem.scss";

const AdminProductItem = ({ id, product }) => {
     //======================================================
     //======================================================
     // const { addToBasket } = useContext(BasketContext);
     //======================================================
     const { page, setPage, editMode, setEditMode, setRelodeTrigger } =
          useContext(AdminContext);
     //======================================================
     //======================================================
     //======================================================
     const handleDelete = async () => {
          const loggedInUser = JSON.parse(
               localStorage.getItem("crbecommerce1_loggedInUser")
          );
          const LoggedInUserToken = loggedInUser?.token || "crb blank";
          try {
               const reply = await MyAxios.delete("/products/" + id, {
                    headers: {
                         crb_ecommerce1_token: LoggedInUserToken,
                    },
               });
               // nav("/adminpage");
               // setPage("ALL_PRODUCTS");
               // setEditMode({ active: false, id: "" });
               setRelodeTrigger((p) => !p);
          } catch (error) {}
     };
     //======================================================
     //======================================================
     //======================================================

     //======================================================
     // const [product, setProduct] = useState(null);
     //======================================================
     // useEffect(() => {
     //      // effect
     //      const getProduct = async () => {
     //           const loggedInUser = JSON.parse(
     //                localStorage.getItem("crbecommerce1_loggedInUser")
     //           );
     //           const LoggedInUserToken = loggedInUser?.token || "crb blank";
     //           const reply = await MyAxios.get("/products/" + id, {
     //                headers: {
     //                     crb_ecommerce1_token: LoggedInUserToken,
     //                },
     //           });

     //           setProduct(reply.data);

     //           //
     //      };
     //      getProduct();
     //      return () => {
     //           // cleanup
     //      };
     // }, []);
     //======================================================
     //================
     //======================================================
     //======================================================
     // console.log(product);
     //======================================================
     if (!product) return <h1>Loading..............</h1>;
     else
          return (
               <div className="product-item-container">
                    {/* product item */}
                    {/* <Link to={`/product/${product._id}`} className="link"> */}
                    <div className="title">{product.title}</div>
                    <div className="image-wrap">
                         <img src={product.image} alt="" />
                    </div>
                    {/* <div className="desc">{product.description}</div> */}
                    <div className="wrap1">
                         <div className="rate">
                              {" "}
                              Ratings: {product.rating?.rate}
                         </div>
                         <div className="price">£ {product.price}</div>
                    </div>
                    <div className="wrap2">
                       
                         <Link to={`editproduct/${id}`} className="edit link">
                              Edit this product
                         </Link>
                        
                    </div>
               </div>
          );
};

export default AdminProductItem;
