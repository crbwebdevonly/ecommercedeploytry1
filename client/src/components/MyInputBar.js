import React from "react";
import "./MyInputBar.scss";
const MyInputBar = (props) => {
     //======================================================
     const { label, name, handleChange } = props;
     //======================================================

     //======================================================
     //======================================================
     //======================================================
     return (
          <div className="MyInputBar-container-dontuse mb-2 p-2 border">
               <label htmlFor="" className="form-label text-capitalize">
                    {label || name || "name"}
               </label>
               <input
                    type="text"
                    className="form-control"
                    name={name}
                    onChange={handleChange}
               />
          </div>
     );
};

export default MyInputBar;
