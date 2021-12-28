import { createContext, useState } from "react";

export const FilterContext = createContext();

export const FilterContextProvider = ({ children }) => {
     const [filterObj, setFilterObj] = useState({
          searchTerm: "",
          priceRange: { low: 0, high: 100 },
          sortSelect: "RHL",
     });
     return (
          <FilterContext.Provider value={{ filterObj, setFilterObj }}>
               {children}
          </FilterContext.Provider>
     );
};
