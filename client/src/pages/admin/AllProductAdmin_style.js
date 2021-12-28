import React from "react";
import styled from "styled-components";

export const AllProductsAdmin_Container = styled.div`
     padding: 10px;
     /* background-color: red; */
     
     display: flex;
     flex-wrap: wrap;
     border: 1px solid green;

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
                    /* color: hotpink; */
               }
          }
          .wrap2 {
               display: flex;
               justify-content: space-between;
               gap: 20px;
          }
          .edit,
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
               background-color: rgb(123, 125, 230);
               &:hover {
                    filter: brightness(1.2);
               }
          }
          .delete {
               background-color: #ff8080;
          }
     }
`;
