import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { myaxiox2 } from "../../axios/MyAxios";
import UserItem from "./UserItem";
import "./AdminUserList.scss";

const AdminUserList = () => {
     //======================================================
     const [usersList, setUsersList] = useState([]);
     //======================================================
     const [createNewUser, setCreateNewUser] = useState(false);
     //======================================================
     useEffect(() => {
          // effect
          const getUsers = async () => {
               try {
                    const reply = await myaxiox2.get("/auth");

                    setUsersList(reply.data);
               } catch (error) {}
          };
          //
          getUsers();
          return () => {
               // cleanup
          };
     }, []);
     //======================================================
     //======================================================
     //======================================================
     //======================================================
     return (
          <div className="admin-user-list-container">
               <h1>admin user list</h1>
               <div className="row">
                    <div className="col">
                         Sort-by
                         <select className="form-select w-auto" name="" id="">
                              <option value="">A-Z</option>
                              <option value="">Z-A</option>
                         </select>
                    </div>
               </div>
               {usersList.map((e, i) => (
                    <UserItem user={e} key={e._id} />
               ))}
               {/* <button className="create">Create New User</button> */}
               <Link className="link" to="createnewuser">
                    <div className="create">Create New User</div>
               </Link>
          </div>
     );
};

export default AdminUserList;
