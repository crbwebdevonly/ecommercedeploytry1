const AppContextReducer = (state, action) => {
     if (action.type === "SHOW") {
          console.log("show>>");
          return {
               ...state,
               showPopUp: true,
               popup_message: action.payload.popup_message,
          };
     }
     if (action.type === "HIDE") {
          console.log("hide>>");
          return { ...state, showPopUp: false, popup_message: "" };
     }
};

// default export AppContextReducer

export default AppContextReducer;
