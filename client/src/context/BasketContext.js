const { createContext, useState, useEffect } = require("react");
//======================================================
//======================================================
const dummydata = [
     { title: "title1 eee eeee", qty: 2, price: 123 },
     { title: "title1 ddd", qty: 1, price: 123 },
     { title: "title1", qty: 2, price: 123 },
     { title: "title1", qty: 9, price: 103 },
];
//======================================================

export const BasketContext = createContext();

export const BasketContextProvider = ({ children }) => {
     // const [basketItems, setBasket] = useState([...dummydata]);
     const [basketItems, setBasket] = useState([]);
     //======================================================
     const [showBasketModal, setShowBasketModal] = useState(false);
     //======================================================
     const [totalAmount, setTotalAmount] = useState(0);
     const [totalItems, setTotalItems] = useState(0);
     //======================================================
     //======================================================
     const addToBasket = (item) => {
          // setBasket(() => basketItems.push(item));
          setBasket([...basketItems, item]);
     };
     //======================================================
     const removeFromBasket = (id) => {
          setBasket(basketItems.filter((e, i) => i !== id));
     };
     //======================================================
     //======================================================
     const toggleBasketModal = () => {
          setShowBasketModal(!showBasketModal);
     };
     //======================================================
     const clearBasket = () => {
          setBasket([]);
     };
     //======================================================
     //======================================================
     useEffect(() => {
          // effect
          let amount = 0;
          let items = 0;
          basketItems.forEach((e) => {
               amount += e.price;
               items += e.qty;
          });
          setTotalAmount(amount.toFixed(2));
          // setTotalItems(items);
          setTotalItems(basketItems.length);
          return () => {
               // cleanup
          };
     }, [basketItems]);
     //======================================================
     //======================================================
     //======================================================
     return (
          <BasketContext.Provider
               value={{
                    basketItems,
                    addToBasket,
                    removeFromBasket,
                    toggleBasketModal,
                    showBasketModal,
                    totalAmount,
                    totalItems,
                    clearBasket,
               }}
          >
               {children}
          </BasketContext.Provider>
     );
};
