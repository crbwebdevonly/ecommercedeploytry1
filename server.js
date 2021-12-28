const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
//======================================================
const authRoute = require("./routes/authRoutes");
const productsRoute = require("./routes/productsRoute");
const orderRoute = require("./routes/orderRoute");
//======================================================
const googleAuth = require("./routes/googleAuth");
const passport = require("passport");
//======================================================
// put all requires above this
//======================================================
const myServer = express();
myServer.use(express.json());
// myServer.use(cors({
//      origin:'*', 
//      credentials:true,            //access-control-allow-credentials:true
//      optionSuccessStatus:200,
//   }));
//======================================================
//======================================================
dotenv.config();
//======================================================
//======================================================
//======================================================

//======================================================
// routes
//======================================================
// myServer.get("/", (req, res) => {
//      res.send("test-home");
// });
//======================================================
myServer.get(
     "/google/auth2",

     passport.authenticate("google", { scope: ["email", "profile"] })
);
//======================================================
myServer.use("/auth", authRoute);
myServer.use("/products", productsRoute);
myServer.use("/order", orderRoute);
myServer.use("/adminpage/order", orderRoute);

//======================================================
//======================================================
//======================================================
//======================================================
//======================================================
//======================================================
//======================================================
//======================================================
//======================================================
//======================================================
//======================================================
//======================================================
//======================================================
//======================================================
//======================================================
//======================================================
mongoose.connect(process.env.DB_CONNECTION_STRING, () => {
     console.count("//=====================");
     console.log("database connected....crb");
     console.count("//=====================");
});
//======================================================
//======================================================
//======================================================
if(process.env.NODE_ENV === "production"){
     myServer.use(express.static(path.join(__dirname, "/client/build")));
     myServer.get('*', (req, res) => {
          res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
        });
}
if(process.env.NODE_ENV === "development"){
console.log("development mode..crb");
}
//======================================================
//======================================================
const serverPORT = process.env.PORT || 8000;

myServer.listen(serverPORT, () => {
     console.count("//=====================");
     console.log(`myServer@${serverPORT}......crb`);
     console.count("//=====================");
});
//======================================================
//======================================================
