const express = require("express");

const {
  newsletterSignup,
  sendNewsletter,
  unsubscribe,
  unsubscribeWithToken,
} = require("../../controllers/shop/newsletter-controller");

const router = express.Router();

router.post("/signup", newsletterSignup);
router.post("/send", sendNewsletter);
router.post("/unsubscribe", unsubscribe);
router.get("/unsubscribe", unsubscribeWithToken);

module.exports = router;
