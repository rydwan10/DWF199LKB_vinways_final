const Joi = require("joi");
const multer = require("multer");

const { Transaction, User } = require("../../models");

exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.findAll({
      attributes: {
        exclude: ["UserId", "createdAt", "updatedAt", "userId"],
      },
      include: {
        model: User,
        as: "user",
        attributes: {
          exclude: ["createdAt", "updatedAt", "password"],
        },
      },
    });

    if (!transactions) {
      return res.status(200).send({
        status: "success",
        message: "There is no transactions yet",
        data: {
          transactions: [],
        },
      });
    }

    res.status(200).send({
      status: "success",
      message: "Data successfully retrieved!",
      data: {
        transactions,
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

exports.getTransactionById = async (req, res) => {
  try {
    const { id } = req.params;
    const transaction = await Transaction.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["UserId", "createdAt", "updatedAt", "userId"],
      },
      include: {
        model: User,
        as: "user",
        attributes: {
          exclude: ["createdAt", "updatedAt", "password"],
        },
      },
    });
    console.log(transaction);

    if (!transaction) {
      return res.status(404).send({
        status: "Not Found",
        message: `Transaction with id: ${id} is not found!`,
        data: {
          transaction: null,
        },
      });
    }

    res.status(200).send({
      status: "success",
      message: `Transaction with id: ${id} successfully retrieved!`,
      data: {
        transaction,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error: {
        message: "Server Error",
      },
    });
  }
};

exports.addTransaction = async (req, res) => {
  try {
    const { body, file } = req;
    const proofOfTransaction = file.filename;

    const validationSchema = Joi.object({
      userId: Joi.string().required(),
      accountNumber: Joi.string().required(),
    });

    const { error } = validationSchema.validate(body, { abortEarly: false });

    if (error) {
      return res.status(400).send({
        status: "Validation Error",
        error: {
          message: error.details.map((err) => err.message),
        },
      });
    }
    const { accountNumber } = req.body;

    const payment = await Transaction.create({
      ...body,
      proofOfTransaction: proofOfTransaction,
      accountNumber: accountNumber,
      remainingActive: 0,
      paymentStatus: "pending",
    });

    res.status(201).send({
      status: "success",
      message: "Payment successfully created",
      data: {
        payment,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error: {
        message: "Server Error",
      },
    });
  }
};

exports.updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    const transaction = await Transaction.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["UserId", "createdAt", "updatedAt", "userId"],
      },
      include: {
        model: User,
        as: "user",
        attributes: {
          exclude: ["createdAt", "updatedAt", "password"],
        },
      },
    });

    if (!transaction) {
      return res.status(404).send({
        status: "Not Found",
        message: `Transaction with id: ${id} is not found!`,
        data: {
          transaction: null,
        },
      });
    }
    //  check if a transaction is already approved!
    if (transaction.paymentStatus === "approved") {
      return res.status(400).send({
        status: "Bad Request",
        message: `Transaction with id: ${id} already approved!`,
        data: {
          transaction,
        },
      });
    }

    await User.update(
      { status: "active" },
      {
        where: {
          id: transaction.user.id,
        },
      }
    );

    await Transaction.update(
      {
        paymentStatus: "approved",
        remainingActive: 30,
      },
      {
        where: {
          id,
        },
      }
    );

    const updatedTransaction = await Transaction.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["UserId", "createdAt", "updatedAt", "userId"],
      },
      include: {
        model: User,
        as: "user",
        attributes: {
          exclude: ["createdAt", "updatedAt", "password"],
        },
      },
    });

    res.status(200).send({
      status: "success",
      message: `Transaction with id: ${id} is approved!`,
      data: {
        transaction: updatedTransaction,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error: {
        message: "Server Error",
      },
    });
  }
};
exports.cancelTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    const transaction = await Transaction.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["UserId", "createdAt", "updatedAt", "userId"],
      },
      include: {
        model: User,
        as: "user",
        attributes: {
          exclude: ["createdAt", "updatedAt", "password"],
        },
      },
    });

    if (!transaction) {
      return res.status(404).send({
        status: "Not Found",
        message: `Transaction with id: ${id} is not found!`,
        data: {
          transaction: null,
        },
      });
    }
    //  check if a transaction is already approved!
    if (transaction.paymentStatus === "approved") {
      await User.update(
        { status: "not active" },
        {
          where: {
            id: transaction.user.id,
          },
        }
      );

      await Transaction.update(
        {
          paymentStatus: "canceled",
          remainingActive: 0,
        },
        {
          where: {
            id,
          },
        }
      );

      const updatedTransaction = await Transaction.findOne({
        where: {
          id,
        },
        attributes: {
          exclude: ["UserId", "createdAt", "updatedAt", "userId"],
        },
        include: {
          model: User,
          as: "user",
          attributes: {
            exclude: ["createdAt", "updatedAt", "password"],
          },
        },
      });

      res.status(200).send({
        status: "success",
        message: `Transaction with id: ${id} is canceled!`,
        data: {
          transaction: updatedTransaction,
        },
      });
    } else if (transaction.paymentStatus === "pending") {
      return res.status(400).send({
        status: "Bad Request",
        message: `Transaction with id: ${id} is pending!`,
        data: {
          transaction,
        },
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error: {
        message: "Server Error",
      },
    });
  }
};

exports.deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    const transaction = await Transaction.findOne({
      where: {
        id,
      },
    });

    if (!transaction) {
      return res.status(404).send({
        status: "Not Found",
        messsage: `Transaction with id: ${id} is not found!`,
        data: {
          transaction: null,
        },
      });
    }

    const deletedTransaction = await Transaction.destroy({
      where: {
        id,
      },
    });

    res.status(200).send({
      status: "success",
      message: `Transaction with id: ${id} is successfully deleted!`,
      data: {
        transaction: deletedTransaction,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error: {
        message: "Server Error",
      },
    });
  }
};
