const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema(
  {
    userId: String,
    address: String,
    city: String,
    zipcode: {
      type: String,
      default: "",
      trim: true,
    },
    phone: String,
    notes: {
      type: String,
      default: "",
      trim: true,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Address", AddressSchema)