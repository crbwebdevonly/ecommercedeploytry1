//======================================================
const express = require("express");
const router = express.Router();
//======================================================
const bcrypt = require("bcrypt");
const UserDataModel = require("../DataModels/UserDataModel");
const { response } = require("express");
const jwt = require("jsonwebtoken");
const passport = require("passport");
//======================================================
// pur requires above this
//======================================================
//======================================================

//======================================================
// routes
//======================================================

//======================================================
// login
//======================================================
router.post("/login", async (req, res) => {
     // res.json({ msg: "login user", received: req.body });
     // console.log("headers>>", req.headers.crb_ecommerce1_token);

     try {
          const findUser = await UserDataModel.findOne({
               email: req.body.email,
          });
          if (!findUser) {
               return res
                    .status(200)
                    .json({ error: "email/user DOSE NOT exists!!!" });
          }
          const passwordMatch = await bcrypt.compare(
               req.body.password,
               findUser.password
          );
          if (!passwordMatch) {
               return res
                    .status(200)
                    .json({ error: "password DOES NOT match " });
          }
          if (passwordMatch) {
               // // const user = { ...findUser };
               // console.count("//=====================999");

               const token = jwt.sign(
                    { findUser },
                    process.env.JWT_SECRET_STRING,
                    {
                         expiresIn: "7d",
                    }
               );
               // console.log("token>>", token);
               // findUser.token = token;
               // // sendUser = {}
               const user = { ...findUser._doc };
               return res.status(200).json({
                    msg: "password match",
                    loginUser: user,
                    token,
               });
               // return res.json({ msg: "kkk", token });
          }
     } catch (error) {
          res.json(error);
     }
});
//======================================================
//======================================================
//======================================================
//======================================================
// register
//======================================================
router.post("/register", async (req, res) => {
     const password = req.body.password;
     try {
          const findEmail = await UserDataModel.findOne({
               email: req.body.email,
          });
          if (findEmail) {
               return res
                    .status(400)
                    .json({ error: "email/user already exists!!!" });
          }
          const hashedPassword = await bcrypt.hash(password, 10);
          const newUser = {
               ...req.body,
               password: hashedPassword,
          };
          const reply = await UserDataModel.create(newUser);
          res.status(200).json(reply);
     } catch (error) {
          res.json(error);
     }
});
//======================================================
//======================================================
//======================================================
// update user
//======================================================
router.put("/update/:id", async (req, res) => {
     // return res.status(200).json({ msg: "tt", body: req.body });
     const password = req.body.password;
     try {
          const findUser = await UserDataModel.findById(req.params.id);
          if (!findUser) {
               return res
                    .status(400)
                    .json({ error: "user DOES NOT exists!!!" });
          }

          if (req.body.email) {
               const findEmail = await UserDataModel.findOne({
                    email: req.body.email,
               });
               if (findEmail) {
                    return res
                         .status(400)
                         .json({ error: "email/user already exists!!!" });
               }
          }

          const updatedUser = req.body;
          if (req.body.password) {
               const hashedNewPassword = await bcrypt.hash(
                    req.body.password,
                    10
               );

               // updatedUser = { ...updatedUser, password: hashedNewPassword }; //causing error???not working
               updatedUser.password = hashedNewPassword;
          }
          // res.status(200).json({ msg: "tt" });
          const reply = await UserDataModel.findByIdAndUpdate(
               req.params.id,
               {
                    $set: updatedUser,
               },
               { new: true }
          );

          res.status(200).json({
               update_id: req.params.id,
               reply,
          });
     } catch (error) {
          res.json(error);
     }
});

//======================================================
//======================================================
//======================================================
//======================================================
// delete
//======================================================
router.delete("/delete/:id", async (req, res) => {
     try {
          const findUser = await UserDataModel.findById(req.params.id);
          if (!findUser) {
               return res
                    .status(400)
                    .json({ error: "user DOES NOT exists!!!" });
          }

          const reply = await UserDataModel.findByIdAndDelete(req.params.id);
          res.status(200).json(reply);
     } catch (error) {
          res.json(error);
     }
});
//======================================================
//======================================================
//======================================================
//======================================================
//======================================================
// get all
//======================================================
router.get("/", async (req, res) => {
     try {
          const findAllUser = await UserDataModel.find({});
          res.status(200).json(findAllUser);
     } catch (error) {
          res.json(error);
     }
});
//======================================================

//======================================================
// get ONE user
//======================================================
router.get("/:id", async (req, res) => {
     try {
          const findUser = await UserDataModel.findById(req.params.id);
          res.status(200).json(findUser);
     } catch (error) {
          res.json(error);
     }
});
//======================================================
//======================================================
//======================================================
//======================================================
// router.get(
//      "/google",
//      passport.authenticate("google", { scope: ["email", "profile"] })
//      // res.send("google-test-home");
// );
// router.get('/google',
//   passport.authenticate('google', { scope:
//       [ 'email', 'profile' ] }
// ));
//======================================================
//======================================================
//======================================================
//======================================================
module.exports = router;
//======================================================
//======================================================
//======================================================
