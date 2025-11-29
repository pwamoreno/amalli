const express = require("express");
const {
  getAllActiveOffers,
  getOfferByCategory,
  getOfferByProduct,
} = require("../../controllers/shop/offer-controller");

const router = express.Router();

router.get("/active", getAllActiveOffers);
router.get("/category/:categoryId", getOfferByCategory);
router.get("/product/:productId", getOfferByProduct);

module.exports = router;