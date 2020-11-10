const { model } = require("mongoose");
const jwt = require("jsonwebtoken");
const { auth, isMainAdmin } = require("../middlewares/authContoller");
const User = model("Users");

module.exports = function userRoutes(app) {
  app.post("/signup", (req, res) => {
    const {
      name,
      email,
      password,
      passwordConfirm,
      stage,
      department,
      phoneNumber,
    } = req.body;
    User.create({
      name: req.body.name,
      email,
      password,
      passwordConfirm,
      phoneNumber,
      stage,
      department,
    })
      .then((doc) => {
        const token = jwt.sign({ id: doc._id }, process.env.TOKEN_SECRET);
        res.json({
          token,
          data: doc,
        });
      })
      .catch((err) => {
        if (err.code == 11000) {
          res.json({
            status: "fail",
            message: "EMAIL_USED",
          });
        } else {
          res.json({
            status: "fail",
            message: "CHECK_INFO",
          });
        }
      });
  });

  app.post("/login", async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return next();
    }
    User.findOne({ email })
      .then(async(user) => {
        const check = await user.checkPassword(password)
        if(!check){
         return res.json({
            status: "fail",
            message: "PASSWORD_WRONG",
          });
        }

        const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET);
        res.json({ data: user, token });

      })
      .catch(() => {
        res.json({
          status: "fail",
          message: "EMAIL_WRONG",
        });
      });

 
  });

  app.patch("/authenticate/:id", auth, isMainAdmin, (req, res) => {
    const { isAdmin } = req.body;
    User.findByIdAndUpdate(req.params.id, { isAdmin })
      .then(() => {
        res.json({
          status: "success",
        });
      })
      .catch(() => {
        res.json({
          status: "fail",
        });
      });
  });
};
