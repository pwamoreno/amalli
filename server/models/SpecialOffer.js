const mongoose = require("mongoose");

const SpecialOfferSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    offerType: {
      type: String,
      enum: ["sitewide", "category", "product"],
      required: true,
    },
    discountType: {
      type: String,
      enum: ["percentage", "fixed"],
      required: true,
    },
    discountValue: {
      type: Number,
      required: true,
      min: 0,
    },
    targetId: {
      type: String, // Category ID or Product ID
      default: null,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    displayBanner: {
      type: Boolean,
      default: true,
    },
    bannerColor: {
      type: String,
      default: "#ef4444",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SpecialOffer", SpecialOfferSchema);
