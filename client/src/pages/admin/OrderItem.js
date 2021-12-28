import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { myaxiox2 } from "../../axios/MyAxios";
import "./OrderItem.scss";

const OrderItem = (props) => {
     // console.log(props);
     const {
          orderData: {
               userId,
               productsIDArray,
               status,
               _id: orderID,
               totalAmount,
          },
          handleDelete,
     } = props;
     //======================================================
     //======================================================
     // console.log(userId);
     //======================================================

     //======================================================
     const [orderList, setOrderList] = useState([]);
     const [customer, setCustomer] = useState("");
     //======================================================
     //======================================================
     const [orderStatus, setOrderStatus] = useState("PROCESSING");
     //======================================================
     const [enableEdit, setEnableEdit] = useState(false);
     //======================================================
     const nav = useNavigate();
     //======================================================
     const [updatedStatus, setUpdatedStatus] = useState(status);
     //======================================================

     //======================================================
     useEffect(() => {
          // effect
          setEnableEdit(false);
          setOrderList([]);
          const getProducts = async () => {
               const reply = await Promise.all(
                    productsIDArray.map((e) => myaxiox2.get(`/products/${e}`))
               );
               // console.log(reply);
               reply.forEach((e) => {
                    setOrderList((p) => [...p, e.data]);
               });
          };
          //           )

          //      //
          //      }
          getProducts();
          return () => {
               // cleanup
          };
     }, []);
     //======================================================
     //======================================================
     //======================================================
     //======================================================
     useEffect(() => {
          // effect
          const getCustomer = async () => {
               try {
                    const reply = await myaxiox2.get(`/auth/${userId}`);
                    setCustomer(reply.data);
               } catch (error) {}
          };
          getCustomer();
          return () => {
               // cleanup
          };
     }, []);
     //======================================================
     //======================================================
     const handleUpdate = async () => {
          try {
               const reply = await myaxiox2.post(`order/${orderID}`, {
                    status: orderStatus,
               });
               // console.log(reply.data);
               // nav("/adminpage/allorders");
               // window.location.reload();
               setUpdatedStatus(reply.data.status);
          } catch (error) {
               console.log(error);
          }
          // console.log(reply);
     };
     //======================================================
     //======================================================
     // const handleDelete = async ()=>{
     //      try {
     //           const reply =  await myaxiox2.delete(`order/${orderID}`)

     //      } catch (error) {

     //      }
     // }
     //======================================================
     //======================================================
     //======================================================
     return (
          <div className="OrderItem-container">
               <h4>Customer name: {customer.username}</h4>
               <div className={`status ${updatedStatus.toLowerCase()}`}>
                    Status: {updatedStatus}
               </div>
               <div className="update-wrap">
                    <div className="enable">
                         Enable Edit:{" "}
                         <i
                              className={
                                   enableEdit
                                        ? "fas fa-toggle-on"
                                        : "fas fa-toggle-off"
                              }
                              onClick={() => {
                                   setEnableEdit(!enableEdit);
                              }}
                         ></i>
                    </div>
                    <div className="d-flex gap-2">
                         <select
                              name=""
                              id=""
                              className="update-select"
                              defaultValue={orderStatus}
                              onChange={(e) => {
                                   setOrderStatus(e.target.value);
                              }}
                         >
                              <option value="" disabled>
                                   Order Status
                              </option>
                              <option value="PROCESSING">processing</option>
                              <option value="ERROR">error</option>
                              <option value="COMPLETED">completed</option>
                         </select>
                         {/* <div className="update">Update Status</div> */}
                         <button
                              className="update"
                              disabled={!enableEdit}
                              onClick={handleUpdate}
                         >
                              Update Status
                         </button>
                         <button
                              className="btn btn-danger ms-auto"
                              disabled={!enableEdit}
                              onClick={() => {
                                   handleDelete(orderID);
                              }}
                         >
                              Delete this Order
                         </button>
                    </div>
               </div>
               <div className="items-list">
                    <h3>Order-Items</h3>
                    {orderList?.map((e, i) => (
                         <div className="wrap" key={i}>
                              <div className="title">{e.title}</div>
                              <img
                                   src={e.image}
                                   alt=""
                                   style={{ width: "40px" }}
                              />
                         </div>
                    ))}
                    <h4>Total Amount: £ {totalAmount}</h4>
               </div>
          </div>
     );
};

export default OrderItem;
