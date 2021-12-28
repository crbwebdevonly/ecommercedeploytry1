import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { myaxiox2 } from "../../axios/MyAxios";
import "./AdminOrderList.scss";
import OrderItem from "./OrderItem";

const AdminOrderList = () => {
     //======================================================
     //======================================================
     const [orders, setOrders] = useState([]);
     const [reset, setReset] = useState(0);
     //======================================================
     const nav = useNavigate();
     //======================================================
     //======================================================
     //======================================================
     const handleDelete = async (orderID) => {
          try {
               console.log(orderID);
               const reply = await myaxiox2.delete(`order/${orderID}`);
               console.log(reply.data._id);
               setOrders(orders.filter((e) => e._id !== reply.data._id));
               // setReset((p) => p + 1);
               // setOrders([...reply.data]);
               // nav("/adminpage/allorders")
          } catch (error) {}
     };
     //======================================================
     //======================================================
     console.log(orders, "orders");
     //======================================================
     //======================================================
     useEffect(() => {
          // effect
          const getOrders = async () => {
               try {
                    const reply = await myaxiox2.get("/order/?getAll=true");
                    setOrders(reply.data);
               } catch (error) {}
          };
          getOrders();
          return () => {
               // cleanup
          };
     }, []);

     //======================================================
     if (orders.length < 1) return <h1>NO orders</h1>;

     //======================================================
     return (
          <div className="AdminOrderList-container">
               <h1>all orders {reset}</h1>
               <div className="container bg-light">
                    <div className="row justify-content-end text-secondary">
                         <div className="col col-auto hstack gap-2">
                              <label className="label">Order Status</label>
                              <select
                                   name=""
                                   id=""
                                   className="form-select w-auto"
                              >
                                   <option value="all">All</option>
                                   <option value="error">Error</option>
                                   <option value="processing">
                                        Processing
                                   </option>
                                   <option value="completed">Completed</option>
                              </select>
                         </div>
                         <div className="col col-auto hstack gap-2">
                              <label className="label">Sort by</label>
                              <select
                                   name=""
                                   id=""
                                   className="form-select w-auto"
                              >
                                   <option value="newFirst">
                                        Newest First
                                   </option>
                                   <option value="oldFirst">
                                        Oldest First
                                   </option>
                                   <option value="updatedFirst">
                                        Recently Updated
                                   </option>
                              </select>
                         </div>
                    </div>
               </div>
               {/* {JSON.stringify(orders)} */}
               {orders?.map((e) => (
                    <OrderItem
                         key={e._id}
                         orderData={e}
                         handleDelete={handleDelete}
                    />
               ))}
          </div>
     );
};

export default AdminOrderList;
