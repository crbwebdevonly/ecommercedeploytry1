const { json } = require("express");
const express = require("express");
const { verifyJWT } = require("./verifyJWT");
const router = express.Router();

const ProductDataModel = require("../DataModels/ProductDataModel");

//======================================================
//======================================================
// get all products
router.get("/", verifyJWT, async (req, res) => {
     // console.log("hit999");
     // if (!req.verifiedDecodedToken.findUser.isAdmin) {
     //      return res.status(200).json({ error: "is NOT ADMIN" });
     // }
     //
     if (!req.query.category) {
          req.query.category = "";
     }
     if (req.query.category === "any") {
          req.query.category = "";
     }
     let count = 0;
     if (req.query.category === "men") {
          count = await ProductDataModel.count({
               $and: [
                    { category: { $not: { $regex: "wom", $options: "i" } } },
                    { category: { $regex: req.query.category, $options: "i" } },
               ],
          });
     } else {
          count = await ProductDataModel.count({
               category: { $regex: req.query.category, $options: "i" },
          });
     }

     // console.log("query>>count", req.query, count);
     // if (req.query) {
     //      console.log("query>>true");
     // }
     // if (!req.query) {
     //      console.log("query>>false");
     // }
     let allProducts = [];
     if (req.query.category === "men") {
          allProducts = await ProductDataModel.find({
               $and: [
                    { category: { $not: { $regex: "wom", $options: "i" } } },
                    { category: { $regex: req.query.category, $options: "i" } },
               ],
               // category: { $not: { $regex: "wom", $options: "i" } },
               // category: { $regex: req.query.category, $options: "i" },
               // category:
          })
               .sort({
                    price: req.query.sortPrice || 1,
                    // price: 1,
               })
               .skip(
                    parseInt(req.query.itemsPerPage || 0) *
                         (parseInt(req.query.page || 1) - 1)
               )
               .limit(parseInt(req.query.itemsPerPage || 50));
          return res.status(200).json({ allProducts, count });
     }
     // const allProducts = await ProductDataModel.find({
     //      category: "electronics",
     // });
     // .limit(3)
     // .skip(3 * req.query.page);

     // allProducts.test1="test123"
     // console.log(allProducts);
     {
          allProducts = await ProductDataModel.find({
               category: { $regex: req.query.category, $options: "i" },
          })
               // $and: [
               //      { category: { $not: { $regex: "wom", $options: "i" } } },
               // ],
               // category: { $not: { $regex: "wom", $options: "i" } },
               // category: { $regex: req.query.category, $options: "i" },
               // category:
               // })
               .sort({
                    price: req.query.sortPrice || 1,
                    // price: 1,
               })
               .skip(
                    parseInt(req.query.itemsPerPage || 0) *
                         (parseInt(req.query.page || 1) - 1)
               )
               .limit(parseInt(req.query.itemsPerPage || 50));
     }

     res.status(200).json({ allProducts, count });
});
//======================================================
//======================================================
//======================================================
//======================================================
//======================================================
// get ONE products
router.get("/:id", verifyJWT, async (req, res) => {
     console.log("hit123A");
     if (!req.verifiedDecodedToken.findUser.isAdmin) {
          return res.status(200).json({ error: "is NOT ADMIN" });
     }
     //
     const product = await ProductDataModel.findById(req.params.id);
     res.status(200).json(product);
});
//======================================================
//======================================================
// /productlist"
// get multiple products
router.post("/productlist", verifyJWT, async (req, res) => {
     // console.log("hit999");
     if (!req.verifiedDecodedToken.findUser.isAdmin) {
          return res.status(200).json({ error: "is NOT ADMIN" });
     }
     //
     let productArray = [];
     productArray.push(
          ProductDataModel.find({ _id: { $in: req.body } }).exec()
     );
     Promise.all(productArray).then((r) => res.status(200).json(r));
     // const product = await ProductDataModel.find({ _id: { $in: req.body } });

     // const product = await (await ProductDataModel.find().where("_id")).in(req.body).exec()
     // res.status(200).json(product);
});
//======================================================
//======================================================
//======================================================
// create products
router.post("/createnewproducts", verifyJWT, async (req, res) => {
     if (!req.verifiedDecodedToken.findUser.isAdmin) {
          return res.status(200).json({ error: "is NOT ADMIN" });
     }
     //
     const newProduct = {
          ...req.body,
     };
     delete newProduct.rate;
     newProduct.rating = {
          rate: parseFloat(req.body.rate).toFixed(2),
          count: 111,
     };
     const reply = await ProductDataModel.create(newProduct);
     res.status(200).json(reply);
     // res.status(200).json(req.body);
});
//======================================================
//======================================================
//======================================================
//======================================================
//======================================================
// delete ONE products
router.delete("/:id", verifyJWT, async (req, res) => {
     // console.log("hit999");
     if (!req.verifiedDecodedToken.findUser.isAdmin) {
          return res.status(200).json({ error: "is NOT ADMIN" });
     }
     //
     const reply = await ProductDataModel.findByIdAndDelete(req.params.id);
     res.status(200).json(reply);
});
//======================================================
//======================================================
//======================================================
//======================================================
// updateONE products
router.put("/:id", verifyJWT, async (req, res) => {
     // console.log("hit999");
     if (!req.verifiedDecodedToken.findUser.isAdmin) {
          return res.status(200).json({ error: "is NOT ADMIN" });
     }
     //
     let newValues = {};
     if (req.body.rate) {
          newValues.rating = {
               rate: parseFloat(req.body.rate).toFixed(2),
               count: 111,
          };
     }
     if (req.body.title) {
          newValues.title = req.body.title;
     }
     if (req.body.price) {
          newValues.price = parseFloat(req.body.price).toFixed(2);
     }
     // const new
     const reply = await ProductDataModel.findByIdAndUpdate(
          req.params.id,
          newValues,
          { new: true }
     );
     // res.status(200).json(reply);
     res.status(200).json(reply);
});
//======================================================
//======================================================
//======================================================

//======================================================
//======================================================
// send all product categories
router.post("/get-all-products-categories", async (req, res) => {
     // const ProductDataModel.find()
     // console.log("hit123B");
     // if (!req.verifiedDecodedToken.findUser.isAdmin) {
     //      return res.status(200).json({ error: "is NOT ADMIN" });
     // }
     // //
     // const product = await ProductDataModel.findById(req.params.id);
     res.status(200).send("123abc");
});
//======================================================
//======================================================

//======================================================
//======================================================

//======================================================
//======================================================
//======================================================
module.exports = router;
//======================================================
//======================================================
