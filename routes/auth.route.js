const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/auth.controller");
const User = require("../models/user.model");

router.post("/register", register);
router.post("/login", login);
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  const user = await User.findById(userId).exec();
  const { password, ...userWithoutPassword } = user._doc;

  // res.json({ message: `You are accessing protected route ${req.userId}` });
  res.status(200).json(userWithoutPassword);
});

module.exports = router;
