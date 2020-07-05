// const express = require("express");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");
// const router = express.Router();
// const userSchema = require("../database-mongo/index.js");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User, validate } = require("../database-mongo/index");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered");
  user = new User(
    _.pick(req.body, ["userName", "email", "password", "confirmPassword"])
    // userName: req.body.userName,
    // email: req.body.email,
    // password: req.body.password,
    // confirmPassword: req.body.confirmPassword,
    // phoneNumber: req.body.phoneNumber,
    // address: req.body.address,
    // dateBirth: req.body.dateBirth,
  );
  const salt = await bcrypt.genSalt(10);
  user.passwoed = await bcrypt.hash(user.password, salt);
  await user.save();
  res.send(_.pick(user, ["userName", "email"]));
});

// //signUp
// router.post("/signup"),
//   (req, res, next) => {
//     bcrypt.hash(req.body.password, 10).then((hash) => {
//       const user = new userSchema({
//         userName: req.body.userNameme,
//         email: req.body.email,
//         password: hash,
//         confirmPassword: req.body.confirmPassword,
//         phoneNumber: req.body.phoneNumber,
//         address: req.body.address,
//         dateBirth: req.body.dateBirth,
//       });
//       user
//         .save()
//         .then((response) => {
//           res.status(201).json({
//             message: "User successfully created!",
//             result: response,
//           });
//         })
//         .catch((error) => {
//           res.status(500).json({
//             error: error,
//           });
//         });
//     });
//   };

// //SignIn

// router.post("/signin", (req, res, next) => {
//   let getUser;
//   userSchema
//     .findOne({
//       email: req.body.email,
//     })
//     .then((user) => {
//       if (!user) {
//         return res.status(401).json({
//           message: "Authentication failed",
//         });
//       }
//       getUser = user;
//       return bcrypt.compare(req.body.password, user.password);
//     })
//     .then((response) => {
//       if (!response) {
//         return res.status(401).json({
//           message: "Authentication failed",
//         });
//       }
//       let jwtToken = jwt.sign(
//         {
//           email: getUser.email,
//           userId: getUser_id,
//         },
//         process.env.SECRET_KEY,
//         { expiresIn: "1h" }
//       );
//       res.status(200).json({
//         token: jwtToken,
//         // expiresIn: 3600,
//         // _id: getUser_id,
//       });
//     })
//     .catch((err) => {
//       return res.status(401).json({
//         message: "Authentication failed",
//       });
//     });
// });

// router.route("/user-profile/:id").get(authorize, (req, res, next) => {
//   userSchema.findById(req.params.id, (error, data) => {
//     if (error) {
//       return next(error);
//     } else {
//       res.status(200).json({
//         msg: data,
//       });
//     }
//   });
// });

module.exports = router;
