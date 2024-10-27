const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

// Route to handle user signup
router.post("/signup", authController.signup);

// Route to handle user login
router.post("/login", authController.login);

// Route to handle password recovery process
router.post("/forgot-password", authController.forgotPassword);

// Route to reset the user's password
router.post("/reset-password", authController.resetPassword);

// Route to verify the token
router.get("/verify-token", authController.verifyToken);

module.exports = router;
