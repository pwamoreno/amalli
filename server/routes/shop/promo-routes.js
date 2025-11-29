const express = require("express");

const {
  applyPromo,
  validatePromo,
} = require("../../controllers/shop/promo-controller");

const router = express.Router();

router.post("/apply", applyPromo);
router.post("/validate", validatePromo);

module.exports = router;