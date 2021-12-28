import React from "react";
import styled from "styled-components";

export const EditProduct_Container = styled.div`
     padding: 10px;
     /* background-color: red; */
     /* display: flex; */
     /* flex-wrap: wrap; */
     h3 {
          font-size: 1rem;
          text-align: center;
          background-color: lightcoral;
          padding: 10px;
     }

     .product-item-container {
          flex: 1;
          padding: 20px;
          border-radius: 10px;
          margin: 10px;
          box-shadow: 0 0px 10px 10px rgb(255, 239, 239);

          .title {
               font-size: 1.2rem;
               font-weight: bold;
               min-width: 300px;
          }
          .toggle-wrap {
               cursor: pointer;
               display: flex;
               width: max-content;
               /* justify-content: center; */
               align-items: center;
               font-size: 1rem;
               font-weight: bold;
               .fas {
                    font-size: 30px;
                    margin-left: 10px;
               }
               .fa-toggle-on {
                    color: green;
               }
               .fa-toggle-off {
                    color: grey;
               }
          }
          .input-wrap {
               padding: 10px 0;
               margin: 10px 0;
               input {
                    font-size: 1rem;
                    padding: 5px;
               }
               .title {
                    width: 100%;
               }
          }
          .image-wrap {
               width: 150px;
               height: 200px;
               margin: 20px auto;
               img {
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
               }
          }
          .wrap1 {
               display: flex;
               justify-content: space-between;
               // padding: 0 20px;
               .price {
                    font-weight: bold;
                    font-size: 1.3rem;
               }
          }
          .wrap2 {
               display: flex;
               justify-content: space-between;
               gap: 20px;
          }
          .update,
          .delete {
               cursor: pointer;
               padding: 10px 0px;
               margin: 20px 0;
               width: 50%;

               margin-left: auto;
               // margin-right: 0;
               text-align: center;
               border-radius: 10px;
               border: none;
               background-color: rgb(123, 225, 130);
               &:hover {
                    filter: brightness(1.2);
               }
          }
          .delete {
               background-color: #ff8080;
          }
     }
`;
