const jwt = require("jsonwebtoken");
const { model } = require("mongoose");

const User = model("Users");

exports.auth = function (req, res, next) {
  // check if user loggedin
  const token = req.headers.authorization;
  // console.log(token)
  if (!token) {
    return res.json({ status: "fail" , message:"NEED_SIGNIN" });
  }

  jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
      // console.log(decoded)
    if (err) {
      return res.json({ status: "fail" , message:err });
    } else {
      User.findById(decoded.id).then((doc) => {
        if (!doc) {
          return res.json({ status: "fail" });
        } else {
          req.user = doc;
          next();
        }
      });
    }
  });
};

exports.isAdmin = (req, res, next) => {
  // console.log(req.user.isAdmin);
  if (req.user.isAdmin == false) {
    // console.log('not an adimin')
    return res.json({
      status: "fail",
      message: "AUTHORIZATION_REJECTED",
    });
  } else if (req.user.isAdmin == null) {
    return res.json({
      status: "fail",
      message: "NOT_AUTHORIZED",
    });
  } else {
    // console.log('okay you are good')
    return next();
  }
};

exports.isMainAdmin = (req, res, next) => {
  // console.log(req.user);
  if (req.user.isMainAdmin == false) {
    // console.log('not an adimin')
    return res.json({
      status: "fail",
      message: "AUTHORIZATION_REJECTED",
    });
  } else if (req.user.isMainAdmin == null) {
    return res.json({
      status: "fail",
      message: "NOT_AUTHORIZED",
    });
  } else {
    return next();
  }
};
