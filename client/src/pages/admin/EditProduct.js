import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { MyAxios } from "../../axios/MyAxios";
import MessagePopUp from "../../components/MessagePopUp";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";
import { EditProduct_Container } from "./EditProduct_style";

const EditProduct = () => {
     //======================================================
     // const nav = useNavigate();
     // const { setPage, setEditMode } = useContext(AdminContext);

     //======================================================
     const id = useParams().id;
     // console.log(params);
     //======================================================
     //======================================================
     const { func_showPopUp } = useContext(AppContext);
     //======================================================
     //======================================================
     const success = true;
     //======================================================
     //======================================================
     const [product, setProduct] = useState(null);
     //======================================================
     const [relode, setRelode] = useState(false);
     //======================================================
     useEffect(() => {
          // effect

          const getProduct = async () => {
               const loggedInUser = JSON.parse(
                    localStorage.getItem("crbecommerce1_loggedInUser")
               );
               const LoggedInUserToken = loggedInUser?.token || "crb blank";
               const reply = await MyAxios.get("/products/" + id, {
                    headers: {
                         crb_ecommerce1_token: LoggedInUserToken,
                    },
               });

               setProduct(reply.data);

               //
          };
          getProduct();
          func_showPopUp("edit mode start");
          return () => {
               // cleanup
          };
     }, []);
     //======================================================
     //======================================================
     const [editTitle, setEditTitle] = useState(false);
     const [editRating, setEditRating] = useState(false);
     const [editPrice, setEditPrice] = useState(false);
     //======================================================
     //======================================================
     const [newValues, setNewValues] = useState({});
     //======================================================
     const handleChange = (e) => {
          setNewValues({ ...newValues, [e.target.name]: e.target.value });
     };
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
          } catch (error) {}
     };
     //======================================================
     //======================================================
     //======================================================
     //======================================================
     // useEffect(() => {
     //      // effect
     //      if (!editRating) {
     //           setNewValues((p) => {
     //                let v = { ...p };
     //                delete v.rate;
     //                return v;
     //           });
     //      }
     //      // if (editRating) {
     //      //      // let v = { ...newValues };
     //      //      // delete v.rate;
     //      //      setNewValues({ ...newValues, rate: product.rating.rate });
     //      // }
     //      if (!editPrice) {
     //           let v = { ...newValues };
     //           delete v.price;
     //           setNewValues({ ...v });
     //      }
     //      // if (editPrice) {
     //      //      setNewValues({ ...newValues, price: product.price });
     //      // }
     //      if (!editTitle) {
     //           // let v = { ...newValues };
     //           // delete v.title;
     //           setNewValues((p) => {
     //                let v = { ...p };
     //                delete v.title;
     //                return v;
     //           });
     //      }
     //      // if (editTitle) {
     //      //      // let v = { ...newValues };
     //      //      // delete v.title;
     //      //      setNewValues({ ...newValues, title: product.title });
     //      // }
     //      return () => {
     //           // cleanup
     //      };
     // }, [editTitle, editPrice, editRating]);
     //======================================================
     //======================================================
     const handleUpdate = async () => {
          const loggedInUser = JSON.parse(
               localStorage.getItem("crbecommerce1_loggedInUser")
          );
          const LoggedInUserToken = loggedInUser?.token || "crb blank";
          //
          console.log("unfiltered-values>>", newValues);
          let v = { ...newValues };
          if (!editTitle || !v.title) {
               delete v.title;
          }
          if (!editPrice || !v.price) {
               delete v.price;
          }
          if (!editRating || !v?.rate) {
               delete v?.rate;
          }
          console.log("filtered>>", v);
          try {
               const reply = await MyAxios.put("/products/" + id, v, {
                    headers: {
                         crb_ecommerce1_token: LoggedInUserToken,
                    },
               });
               func_showPopUp("edit success");
               setProduct(reply.data);
          } catch (error) {}
          // setPage("ALL_PRODUCTS");
          // setEditMode({ active: false, id: "" });
     };
     //======================================================
     //======================================================
     //======================================================
     //======================================================
     //======================================================
     console.log(newValues);
     //======================================================
     //======================================================
     if (!product) return <h1>Loading....</h1>;
     //======================================================
     return (
          <div>
               <EditProduct_Container>
                    <h3>Editing product with id : {id}</h3>
                    <div className="product-item-container">
                         {/* product item */}
                         {/* <Link to={`/product/${product._id}`} className="link"> */}
                         <div className="title">Title: {product.title}</div>
                         <div
                              className="toggle-wrap"
                              onClick={() => {
                                   setEditTitle(!editTitle);
                              }}
                         >
                              Edit
                              <i
                                   className={
                                        editTitle
                                             ? "fas fa-toggle-on"
                                             : "fas fa-toggle-off"
                                   }
                              ></i>
                              {/* <i class="fas fa-toggle-on"></i> */}
                         </div>
                         {true && (
                              <div className="input-wrap">
                                   <label htmlFor="">New Title: </label>
                                   <input
                                        type="text"
                                        disabled={!editTitle}
                                        onChange={handleChange}
                                        name="title"
                                        className="title"
                                        value={
                                             editTitle
                                                  ? newValues.title
                                                  : product.title
                                        }
                                   />
                              </div>
                         )}
                         <div className="image-wrap">
                              <img src={product.image} alt="" />
                         </div>
                         {/* <div className="desc">{product.description}</div> */}
                         <div className="wrap1">
                              <div className="rate">
                                   {" "}
                                   Ratings: {product.rating?.rate}
                                   <div
                                        className="toggle-wrap"
                                        onClick={() => {
                                             setEditRating(!editRating);
                                        }}
                                   >
                                        Edit
                                        <i
                                             className={
                                                  editRating
                                                       ? "fas fa-toggle-on"
                                                       : "fas fa-toggle-off"
                                             }
                                        ></i>
                                   </div>
                                   <div className="input-wrap">
                                        <label htmlFor="">New Rating: </label>
                                        <input
                                             type="text"
                                             disabled={!editRating}
                                             onChange={handleChange}
                                             name="rate"
                                             value={
                                                  editRating
                                                       ? newValues.rate
                                                       : product.rating?.rate
                                             }
                                        />
                                   </div>
                              </div>
                              <div className="price">
                                   Price: £ {product.price}
                                   <div
                                        className="toggle-wrap"
                                        onClick={() => {
                                             setEditPrice(!editPrice);
                                        }}
                                   >
                                        Edit
                                        <i
                                             className={
                                                  editPrice
                                                       ? "fas fa-toggle-on"
                                                       : "fas fa-toggle-off"
                                             }
                                        ></i>
                                   </div>
                                   <div className="input-wrap">
                                        <label htmlFor="">New Price: </label>
                                        <input
                                             type="text"
                                             disabled={!editPrice}
                                             onChange={handleChange}
                                             name="price"
                                             value={
                                                  editPrice
                                                       ? newValues.price
                                                       : product.price
                                             }
                                        />
                                   </div>
                              </div>
                         </div>
                         {/* </Link> */}
                         <div className="wrap2">
                              <div className="delete" onClick={handleDelete}>
                                   Delete this Product
                              </div>
                              <div className="update" onClick={handleUpdate}>
                                   Update this Product
                              </div>
                         </div>
                    </div>
               </EditProduct_Container>
               {/* {true && <MessagePopUp />} */}
          </div>
     );
};

export default EditProduct;
