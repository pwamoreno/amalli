const express = require("express");

const {newsletterSignup} = require("../../controllers/shop/newsletter-controller")

const router = express.Router()

router.post("/signup", newsletterSignup)

module.exports= router;