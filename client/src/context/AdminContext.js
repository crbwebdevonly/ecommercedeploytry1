import { createContext, useState } from "react";

export const AdminContext = createContext();

export const AdminContextProvider = ({ children }) => {
     //======================================================
     const [page, setPage] = useState("ALL_PRODUCTS");

     //======================================================
     const [editMode, setEditMode] = useState({ active: false, id: "" });
     //======================================================
     const [relodeTrigger,setRelodeTrigger] = useState(false)
     //======================================================
     //======================================================
     //======================================================
     //======================================================
     //======================================================
     return (
          <AdminContext.Provider value={{ page, setPage,editMode, setEditMode,setRelodeTrigger }}>
               {children}
          </AdminContext.Provider>
     );
};
