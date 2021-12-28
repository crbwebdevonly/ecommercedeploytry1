import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BasketContext } from "../context/BasketContext";
import { UserContext } from "../context/UserContext";
import BasketModal from "./BasketModal";
import "./Navbar.scss";

const Navbar = () => {
     //======================================================
     // const user = false;
     const [showMobileMenu, setShowMobileMenu] = useState(false);
     // const [menuClassName]
     //======================================================
     const nav = useNavigate();
     //======================================================
     const userContext = useContext(UserContext);
     //======================================================
     // console.log(userContext);
     const { loggedInUser: user, doLogIn, doLogOut } = userContext;
     //======================================================
     //======================================================
     const {
          basketItems,
          addToBasket,
          removeFromBasket,
          toggleBasketModal,
          showBasketModal,
          totalItems,
     } = useContext(BasketContext);
     //======================================================

     //======================================================

     //======================================================
     useEffect(() => {
          // effect
          const handleResize = () => {
               // console.log(window.innerWidth);
               // const screenWidth = window.innerWidth;
               setShowMobileMenu(false);
          };
          //
          window.addEventListener("resize", handleResize);
          return () => {
               // cleanup
               window.removeEventListener("resize", handleResize);
          };
     }, []);
     //======================================================

     //======================================================

     //======================================================
     return (
          <div className="navbar-container">
               <div className="left">
                    <div
                         className="bars"
                         onClick={() => {
                              setShowMobileMenu(true);
                         }}
                    >
                         <i class="fas fa-bars"></i>
                    </div>
                    <Link to="/" className="link">
                         <div className="logo">
                              crb
                              <span>e</span>
                              commerce1
                         </div>
                    </Link>
               </div>
               <div className="center">
                    <ul className="desktop-menu-list">
                         <li className="menu-list-item">
                              {" "}
                              <Link to="/allproductspage" className="link">
                                   Products
                              </Link>
                         </li>
                         {/* <li className="menu-list-item">
                              <Link to="/" className="link">
                                   Home
                              </Link>
                         </li> */}
                         <li className="menu-list-item">categories</li>

                         {user?.isAdmin && (
                              <li className="menu-list-item">
                                   <Link to={"/adminpage"} className="link">
                                        Admin
                                   </Link>
                              </li>
                         )}
                    </ul>
                    {showMobileMenu && (
                         <ul className="mobile-menu-list">
                              <div
                                   className="close"
                                   onClick={() => {
                                        setShowMobileMenu(false);
                                   }}
                              >
                                   <i class="fas fa-times"></i>
                              </div>
                              <Link
                                   to="/"
                                   onClick={() => {
                                        setShowMobileMenu(false);
                                   }}
                                   className="link"
                              >
                                   <li className="menu-list-item">Home</li>
                              </Link>

                              <li className="menu-list-item">
                                   {" "}
                                   <Link
                                        to="/allproductspage"
                                        onClick={() => {
                                             setShowMobileMenu(false);
                                        }}
                                        className="link"
                                   >
                                        products
                                   </Link>
                              </li>

                              <li className="menu-list-item">categories</li>
                              <li className="menu-list-item">categories</li>
                              <li className="menu-list-item">categories</li>
                         </ul>
                    )}
               </div>
               <div className="right">
                    <div className="user-wrap">
                         {!user && (
                              <div className="login-wrap">
                                   <div className="login">
                                        <Link to="/loginpage" className="link">
                                             Login
                                        </Link>
                                   </div>
                                   <div className="register">
                                        <Link
                                             to="/registerpage"
                                             className="link"
                                        >
                                             Register
                                        </Link>
                                   </div>
                              </div>
                         )}
                         {user && (
                              <>
                                   <div className="profile-wrap">
                                        <Link
                                             to="/profilepage"
                                             className="link"
                                        >
                                             <div className="wrap-p1">
                                                  <div className="name">
                                                       {user.username}
                                                  </div>
                                                  <div className="profile-pic">
                                                       <i class="fas fa-user-circle"></i>
                                                  </div>
                                             </div>
                                        </Link>
                                        <div
                                             className="logout"
                                             onClick={() => {
                                                  doLogOut();
                                             }}
                                        >
                                             Logout
                                        </div>
                                   </div>
                              </>
                         )}
                    </div>
                    <div className="checkout">
                         {/* <Link to="/checkoutpage" className="link"> */}
                         <i
                              class="fas fa-shopping-basket"
                              onClick={() => {
                                   toggleBasketModal();
                              }}
                         ></i>
                         {/* </Link> */}

                         {totalItems > 0 && (
                              <div className="count">{totalItems}</div>
                         )}

                         {showBasketModal && <BasketModal />}
                    </div>
               </div>
          </div>
     );
};

export default Navbar;
