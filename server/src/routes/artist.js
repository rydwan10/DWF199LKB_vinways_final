const express = require("express");

const router = express.Router();

const { auth } = require("../middlewares/auth");
const { isAdmin } = require("../middlewares/isAdmin");

const {
  getArtist,
  getArtistById,
  addArtist,
  deleteArtistById,
  updateArtistById,
} = require("../controllers/artist");

const { uploadImage } = require("../middlewares/uploadImage");

router.get("/artists", getArtist);
router.post("/artists", auth, isAdmin, uploadImage("thumbnail"), addArtist);
router.get("/artists/:id", getArtistById);
router.delete("/artists/:id", auth, isAdmin, deleteArtistById);
router.patch(
  "/artists/:id",
  auth,
  isAdmin,
  uploadImage("thumbnail"),
  updateArtistById
);

module.exports = router;
