import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { MyAxios, myaxiox2 } from "../../axios/MyAxios";
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
     const [category, setCategory] = useState("any");
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
                    `/products?page=${page}&itemsPerPage=${itemsPerPage}&sortPrice=${sortPrice}&category=${category}`,
                    {
                         // const reply = await MyAxios.get("/products", {
                         headers: {
                              crb_ecommerce1_token: LoggedInUserToken,
                         },
                    }
               );
               // console.log(reply.data);
               setProducts(reply.data.allProducts);
               setTotalPages(Math.ceil(reply.data.count / itemsPerPage));
          };
          //
          getProducts();

          return () => {
               // cleanup
          };
     }, [sortPrice, itemsPerPage, page, category]);
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
     useEffect(() => {
          // effect
          // products/get-all-products-categories
          const getCat = async () => {
               const reply = await myaxiox2.post(
                    "products/get-all-products-categories"
               );
               console.log(reply, "categories");
          };
          getCat();
          return () => {
               // cleanup
          };
     }, []);
     //======================================================
     //======================================================
     //======================================================
     const handleSortPriceChange = (e) => {
          setSortPrice(e.target.value);
     };
     //======================================================
     //======================================================
     //======================================================
     // console.log(
     //      totalPages,
     //      pageNumbersList,
     //      pageNumbersList[-1],
     //      "totalpages"
     // );
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
                              {/* <div className="col d-flex gap-2 align-items-center justify-content-end "> */}
                              <ul class="pagination " id="scroll-to-top">
                                   <div className="">Items per page</div>
                                   <select
                                        className="form-select w-auto form-select-sm  text-capitalize me-2 "
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
                                        <div class="page-link">Page</div>
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
                                        <button
                                             class="page-link btn-primary "
                                             onClick={() => {
                                                  console.log("sss");
                                                  setPage((p) =>
                                                       p <
                                                       pageNumbersList[
                                                            pageNumbersList.length -
                                                                 1
                                                       ]
                                                            ? p + 1
                                                            : p
                                                  );
                                             }}
                                        >
                                             Next
                                        </button>
                                   </li>
                              </ul>
                         </div>
                         <div className="col d-flex gap-2 align-items-center justify-content-end ">
                              Select Category
                              <select
                                   className="form-select w-auto form-select-sm  text-capitalize me-2 d-inline "
                                   name=""
                                   id=""
                                   value={category}
                                   onChange={(e) => {
                                        setCategory(e.target.value);
                                   }}
                                   // value={itemsPerPage}
                              >
                                   <option value="any">Any</option>
                                   <option value="electronics">
                                        Electronics
                                   </option>
                                   <option value="men">Men</option>
                                   <option value="women">women</option>
                                   <option value="jewelery">jewelery</option>
                              </select>
                         </div>
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
               <ul className="pagination">
                    <li class="page-item disabled">
                         <div class="page-link">Page</div>
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
                         <a
                              href="#scroll-to-top"
                              class="page-link btn-primary "
                              onClick={() => {
                                   console.log("sss");
                                   setPage((p) =>
                                        p <
                                        pageNumbersList[
                                             pageNumbersList.length - 1
                                        ]
                                             ? p + 1
                                             : p
                                   );
                              }}
                         >
                              Next
                         </a>
                    </li>
               </ul>
          </div>
     );
};

export default AllProductsPage;
