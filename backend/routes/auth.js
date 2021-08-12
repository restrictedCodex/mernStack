var express = require("express");
var router = express.Router();
const { check } = require("express-validator");

const { signout, signup , signin, isSignedIn} = require("../controllers/auth");

router.post(
  "/signup",
  [
    check("name")
      .isLength({ min: 3 })
      .withMessage("name must be at least 3 chars long"),
    check("email").isEmail().withMessage("enter valid email"),
    check("password")
      .isLength({ min: 6 })
      .withMessage("password must be at least 3 chars long"),
  ],
  signup
);

router.post(
    "/signin",
    [
      check("email").isEmail().withMessage("enter valid email"),
      check("password")
        .isLength({ min: 6 })
        .withMessage("password must be at least 3 chars long"),
    ],
    signin
);

router.get("/signout", signout);

router.get("/testroute", isSignedIn, (req,res)=>{
  res.json(req.auth);
})

module.exports = router;
