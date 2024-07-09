const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/auth.controller");
const User = require("../models/user.model");
const { verifyToken } = require("../middlewares/auth.middleware");

router.post("/register", register);
router.post("/login", login);
router.get("/:userId", verifyToken, async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId).exec();
    const { password, ...userWithoutPassword } = user._doc;
    res.status(200).json(userWithoutPassword);
  } catch (err) {
    res.status(401).json({ message: "Invalid username or password!" });
  }
});

module.exports = router;
