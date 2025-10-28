const express = require("express");

const {
  createOrder,
  verifyPayment,
  getAllOrdersByUserId,
  getOrderDetails,
} = require("../../controllers/shop/order-controller");

const router = express.Router();

router.post("/create", createOrder);
router.post("/verify", verifyPayment);
router.get("/list/:userId", getAllOrdersByUserId);
router.get("/details/:id", getOrderDetails);

module.exports = router;
