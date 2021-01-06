const { Music, Artist } = require("../../models");
const Joi = require("joi");

exports.getMusics = async (req, res) => {
  try {
    const musics = await Music.findAll({
      attributes: {
        exclude: ["artistId", "createdAt", "updatedAt", "ArtistId"],
      },
      include: {
        model: Artist,
        as: "artist",
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
    });

    if (musics.length === 0) {
      return res.status(200).send({
        status: "success",
        message: "There is no music yet",
        data: {
          musics: [],
        },
      });
    }

    res.status(200).send({
      status: "success",
      message: "Data successfully retrieved!",
      data: {
        musics,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      error: {
        message: "Server Error",
      },
    });
  }
};

exports.getMusicById = async (req, res) => {
  const { id } = req.params;

  try {
    const music = await Music.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["artistId", "createdAt", "updatedAt", "ArtistId"],
      },
      include: {
        model: Artist,
        as: "artist",
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
    });

    if (!music) {
      return res.status(404).send({
        status: "Not Found",
        message: `Music with id: ${id} is not found!`,
        data: {
          music: null,
        },
      });
    }

    res.status(200).send({
      status: "success",
      message: `Music with id ${id} successfully retrieved!`,
      data: {
        music,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      error: {
        message: "Server Error",
      },
    });
  }
};

exports.addMusic = async (req, res) => {
  try {
    const { body, files } = req;
    const thumbnailName = files.thumbnail[0].filename;
    const attachmentName = files.attachment[0].filename;

    const validationSchema = Joi.object({
      title: Joi.string().required(),
      year: Joi.date().required(),
      artistId: Joi.string().required(),
    });

    const { error } = validationSchema.validate(body, { abortEarly: false });

    if (error) {
      return res.status(400).send({
        status: "Validation Error",
        message: error.details.map((error) => error.message),
        data: {
          artist: null,
        },
      });
    }

    const newMusic = await Music.create({
      ...body,
      thumbnail: thumbnailName,
      attachment: attachmentName,
    });

    res.status(201).send({
      status: "success",
      message: "New music is successfully added!",
      data: {
        newMusic,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      error: {
        message: "Server Error",
      },
    });
  }
};

exports.deleteMusicById = async (req, res) => {
  const { id } = req.params;
  try {
    const music = await Music.findOne({
      where: {
        id,
      },
    });

    if (!music) {
      return res.status(404).send({
        status: "Not Found",
        message: `Artist with id: ${id} is not found!`,
        data: {
          music: null,
        },
      });
    }

    await Music.destroy({
      where: {
        id,
      },
    });

    res.status(200).send({
      status: "success",
      message: `Music with id ${id} successfully deleted!`,
      data: {
        deletedMusic: music,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      error: {
        message: "Server Error",
      },
    });
  }
};

exports.updateMusicById = async (req, res) => {
  try {
    const { id } = req.params;
    const { body, files } = req;

    const music = await Music.findOne({
      where: {
        id,
      },
    });

    if (!music) {
      return res.status(404).send({
        status: "Not Found",
        message: `Artist with id: ${id} is not found!`,
        data: {
          music: null,
        },
      });
    }

    let thumbnailName;
    let attachmentName;

    if (Object.keys(files) == 0) {
      thumbnailName = music.thumbnail;
      attachmentName = music.attachment;
    } else if (
      Object.keys(files).length == 1 &&
      Object.keys(files)[0] == "thumbnail"
    ) {
      thumbnailName = files.thumbnail[0].filename;
      attachmentName = music.attachment;
    } else if (
      Object.keys(files).length == 1 &&
      Object.keys(files)[0] == "attachment"
    ) {
      attachmentName = files.attachment[0].filename;
      thumbnailName = music.thumbnail;
    } else if (
      Object.keys(files)[0] == "thumbnail" &&
      Object.keys(files)[1] == "attachment"
    ) {
      thumbnailName = files.thumbnail[0].filename;
      attachmentName = files.attachment[0].filename;
    }

    const validationSchema = Joi.object({
      title: Joi.string(),
      year: Joi.date(),
      thumbnail: Joi.string(),
      attachment: Joi.string(),
      artistId: Joi.string(),
    });

    const { error } = validationSchema.validate(body, { abortEarly: false });

    if (error) {
      return res.status(400).send({
        status: "Validation Error",
        message: error.details.map((error) => error.message),
        data: {
          artist: null,
        },
      });
    }

    const data = {
      ...body,
      attachment: attachmentName,
      thumbnail: thumbnailName,
    };

    await Music.update(data, {
      where: {
        id,
      },
    });

    const updatedMusic = await Music.findOne({
      where: {
        id,
      },
    });

    res.status(200).send({
      status: "success",
      message: `Music with id: ${id} successfully updated!`,
      data: {
        updatedMusicData: updatedMusic,
        oldMusicData: music,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      error: {
        message: "Server Error",
      },
    });
  }
};
