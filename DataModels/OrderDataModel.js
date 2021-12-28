const mongoose = require("mongoose");
const ProductDataModel = require("./ProductDataModel");

const OrderSchema = new mongoose.Schema(
     {
          userId: { type: String, required: true },
          productsIDArray: { type: Array, default: [] },
          totalAmount: { type: Number },
          status: {
               type: String,
               enum: ["PROCESSING", "ERROR", "COMPLETED"],
               default: "PROCESSING",
          },
     },
     { timestamps: true }
);

//======================================================
OrderSchema.pre("save", async function () {
     console.log("//=====================promise all orders log");
     console.log(this.productsIDArray);

     try {
          // ProductDataModel.findById()
          const productsArray = await Promise.all(
               this.productsIDArray.map((e) => ProductDataModel.findById(e))
          );

          this.totalAmount = productsArray.reduce(
               (total, e) => total + e.price,
               0
          ).toFixed(2)
          // console.log(this.totalAmount, "total amount");
          // () => {
          // const promisesArray = [];
          // this.productsIDArray.forEach((e) => {
          //      promisesArray.push(ProductDataModel.findById(e));
          // });

          // return promisesArray;               }

          console.count("//=====================promise all orders");
          // console.log(result);
     } catch (error) {
          console.log("//=====================promise all orders log--ERROR");
     }
});

module.exports = mongoose.model("OrderDataModel", OrderSchema);
