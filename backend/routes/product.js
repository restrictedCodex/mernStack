const express = require("express");
const router = express.Router();

const {getProductById, createProduct} = require("../controllers/product");
const { getUserById } = require("../controllers/user");
const { isAdmin, isAuthenticated, isSignedIn } = require("../controllers/auth");

//params
router.param("userId", getUserById);
router.param("productId", getProductById);

//actual routes
router.post("/product/create/:userId", isAdmin, isAuthenticated, isSignedIn, createProduct)

module.exports = router;
