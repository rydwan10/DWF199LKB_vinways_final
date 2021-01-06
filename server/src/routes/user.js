const express = require("express");
const router = express.Router();

const { getUsers, deleteUser, deleteAccount } = require("../controllers/user");
const { auth } = require("../middlewares/auth");
const { isAdmin } = require("../middlewares/isAdmin");

router.get("/users", auth, isAdmin, getUsers);
router.delete("/users/:id", auth, deleteUser);
router.delete("/delete-account", auth, deleteAccount);

module.exports = router;
