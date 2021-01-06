const multer = require("multer");

exports.uploadImageAndMusic = (thumbnail, attachment) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname);
    },
  });

  const fileFilter = function (req, file, cb) {
    if (file.fieldname === thumbnail) {
      if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = {
          message: "Only image files are allowed!",
        };
        return cb(new Error("Only image files are allowed!"), false);
      }
    }

    if (file.fieldname === attachment) {
      if (!file.originalname.match(/\.(mp3|MP3|m4a|M4A|flac|FLAC)$/)) {
        req.fileValidationError = {
          message: "Only Audio files are allowed!",
        };
        return cb(new Error("Only Audio files are allowed!"), false);
      }
    }
    cb(null, true);
  };

  const maxSize = 100 * 1000 * 1000; //10MB

  const upload = multer({
    storage,
    fileFilter,
    limits: {
      fileSize: maxSize,
    },
  }).fields([
    {
      name: thumbnail,
      maxCount: 1,
    },
    {
      name: attachment,
      maxCount: 1,
    },
  ]);

  //middleware handler
  return (req, res, next) => {
    upload(req, res, function (err) {
      if (req.fileValidationError)
        return res.status(400).send(req.fileValidationError);

      if (!req.files && !err)
        return res.status(400).send({
          message: "Please select an thumbnail and audio to upload",
        });

      if (err) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return res.status(400).send({
            message: "Max file sized 10MB",
          });
        }
        return res.status(400).send(err);
      }

      return next();
    });
  };
};
