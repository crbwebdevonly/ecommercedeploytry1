import React, { useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import { AdminContext, AdminContextProvider } from "../../context/AdminContext";
import { UserContext } from "../../context/UserContext";
import AllProductsPage from "../all_products_page/AllProductsPage";
import "./AdminPage.scss";
import AllProductAdmin from "./AllProductAdmin";
import CreateNewProduct from "./CreateNewProduct";
import EditProduct from "./EditProduct";
import LeftBar from "./LeftBar";

//======================================================
//======================================================
//======================================================
//======================================================
//======================================================
//======================================================
//======================================================
const AdminPage = () => {
     //======================================================
     const { loggedInUser: user } = useContext(UserContext);
     // const [user, setUser] = useState(
     //      JSON.parse(localStorage.getItem("crbecommerce1_loggedInUser"))
     // );
     //======================================================
     const { page, editMode } = useContext(AdminContext);
     //======================================================
     //======================================================
     const nav = useNavigate();
     //======================================================
     useEffect(() => {
          // effect

          !user?.isAdmin && nav("/");

          return () => {
               // cleanup
          };
     }, [user]);
     //======================================================
     // console.log("userADMIN>>", user);

     //======================================================
     //======================================================
     //======================================================
     const showComponent = (arg) => {};
     //======================================================
     //======================================================
     //======================================================
     //======================================================
     //======================================================
     //======================================================
     //======================================================
     return (
          <div className="admin-page-container">
               <h1 className="h1 text-capitalize"> admin page</h1>
               {true && (
                    <div className="wrap">
                         <div className="left">
                              {" "}
                              <LeftBar />
                         </div>
                         <div className="right">
                              <Outlet />
                         </div>
                    </div>
               )}
          </div>
     );
};

export default AdminPage;
