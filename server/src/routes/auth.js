const express = require("express");

const router = express.Router();

const {
  register,
  login,
  checkAuth,
  hashPassword,
} = require("../controllers/auth");
const { auth } = require("../middlewares/auth");

router.post("/register", register);
router.post("/login", login);
router.get("/check-auth", auth, checkAuth);
router.post("/hash-password", hashPassword);

module.exports = router;
