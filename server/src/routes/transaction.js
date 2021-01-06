const express = require("express");

const router = express.Router();

const {
  getTransactions,
  getTransactionById,
  addTransaction,
  updateTransaction,
  deleteTransaction,
  cancelTransaction,
} = require("../controllers/transaction");

// middleware
const { uploadImage } = require("../middlewares/uploadImage");
const { auth } = require("../middlewares/auth");
const { isAdmin } = require("../middlewares/isAdmin");

router.get("/transactions", auth, isAdmin, getTransactions);
router.post(
  "/transactions",
  auth,
  uploadImage("proofOfTransaction"),
  addTransaction
);
router.get("/transactions/:id", auth, getTransactionById);
router.patch("/transactions/:id", auth, isAdmin, updateTransaction);
router.patch("/transactions/cancel/:id", auth, isAdmin, cancelTransaction);
router.delete("/transactions/:id", auth, isAdmin, deleteTransaction);

module.exports = router;
