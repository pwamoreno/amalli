const express = require("express");
const {
  getAllOffers,
  createNewOffer,
  updateOffer,
  deleteOffer,
} = require("../../controllers/admin/offers-controller");

const router = express.Router();

router.get("/get", getAllOffers);
router.post("/create", createNewOffer);
router.put("/update/:id", updateOffer);
router.delete("/delete/:id", deleteOffer);

module.exports = router;
