const express = require("express");

const {
  getUsers,
  getUserById,
  updateProfile,
  deleteUser,
} = require("../controllers/userController");

const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const router = express.Router();

// Current user
router.put("/profile", protect, updateProfile);

// Admin
router.get("/", protect, admin, getUsers);

router.get("/:id", protect, admin, getUserById);

router.delete("/:id", protect, admin, deleteUser);

module.exports = router;