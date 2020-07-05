var mongoose = require("mongoose");
const Joi = require("joi");
mongoose.Promise = global.Promise;

// Joi.objectId = require("joi-objectid")(Joi);
console.log("hi");
mongoose.connect("mongodb://localhost:27017/hamHome", { useMongoClient: true });

var db = mongoose.connection;

db.on("error", function () {
  console.log("mongoose connection error");
});

db.once("open", function () {
  console.log("mongoose connected successfully");
});
console.log("hi");

var userSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 500,
  },
  confirmPassword: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  address: String,
  dateBirth: Number,
  photo: String,
  name: String,
  age: String,
  phoneNumber: Number,
  posts: Array,
});

function validateUser(user) {
  const schema = {
    userName: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(50).required().email(),
    password: Joi.string().min(5).max(255).required(),
    confirmPassword: Joi.string().min(5).max(255).required(),
  };
  return Joi.validate(user, schema);
}

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
// module.exports = mongoose.model('User', userSchema)
module.exports.User = User;
module.exports.validate = validateUser;
