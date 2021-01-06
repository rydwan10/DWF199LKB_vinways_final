const express = require("express");

const router = express.Router();

const {
  getMusics,
  getMusicById,
  addMusic,
  deleteMusicById,
  updateMusicById,
} = require("../controllers/music");

const { uploadImageAndMusic } = require("../middlewares/uploadImageAndMusic");

// auth middleware... replace it later
const { auth } = require("../middlewares/auth");
const { isAdmin } = require("../middlewares/isAdmin");

router.get("/musics", getMusics);
router.post(
  "/musics",
  auth,
  isAdmin,
  uploadImageAndMusic("thumbnail", "attachment"),
  addMusic
);
router.get("/musics/:id", getMusicById);
router.delete("/musics/:id", auth, isAdmin, deleteMusicById);
router.patch(
  "/musics/:id",
  auth,
  isAdmin,
  uploadImageAndMusic("thumbnail", "attachment"),
  updateMusicById
);

module.exports = router;
