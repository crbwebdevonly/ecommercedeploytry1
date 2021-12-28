const { response } = require("express");
const express = require("express");
const OrderDataModel = require("../DataModels/OrderDataModel");
const ProductDataModel = require("../DataModels/ProductDataModel");
const { verifyJWT } = require("./verifyJWT");
const router = express.Router();

//======================================================
//======================================================
//======================================================
//======================================================
//======================================================
// getall order
//======================================================
router.get("/", async (req, res) => {
     const queryUserID = req.query.userID;
     const queryOrderStatus = req.query.orderStatus
     console.log("order QUERY qyery>>", req.query);
     try {
          console.count("//=====================");
          let reply;
          if (queryUserID) {
               console.log("yes qyery");
               reply = await OrderDataModel.find({ userId: queryUserID });
          } else if (1 > 0) {
               console.log("NO qyery");

               reply = await OrderDataModel.find();
          } else {
               console.log("NO qyery");

               reply = await OrderDataModel.find();
          }
          // reply = await OrderDataModel.find();
          res.json(reply);
     } catch (error) {
          res.json({ error_msg: "getALL", error });
     }
});
//======================================================
//======================================================
//======================================================
//======================================================
// // getARRAYorder-id -send array-orders
// //======================================================
// router.post("/orderlist", async (req, res) => {
//      try {
//           // const reply = await OrderDataModel.find({ _id: { $in: req.body } });
//           console.count("//=====================");
//           console.log(req.body);
//           res.json({ msg: "orderarray", received: req.body });
//           // res.json(reply);
//      } catch (error) {
//           res.json({ error_msg: "getALL", error });
//      }
// });
//======================================================
//======================================================
//======================================================
// create order
//======================================================
router.post("/", verifyJWT, async (req, res) => {
     const user = req.verifiedDecodedToken.findUser;
     const userId = user._id;
     /*
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
     */

     const newOrder = { userId, productsIDArray: req.body };
     try {
          const reply = await OrderDataModel.create(newOrder);
          res.status(200).json(reply);
     } catch (error) {
          res.status(200).json({ error_msg: "error", error });
     }
});
//======================================================
//======================================================
//======================================================
// delete order
//======================================================
router.delete("/:id", async (req, res) => {
     try {
          const reply = await OrderDataModel.findByIdAndDelete(req.params.id);
          res.json(reply);
     } catch (error) {}
});
//======================================================
//======================================================
// update order
//======================================================
//======================================================
//======================================================
router.post("/:id", verifyJWT, async (req, res) => {
     const id = req.params.id;

     // /*
     // {
     //      userId: { type: String, required: true },
     //      productsIDArray: { type: Array, default: [] },
     //      totalAmount: { type: Number },
     //      status: {
     //           type: String,
     //           enum: ["PROCESSING", "ERROR", "COMPLETED"],
     //           default: "PROCESSING",
     //      },
     // },

     try {
          const findOrder = await OrderDataModel.findByIdAndUpdate(
               req.params.id,
               {
                    $set: req.body,
               },
               { new: true }
          );
          if (!findOrder) {
               return res
                    .status(200)
                    .json({ error_msg: "error- cant find order" });
          }
          res.status(200).json(findOrder);
     } catch (error) {
          res.status(200).json({ error_msg: "error", error });
     }
});
//======================================================
//======================================================
//======================================================
//======================================================
//======================================================
//======================================================
//======================================================

module.exports = router;
