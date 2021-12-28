import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { MyAxios } from "../../axios/MyAxios";
import CategoryBar from "../../components/CategoryBar";
import FeaturedProducts from "../../components/FeaturedProducts";
import FilterBar from "../../components/FilterBar";
import PriceRange from "../../components/PriceRange";
import ProductItem from "../../components/ProductItem";
import { UserContext } from "../../context/UserContext";
import "./AllProductsPage.scss";

const AllProductsPage = () => {
     //======================================================
     const [products, setProducts] = useState([]);
     const nav = useNavigate();
     //======================================================
     //======================================================
     const [sortPrice, setSortPrice] = useState(1);
     //======================================================
     const [itemsPerPage, setItemsPerPage] = useState(5);
     const [totalPages, setTotalPages] = useState(5);
     const [pageNumbersList, setPageNumbersList] = useState([]);
     const [page, setPage] = useState(1);
     //======================================================
     //======================================================
     const { loggedInUser: user } = useContext(UserContext);

     //======================================================
     //======================================================
     useEffect(() => {
          // effect
          const getProducts = async () => {
               const loggedInUser = JSON.parse(
                    localStorage.getItem("crbecommerce1_loggedInUser")
               );
               const LoggedInUserToken = loggedInUser?.token || "crb blank";
               const reply = await MyAxios.get(
                    `/products?page=${page}&itemsPerPage=${itemsPerPage}&sortPrice=${sortPrice}`,
                    {
                         // const reply = await MyAxios.get("/products", {
                         headers: {
                              crb_ecommerce1_token: LoggedInUserToken,
                         },
                    }
               );
               console.log(reply.data);
               setProducts(reply.data.allProducts);
               setTotalPages(Math.ceil(reply.data.count / itemsPerPage));
          };
          //
          getProducts();

          return () => {
               // cleanup
          };
     }, [sortPrice, itemsPerPage, page]);
     //======================================================
     //======================================================
     useEffect(() => {
          // effect
          let numbers = [];
          let i = 1;
          while (i <= totalPages) {
               // console.log(i, "page");
               numbers.push(i);
               i = i + 1;
          }
          setPageNumbersList(numbers);
          setPage(1);
          return () => {
               // cleanup
          };
     }, [totalPages]);
     //======================================================
     //======================================================

     // effect
     //======================================================
     useEffect(() => {
          // effect
          if (!user) {
               nav("/");
          }
          return () => {
               // cleanup
          };
     }, [user, nav]);
     //======================================================
     //======================================================
     //======================================================
     const handleSortPriceChange = (e) => {
          setSortPrice(e.target.value);
     };
     //======================================================
     //======================================================
     //======================================================
     console.log(totalPages, pageNumbersList, "totalpages");
     //======================================================
     //======================================================
     return (
          <div>
               <h1>All products page</h1>
               {/* <pre>{JSON.stringify(products)}</pre> */}
               <CategoryBar />
               {/* <FilterBar /> */}
               <div className="container-fluid border p-2">
                    <div className="row">
                         <div className="col">
                              <ul class="pagination">
                                   Items per page
                                   <select
                                        className="form-select w-25 form-select-sm  text-capitalize "
                                        name=""
                                        id=""
                                        onChange={(e) => {
                                             setItemsPerPage(e.target.value);
                                        }}
                                        value={itemsPerPage}
                                   >
                                        <option value={5}>5</option>
                                        <option value={10}>10</option>
                                        <option value={15}>15</option>
                                   </select>
                                   <li class="page-item disabled">
                                        <a class="page-link">Previous</a>
                                   </li>
                                   {pageNumbersList.map((e) => (
                                        <li
                                             className={
                                                  e === page
                                                       ? "page-item active "
                                                       : "page-item"
                                             }
                                        >
                                             <div
                                                  className="page-link btn "
                                                  onClick={() => {
                                                       setPage(e);
                                                  }}
                                                  // style={{ background: "blue" }}
                                             >
                                                  {e}
                                             </div>
                                        </li>
                                   ))}
                                   <li class="page-item ">
                                        <a class="page-link " href="#">
                                             Next
                                        </a>
                                   </li>
                              </ul>
                         </div>
                         {/* <div className="col">item1</div> */}
                         <div className="col d-flex gap-2 align-items-center justify-content-end ">
                              {/* <span className="">select2 this</span> */}
                              Sort by
                              <select
                                   className="form-select w-50 text-capitalize "
                                   name=""
                                   id=""
                                   onChange={handleSortPriceChange}
                                   value={sortPrice}
                              >
                                   <option value={1}>price Low to High </option>
                                   <option value={-1}>price High to Low</option>
                              </select>
                         </div>
                    </div>
               </div>
               <div className="all-products-container">
                    {products.length > 0 &&
                         products.map((e) => <ProductItem product={e} />)}
               </div>
               {/*  */}

               {/*  */}
          </div>
     );
};

export default AllProductsPage;
