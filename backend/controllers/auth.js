const User = require("../models/user");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");

exports.signup = (req, res) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.status(422).json({
      err: error.array()[0].msg,
    });
  }

  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err: "NOT WORKING",
      });
    }
    res.json({
      name: user.name,
      email: user.email,
      id: user._id,
    });
  });
};

exports.signin = (req, res) => {
  const { email, password } = req.body;

  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(422).json({
      err: error.array()[0].msg
    });
  }

  User.findOne({email}, (err, user) => {
        if (err || !user) {
          return res.status(400).json({
              error: "user email dosnt exist",
          });
        }

        if (!user.authenticate(password)) {
        return res.status(401).json({
            error: "Email and password dont match",
        });
        }

        const token = jwt.sign({ _id: user._id }, process.env.SECRET);

        res.cookie("token", token, { expire: new Date() + 55});

        const { _id, name, email, role } = user;
        return res.json({
        token,
        user: {
            _id,
            name,
            email,
            role,
        },
        });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "signed out sussec mf",
  });
};


//protected routes
exports.isSignedIn = expressJwt({
  secret: process.env.SECRET,
  userProperty: "auth"
});

//custom middleware
exports.isAuthenticated = (req, res, next) =>{
  let checker = req.profile && req.auth && req.profile._id === req.auth._id
  if(!checker){
    return res.status(403).json({
      error: "ACCESS DENIED"
    });
  }
  next();
}

exports.isAdmin = (req, res, next) =>{
  if(req.profile.role === 0){
    return res.status(403).json({
      error: "YOU ARE NOT ADMIN"
    });
  }
  next();
}