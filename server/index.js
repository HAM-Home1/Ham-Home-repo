var express = require("express");
var users = require("../routes/users.js");
var auth = require("../routes/auth.js");
var bodyParser = require("body-parser");
var multer = require("multer");
var samplePosts = require("../database-mongo/data.js");
var posts = require("../database-mongo");
var path = require("path");
var socket = require("socket.io");
var cors = require("cors");
const middleware = require("../middlewares/middleware.js");

require("dotenv").config();

var app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname + "/../react-client/dist"));
app.use(cors());
app.use("/api/users", users);
app.use("/api/auth", auth);

// app.post("/signup", (req, res) => {
//   // console.log(req.body)
//   // posts.User.create(req.body)
//   bcrypt.hash(req.body.password, 10).then((hash) => {
//     const user = new posts.User({
//       userName: req.body.userName,
//       email: req.body.email,
//       password: hash,
//       confirmPassword: req.body.confirmPassword,
//       phoneNumber: req.body.phoneNumber,
//       address: req.body.address,
//       dateBirth: req.body.dateBirth,
//     });
//     user
//       .save()
//       .then((response) => {
//         res.status(201).json({
//           message: "User successfully created!",
//           result: response,
//         });
//       })
//       .catch((error) => {
//         res.status(500).json({
//           error: error,
//         });
//       });
//   });
// });

// app.post("/signin", (req, res, next) => {
//   let getUser;
//   userSchema
//     .findOne({
//       userName: req.body.userName,
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

// app.route("/user-profile/:id").get(authorize, (req, res, next) => {
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

const insertSamplePosts = function () {
  samplePosts.samplePosts.map((element) => {
    posts.Post.find({ description: element.description }, function (err, docs) {
      if (docs.length === 0) {
        posts.Post.create(element).then(() => posts.db.disconnect());
      }
    });
  });
};
insertSamplePosts();

/*set up of socket server */
var server = app.listen(3000, function () {
  console.log("listening for requests on port 3000,");
});
var io = socket(server);
io.on("connection", (socket) => {
  console.log("made socket connection", socket.id);

  // Handle chat event
  socket.on("chat", function (data) {
    // console.log(data);
    io.sockets.emit("chat", data);
  });

  // Handle typing event
  socket.on("typing", function (data) {
    socket.broadcast.emit("typing", data);
  });
});

// const storage = multer.diskStorage({
//   destination: "../react-client/dist/uploads",
//   filename: function(req, file, cb) {
//     cb(null, 'IMAGE-' + Date.now() + path.extname(file.originalname))
//   }
// })
// const upload = multer({storage:storage, limits:{fileSize: 1000000}}).single('image')
// app.post("/upload", (req,res)=> {
//   upload(req, res ,(err)=> {
//     if(err) {
//       res.render('index', {msg: err})
//     } else {
//       console.log(req.file)
//       res.send('test')
//     }
//   })
// })

app.post("/posts", (req, res) => {
  console.log(req.body);
  posts.Post.create(req.body);
});

app.post("/update", (req, res) => {
  console.log(req.body);
  posts.Post.find({ imagesrc: req.body.imagesrc }, function (err, data) {
    if (err) {
      res.sendStatus(500);
    } else {
      posts.Post.updateMany(
        {
          price: data[0].price,
          rooms: data[0].rooms,
          description: data[0].description,
          address: data[0].address,
        },
        {
          $set: {
            price: req.body.price,
            rooms: req.body.rooms,
            description: req.body.description,
            address: req.body.address,
          },
        },
        function (err, result) {
          if (err) {
            res.send(err);
          } else {
            res.send(result);
          }
        }
      );
    }
  });
});

app.get("/posts", (req, res) => {
  posts.Post.find({ username: "Mohamed Amine Oueslati" }, function (err, data) {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

app.get("/rentPosts1", (req, res) => {
  posts.Post.find({}, function (err, data) {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

app.post("/messages", (req, res) => {
  posts.Message.create(req.body);
});

app.post("/search", (req, res) => {
  console.log(req.body);
  posts.Post.find({}, function (err, houses) {
    if (err) {
      res.sendStatus(500);
    } else {
      var data = [];
      houses.map((house) => {
        if (req.body.price) {
          var [min, max] = req.body.price.split("-");
          if (house.price >= min && house.price <= max) {
            if (
              house.address.split(",")[1] === req.body.city ||
              !req.body.city
            ) {
              if (!req.body.rooms || req.body.rooms === house.rooms) {
                data.push(house);
              }
            }
          }
        } else if (!req.body.price) {
          if (house.address.split(",")[1] === req.body.city || !req.body.city) {
            if (!req.body.rooms || req.body.rooms === house.rooms) {
              data.push(house);
            }
          }
        }
      });
      console.log(data.length);
      res.json(data);
    }
  });
});
// Fixing the 'cannot GET /URL' error on refresh with React Router
app.get("/*", function (req, res) {
  res.sendFile(
    path.join(__dirname, "../react-client/dist/index.html"),
    function (err) {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
});
