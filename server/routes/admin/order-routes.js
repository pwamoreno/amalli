const express = require("express");

const {
  getAllUserOrders
} = require("../../controllers/admin/order-controller");

const router = express.Router();

router.get("/get", getAllUserOrders);

module.exports = router;
