import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { MyAxios } from "../../axios/MyAxios";
import { AdminContext } from "../../context/AdminContext";
import { fakeProducts } from "../../fakeProducts";
import "./LeftBar.scss";

const LeftBar = () => {
     //======================================================
     //======================================================
     const { setPage, setEditMode } = useContext(AdminContext);
     //======================================================
     //======================================================
     // const location = useLocation().pathname.split("/")[2];
     // const location = useLocation().pathname;
     // console.log(location);
     //======================================================
     //======================================================
     const getAllProducts = async () => {
          try {
               const reply = MyAxios.get("/products", {
                    headers: {
                         crb_ecommerce1_token: JSON.parse(
                              localStorage.getItem("crbecommerce1_loggedInUser")
                         ).token,
                    },
               });
          } catch (error) {}
     };
     //======================================================
     //======================================================
     const createNewProduct = () => {};
     const uploadAllProducts = async () => {
          try {
               const reply = await MyAxios.post(
                    "/products/createnewproducts",
                    fakeProducts,
                    {
                         headers: {
                              crb_ecommerce1_token: JSON.parse(
                                   localStorage.getItem(
                                        "crbecommerce1_loggedInUser"
                                   )
                              ).token,
                         },
                    }
               );
          } catch (error) {}
     };
     //======================================================
     //======================================================
     //======================================================
     //======================================================
     //======================================================
     //======================================================
     //======================================================

     return (
          <div className="leftbar">
               <ul className="top">
                    <li className="item ">
                         <Link to="" className="link">
                              Stats
                         </Link>
                    </li>
                    <li className="item">
                         <Link to="allproducts" className="link">
                              All products
                         </Link>
                    </li>

                    <li className="item">
                         <Link to="createnewproduct" className="link">
                              create new product
                         </Link>
                    </li>

                    <li className="item">
                         <Link to="allorders" className="link">
                              Orders
                         </Link>
                    </li>
                    <li className="item">
                         <Link to="users" className="link">
                              Users
                         </Link>
                    </li>
               </ul>
          </div>
     );
};

export default LeftBar;
