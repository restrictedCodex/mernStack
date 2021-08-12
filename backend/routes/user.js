const express = require("express");
const { isAdmin } = require("../controllers/auth");
const router = express.Router();

const {getUserById, getUser} = require("../controllers/user")
const {isSignedIn, isAuthenticated, asAdmin} = require("../controllers/auth")

router.param("userId", getUserById);
router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);

module.exports = router;