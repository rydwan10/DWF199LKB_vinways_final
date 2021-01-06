const { User } = require("../../models");

exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password"] },
    });

    if (!users) {
      return res.res.status(400).send({
        message: "There is no Users",
        data: [],
      });
    }

    res.status(200).send({
      data: {
        message: "success",
        users,
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
// Todo delete account here
exports.deleteAccount = async (req, res) => {
  try {
    await User.destroy({
      where: {
        id: req.userId.id,
      },
    });
    res.status(200).send({
      status: "success",
      message: "account deleted",
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

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const getUserById = await User.findOne({
      where: {
        id,
      },
    });

    if (!getUserById) {
      return res.status(404).send({
        status: "User not found!",
        message: `User with id: ${id} is not found!`,
        data: {
          user: null,
        },
      });
    }

    await User.destroy({
      where: {
        id,
      },
    });

    res.send({
      status: "success",
      message: `User with id: ${id} is successfully deleted!`,
      data: {
        user: null,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      error: {
        message: "Server Error",
      },
    });
  }
};
