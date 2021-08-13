const express = require("express");
const router = express.Router();

const { getCategoryById } = require("../controllers/category");
const { isAdmin, isAuthenticated, isSignedIn } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

//params
router.param("userId", getUserById);
router.param("categoryId", getCategoryById);

//actual routes
router.post(
  "/category/create/:userid",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createCategory
);

module.exports = router;
