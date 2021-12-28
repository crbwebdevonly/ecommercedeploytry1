import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
     //======================================================
     //======================================================
     //======================================================
     const [loggedInUser, setLoggedINUser] = useState(
          JSON.parse(localStorage.getItem("crbecommerce1_loggedInUser")) || null
     );
     //======================================================
     //======================================================
     const doLogIn = (user) => {
          console.log("dologin2>>", user);

          setLoggedINUser(user);
     };
     //======================================================
     const doLogOut = () => {
          console.log("logout");
          // localStorage.removeItem("crbecommerce1_loggedInUser");
          setLoggedINUser(null);
     };
     //======================================================
     //======================================================
     return (
          <UserContext.Provider value={{ loggedInUser, doLogIn, doLogOut }}>
               {children}
          </UserContext.Provider>
     );
};
