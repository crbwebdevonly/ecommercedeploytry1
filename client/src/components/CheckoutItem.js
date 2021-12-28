import React, { useContext } from "react";
import { BasketContext } from "../context/BasketContext";
import "./CheckoutItem.scss";
const CheckoutItem = (props) => {
     //======================================================
     const {
          product: { _id, title, price, image },
          index,
     } = props;
     //======================================================
     //======================================================
     const { removeFromBasket } = useContext(BasketContext);
     //======================================================

     //======================================================
     const handleDelete = () => {};
     //======================================================
     //======================================================
     //======================================================
     return (
          <div className="checkout-item-container">
               <div className="wrap1">
                    <i
                         class="far fa-trash-alt"
                         onClick={() => {
                              removeFromBasket(index);
                         }}
                    ></i>
                    <img src={image} alt="" />
                    <div className="title">{title}</div>
               </div>
               <div className="qty"></div>
               <div className="price">£ {price}</div>
          </div>
     );
};

export default CheckoutItem;
