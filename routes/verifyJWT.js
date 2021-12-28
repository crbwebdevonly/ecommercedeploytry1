//======================================================
const jwt = require("jsonwebtoken");
//======================================================
//======================================================
//======================================================
//======================================================

const verifyJWT = (req, res, next) => {
     const token = req.headers.crb_ecommerce1_token;
     if (!token) {
          return res.status(200).json({ error: "token NOT found" });
     }
     jwt.verify(token, process.env.JWT_SECRET_STRING, (error, decodeToken) => {
          if (error) {
               return res
                    .status(200)
                    .json({ error: "token INVALID..please login" });
          }
          req.verifiedDecodedToken = decodeToken;
          // console.log(decodeToken);

          // console.count("//=====================");
          // console.log("token verified");

          next();
     });
};
//======================================================
// decoded token
/*
{
  findUser: {
    _id: '61943d0c3c2002592c3cc57b',
    email: 'email2@email2.com',
    username: 'name2',
    password: '$2b$10$lyF378oBa0duNQlVWoMFTerLwmZiAXa9xbHLd4VCOdVE8VxnTn36G',
    isAdmin: false,
    createdAt: '2021-11-16T23:21:48.302Z',
    updatedAt: '2021-11-16T23:21:48.302Z',
    __v: 0
  },
  iat: 1638278133,
  exp: 1638882933
}
*/
//======================================================
//======================================================
//======================================================

// const verifyAdminJWT = (req, res, next) => {
//      const token = req.headers.crb_ecommerce1_token;
//      if (!token) {
//           return res.status(200).json({ error: "token NOT found" });
//      }
//      jwt.verify(token, process.env.JWT_SECRET_STRING, (error, decodeToken) => {
//           if (error) {
//                return res
//                     .status(200)
//                     .json({ error: "token INVALID..please login" });
//           }
//           req.verifiedDecodedToken = decodeToken;
//           console.count("//=====================");
//           console.log("token verified");

//           next();
//      });
// };

module.exports = { verifyJWT };
