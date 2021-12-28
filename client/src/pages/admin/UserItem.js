import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { myaxiox2 } from "../../axios/MyAxios";
import "./UserItem.scss";

const UserItem = ({ user }) => {
     //======================================================
     //======================================================
     const [ordersList, setOrdersList] = useState([]);
     //======================================================
     //======================================================
     //======================================================
     useEffect(() => {
          // effect
          const getOrders = async () => {
               try {
                    const reply = await myaxiox2.get(
                         `/order/?userID=${user._id}`
                    );
                    setOrdersList(reply.data);
               } catch (error) {}
          };
          getOrders();
          return () => {
               // cleanup
          };
     }, []);
     //======================================================
     //======================================================
     console.log(ordersList);
     console.log(user);
     //======================================================
     //======================================================
     //======================================================
     return (
          <div className="user-item-container">
               {/* {JSON.stringify(user)} */}
               <Link className="link" to={`userprofile/${user._id}`}>
                    <h3>username: {user.username}</h3>
                    <h3>email : {user.email}</h3>
                    <h3>is ADMIN: {user.isAdmin ? "yes" : "no"}</h3>
                    {ordersList.length === 0 && (
                         <div className="text-primary">No orders</div>
                    )}
                    {ordersList.length > 0 && (
                         <div className="container border">
                              {ordersList.map((e, i) => (
                                   <div className="d-flex gap-3 text-black-50">
                                        <div className="">#{i + 1}</div>
                                        <div className=" ">{e._id}</div>
                                        <div className=" ">
                                             {" "}
                                             Total Amount: £ {e.totalAmount}
                                        </div>
                                   </div>
                              ))}
                         </div>
                    )}
               </Link>
          </div>
     );
};

export default UserItem;
