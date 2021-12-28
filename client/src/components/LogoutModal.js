import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import "./LogoutModal.scss";
const LogoutModal = () => {
     //======================================================
     const { doLogOut } = useContext(UserContext);
     //======================================================
     // const doLogout = () => {};
     //======================================================
     //======================================================
     //======================================================
     return (
          <div className="logoutmodal-container">
               <button
                    className="logout-button"
                    onClick={() => {
                         doLogOut();
                    }}
               >
                    Logout
               </button>
          </div>
     );
};

export default LogoutModal;
