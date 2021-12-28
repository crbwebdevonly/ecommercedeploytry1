import React, { useContext } from "react";
import { useNavigate } from "react-router";
import { myaxiox2 } from "../../axios/MyAxios";
import CheckoutItem from "../../components/CheckoutItem";
import Navbar from "../../components/Navbar";
import { AppContext } from "../../context/AppContext";
import { BasketContext } from "../../context/BasketContext";
import "./Checkoutpage.scss";

const Checkoutpage = () => {
     //======================================================
     //======================================================
     const {
          basketItems,
          addToBasket,
          removeFromBasket,
          toggleBasketModal,
          showBasketModal,
          totalAmount,
          totalItems,
          clearBasket,
     } = useContext(BasketContext);
     //======================================================
     //======================================================
     const { func_showPopUp } = useContext(AppContext);
     //======================================================
     //======================================================
     const handleCancel = () => {
          clearBasket();
     };
     //======================================================
     const nav = useNavigate();
     //======================================================
     const handleOrder = async () => {
          // console.log(basketItems);
          // func_showPopUp("Thank you , your order has been placed");
          // clearBasket();
          // nav("/");
          // const reply = await myaxiox2.get("/order");
          const productsIDArray = basketItems.map((e) => e._id);
          const newOrder = {};
          try {
               const reply = await myaxiox2.post("/order", productsIDArray);
               console.log(reply);
               func_showPopUp("Thank you , your order has been placed");
               setTimeout(() => {
                    clearBasket();
                    nav("/");
               }, 2000);
          } catch (error) {}
     };
     //======================================================
     //======================================================
     //======================================================
     if (basketItems.length < 1) return <h1>Your basket is Empty</h1>;
     //======================================================
     //======================================================
     return (
          <div className="checkoutpage-container">
               <h1>checkoutpage</h1>

               <div className="items-wrap">
                    {basketItems.map((e, i) => (
                         <CheckoutItem product={e} key={i} index={i} />
                    ))}
               </div>

               <div className="total">Total: £ {totalAmount}</div>

               <div className="button-wrap">
                    <div className="cancle" onClick={handleCancel}>
                         Cancle
                    </div>
                    <div className="order" onClick={handleOrder}>
                         Place Order
                    </div>
               </div>
          </div>
     );
};

export default Checkoutpage;
