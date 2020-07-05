var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/hamHome", { useMongoClient: true });

var db = mongoose.connection;

db.on("error", function () {
  console.log("mongoose connection error");
});

db.once("open", function () {
  console.log("mongoose connected successfully");
});

var userSchema = mongoose.Schema({
  username: String,
  email: String,
  pssword: String,
  photo: String,
  name: String,
  age: String,
  phoneNumber: Number,
  posts: Array,
});

var User = mongoose.model("User", userSchema);

var selectAllUser = function (callback) {
  User.find({}, function (err, users) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, users);
    }
  });
};

var postSchema = mongoose.Schema({
  username: String,
  imagesrc: String,
  price: Number,
  rooms: String,
  address: String,
  rating: Number,
  description: String,
  date: String,
  availibility: Boolean,
  messages: String,
});

var Post = mongoose.model("Post", postSchema);

var selectAllPost = function (callback) {
  Post.find({}, function (err, posts) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, posts);
    }
  });
};

var messageSchema = mongoose.Schema({
  sender: String,
  message: String,
  date: String,
});
var Message = mongoose.model("Message", messageSchema);
var selectAllMessage = function (callback) {
  Message.find({}, function (err, messages) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, messages);
    }
  });
};

module.exports.Post = Post;
module.exports.Message = Message;
module.exports.db = db;
module.exports.selectAllPost = selectAllPost;
module.exports.selectAllMessage = selectAllMessage;
module.exports.selectAllUser = selectAllUser;
