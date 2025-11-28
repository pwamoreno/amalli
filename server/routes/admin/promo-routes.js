const express = require("express");
const {
  getAllPromoCodes,
  createNewPromoCode,
  updatePromoCode,
  deletePromoCode,
} = require("../../controllers/admin/promo-controller");

const router = express.Router();

router.get("/get", getAllPromoCodes);
router.post("/create", createNewPromoCode);
router.put("/update/:id", updatePromoCode);
router.delete("/delete/:id", deletePromoCode);

module.exports = router;
