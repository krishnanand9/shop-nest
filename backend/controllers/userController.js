const bcrypt = require("bcryptjs");
const User = require("../models/User");

// GET ALL USERS - ADMIN
const getUsers = async (req, res, next) => {
  try {
    const users = await User.find()
      .select("-password")
      .sort({
        createdAt: -1,
      });

    res.json(users);
  } catch (error) {
    next(error);
  }
};

// GET USER BY ID - ADMIN
const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select(
      "-password"
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
};

// UPDATE PROFILE
const updateProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.name = req.body.name || user.name;

    if (req.body.email) {
      user.email = req.body.email.toLowerCase();
    }

    if (req.body.password) {
      user.password = await bcrypt.hash(
        req.body.password,
        10
      );
    }

    if (req.body.address) {
      user.address = {
        ...user.address,
        ...req.body.address,
      };
    }

    const updatedUser = await user.save();

    res.json({
      id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      address: updatedUser.address,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE USER - ADMIN
const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    await user.deleteOne();

    res.json({
      message: "User deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsers,
  getUserById,
  updateProfile,
  deleteUser,
};