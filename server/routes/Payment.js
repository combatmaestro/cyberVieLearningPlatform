const express = require("express");
const router = express.Router();
const PaymentController = require("../controllers/PaymentController");
const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../middlewares/authMiddleware");

router.post("/create", isAuthenticatedUser, PaymentController.createOrder);
router.post("/confirm", PaymentController.confirmOrder);
router.post("/failure", PaymentController.failOrder);
router.delete(
  "/deleteOrder",
  isAuthenticatedUser,
  PaymentController.deleteOrder
);
router.get(
  "/getTransactions",
  isAuthenticatedUser,
  PaymentController.getDetails
);

router.get(
  "/allorders",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  PaymentController.getAllOrders
);

module.exports = router;
