const express = require("express");
const verifyToken = require("../middlewares/tokenVerifier");
const {
  registerUser,
  loginUser,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controller/userController");

const router = express.Router();

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected routes
router.get("/profile/:_id", verifyToken, getUserById);
router.put("/profile/:_id", verifyToken, updateUser);
router.delete("/profile/:_id", verifyToken, deleteUser);

module.exports = router;
