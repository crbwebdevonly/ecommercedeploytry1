import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { BasketContext } from "../context/BasketContext";
import BasketItem from "./BasketItem";
import "./BasketModal.scss";
import { useNavigate } from "react-router";

const BasketModal = () => {
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
     } = useContext(BasketContext);

     //======================================================
     const nav = useNavigate();
     // useNavigate

     //======================================================
     //======================================================
     //======================================================
     //======================================================
     //======================================================
     return (
          <div className="basket-modal-container">
               <div
                    className="close"
                    onClick={() => {
                         toggleBasketModal();
                    }}
               >
                    Close
               </div>

               <div className="items-wrap">
                    <div className="item header">
                         <div className="title">item title</div>

                         <div className="qty"> Qty</div>
                         <div className="amount">Amount</div>
                    </div>
                    <hr />

                    {basketItems.map((e, i) => (
                         <div className="item" key={i}>
                              <div
                                   className="remove"
                                   onClick={() => {
                                        removeFromBasket(i);
                                   }}
                              >
                                   <i class="fas fa-trash-alt"></i>
                              </div>
                              <div className="title">{e.title}</div>

                              <div className="qty"> x {e.qty}</div>
                              <div className="amount">£ {e.price}</div>
                         </div>
                    ))}
               </div>

               {/* <BasketItem /> */}
               {/* <BasketItem /> */}
               <div className="total">Total £{totalAmount}</div>

               <div
                    className="checkout-button"
                    onClick={() => {
                         toggleBasketModal();
                         nav("/checkoutpage");
                    }}
               >
                    {/* <Link to={"/checkoutpage"} className="link"> */}
                    Goto Checkout
                    {/* </Link> */}
               </div>
          </div>
     );
};

export default BasketModal;
