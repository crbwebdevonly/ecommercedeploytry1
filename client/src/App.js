import "./app.scss";
import Homepage from "./pages/home_page/Homepage";
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SingleProductPage from "./pages/single_product_page/SingleProductPage";
import Checkoutpage from "./pages/checkout_page/Checkoutpage";
import Profilepage from "./pages/profile_page/Profilepage";
import Navbar from "./components/Navbar";
import AllProductsPage from "./pages/all_products_page/AllProductsPage";
import RegisterPage from "./pages/register_page/RegisterPage";
import LoginPage from "./pages/login_page/LoginPage";
import { useContext, useEffect } from "react";
import { UserContext } from "./context/UserContext";
import Errorpage from "./pages/errorpage/Errorpage";
import Footer from "./components/Footer";
import BasketModal from "./components/BasketModal";
import AdminPage from "./pages/admin/AdminPage";
import { AdminContextProvider } from "./context/AdminContext";
import MessagePopUp from "./components/MessagePopUp";
import { AppContext } from "./context/AppContext";
import AllProductAdmin from "./pages/admin/AllProductAdmin";
import LeftBar from "./pages/admin/LeftBar";
import EditProduct from "./pages/admin/EditProduct";
import Test1 from "./components/Test1";
import Test2 from "./components/Test2";
import AdminStats from "./pages/admin/AdminStats";
import CreateNewProduct from "./pages/admin/CreateNewProduct";
import AdminOrderList from "./pages/admin/AdminOrderList";
import { AllProductsAdmin_Container } from "./pages/admin/AllProductAdmin_style";
import AdminUserList from "./pages/admin/AdminUserList";
import AdminTest1 from "./pages/admin/AdminTest1";
import AdminCreateNewUser from "./pages/admin/AdminCreateNewUser";

//======================================================
//======================================================
//======================================================
//======================================================
//======================================================
//======================================================

function App() {
     //======================================================
     const { loggedInUser: user } = useContext(UserContext);
     //======================================================
     const { func_showPopUp, showPopUp } = useContext(AppContext);
     //======================================================

     console.log("showpop>>", showPopUp);
     //======================================================
     //======================================================
     // deletethis
     //======================================================

     //======================================================
     // deletethis
     //======================================================
     //======================================================
     useEffect(() => {
          // effect
          localStorage.setItem(
               "crbecommerce1_loggedInUser",
               JSON.stringify(user)
          );
          return () => {
               // cleanup
          };
     }, [user]);
     //======================================================
     //======================================================
     //======================================================
     //======================================================
     //======================================================
     return (
          <div className="App">
               <Router>
                    <Navbar />
                    <Routes>
                         <Route path="/" element={<Homepage />} />
                         <Route
                              path="/product/:id"
                              element={<SingleProductPage />}
                         />
                         <Route
                              path="/checkoutpage"
                              element={<Checkoutpage />}
                         />
                         <Route path="/profilepage" element={<Profilepage />} />
                         <Route
                              path="/allproductspage"
                              element={<AllProductsPage />}
                         />

                         <Route
                              path="/registerpage"
                              element={<RegisterPage />}
                         />
                         <Route path="/loginpage" element={<LoginPage />} />
                         <Route
                              path="/adminpage"
                              element={
                                   <AdminContextProvider>
                                        <AdminPage />
                                   </AdminContextProvider>
                              }
                         >
                              <Route path="" element={<AdminStats />}></Route>
                              <Route
                                   path="allproducts"
                                   element={<AllProductAdmin />}
                              ></Route>
                              <Route
                                   path="allproducts/editproduct/:id"
                                   element={<EditProduct />}
                              ></Route>
                              <Route
                                   path="createnewproduct"
                                   element={<CreateNewProduct />}
                              ></Route>
                              <Route
                                   path="allorders"
                                   element={<AdminOrderList />}
                              ></Route>
                              <Route
                                   path="users"
                                   element={<AdminUserList />}
                              ></Route>
                              <Route
                                   path="users/createnewuser"
                                   element={<AdminCreateNewUser />}
                              ></Route>
                         </Route>
                         {/* <Route
                              path="/users"
                              element={<AdminUserList />}
                              // element={<AdminOrderList />}
                         ></Route> */}
                         <Route path="*" element={<Errorpage />} />
                    </Routes>
                    <Footer />
               </Router>
               {showPopUp && <MessagePopUp />}
          </div>
     );
}

export default App;
