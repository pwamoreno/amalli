const mongoose = require("mongoose");

const NewsletterSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  subscribedAt: {
    type: Date,
    default: Date.now
  },
  unsubscribedAt: {
    type: Date,
    default: null,
  },
  active: {
    type: Boolean,
    default: true
  },
  lastEmailSent: {
    type: Date,
    default: null
  },
  unsubscribeToken: {
    type: String,
    index: true, // Index for faster lookups
  },
});

module.exports = mongoose.model("Newsletter", NewsletterSchema)