import React, { useState } from "react";
import { myaxiox2 } from "../../axios/MyAxios";
import MyInputBar from "../../components/MyInputBar";
import "./CreateNewProduct.scss";

const CreateNewProduct = () => {
     //======================================================
     const [newProduct, setNewProduct] = useState({
          title: "",
          image: "",
          price: "",
          rate: "",
          category: "",
          description: "",
     });
     //======================================================
     const handleChange = (e) => {
          // console.log("eee", e);
          setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
     };
     //======================================================
     // console.log(newProduct);
     //======================================================
     const handleSubmit = async () => {
          console.log(newProduct);
          const errorCheck = () => {};
          const error = errorCheck(newProduct);
          if (!error) {
               console.log("success", newProduct);
               const reply = await myaxiox2.post(
                    "/products/createnewproducts",
                    newProduct
               );
               console.log(reply);
          }
     };
     //======================================================
     //======================================================
     // id: 6,
     //      title: "Solid Gold Petite Micropave ",
     //      price: 168,
     //      description:
     //           "Satisfaction Guaranteed. Return or exchange any order within 30 days.Designed and sold by Hafeez Center in the United States. Satisfaction Guaranteed. Return or exchange any order within 30 days.",
     //      category: "jewelery",
     //      image: "https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg",
     //      rating: { rate: 3.9, count: 70 },
     //======================================================
     return (
          <div className="create-new-product-container">
               {/* <button className="btn btn-primary">test111</button> */}

               <div className="inputs-wrap-dontuse">
                    <MyInputBar
                         label={"title"}
                         name={"title"}
                         handleChange={handleChange}
                    />
                    <MyInputBar
                         label={"image url"}
                         name={"image"}
                         handleChange={handleChange}
                    />
                    <MyInputBar
                         label={"price"}
                         name={"price"}
                         handleChange={handleChange}
                    />
                    <MyInputBar
                         label={"rating"}
                         name={"rate"}
                         handleChange={handleChange}
                    />
                    <MyInputBar
                         label={"category"}
                         name={"category"}
                         handleChange={handleChange}
                    />
                    <MyInputBar
                         label={"description"}
                         name={"description"}
                         handleChange={handleChange}
                    />
                    <button className="btn btn-success" onClick={handleSubmit}>
                         Create Product
                    </button>
               </div>
          </div>
     );
};

export default CreateNewProduct;
