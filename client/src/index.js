import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AppContextProvider } from "./context/AppContext";
import { BasketContextProvider } from "./context/BasketContext";
import { FilterContextProvider } from "./context/FilterContext";
import { UserContextProvider } from "./context/UserContext";

ReactDOM.render(
     <React.StrictMode>
          <AppContextProvider>
               <UserContextProvider>
                    <FilterContextProvider>
                         <BasketContextProvider>
                              <App />
                         </BasketContextProvider>
                    </FilterContextProvider>
               </UserContextProvider>
          </AppContextProvider>
     </React.StrictMode>,
     document.getElementById("root")
);
