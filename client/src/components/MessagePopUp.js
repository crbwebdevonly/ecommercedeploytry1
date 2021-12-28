import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import "./MessagePopUp.scss";
const MessagePopUp = (props) => {
     // const { message, type } = props;
     //======================================================
     const { popup_message, AppContextDispatch } = useContext(AppContext);
     //======================================================
     //======================================================
     //======================================================
     //======================================================
     //======================================================
     return (
          <div className="message-pop-up-container">
               {/* <div className="message">Message is this</div> */}
               <div className="message">{popup_message}</div>
               {/* <button
                    onClick={() => {
                         AppContextDispatch({ type: "HIDE" });
                    }}
               >
                    hide
               </button> */}
          </div>
     );
};

export default MessagePopUp;
