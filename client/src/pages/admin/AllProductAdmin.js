import React, { useContext, useEffect, useState } from "react";
import { MyAxios } from "../../axios/MyAxios";
import { AdminContext } from "../../context/AdminContext";
import { fakeProducts } from "../../fakeProducts";
import AdminProductItem from "./AdminProductItem";
import { AllProductsAdmin_Container } from "./AllProductAdmin_style";

// import {}

const AllProductAdmin = () => {
     //======================================================
     const [allProducts, setAllProducts] = useState([]);
     //======================================================
     const { relodeTrigger } = useContext(AdminContext);

     //======================================================
     useEffect(() => {
          // effect
          // console.log("run111");
          const getAllProducts = async () => {
               const loggedInUser = JSON.parse(
                    localStorage.getItem("crbecommerce1_loggedInUser")
               );
               const LoggedInUserToken = loggedInUser?.token || "crb blank";
               const reply = await MyAxios.get("/products", {
                    headers: {
                         crb_ecommerce1_token: LoggedInUserToken,
                    },
               });
               console.log(reply, "all-products");

               setAllProducts(reply.data.allProducts);

               //
          };
          getAllProducts();
          return () => {
               // cleanup
          };
     }, [relodeTrigger]);
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
     //======================================================
     return (
          <AllProductsAdmin_Container>
               {allProducts.map((p, i) => (
                    <AdminProductItem product={p} id={p._id} key={i} />
               ))}
          </AllProductsAdmin_Container>
     );
};

export default AllProductAdmin;
