const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    image: String,
    title: String,
    description: String,
    category: String,
    price: Number,
    salePrice: Number,
    totalStock: Number,
    isPersonalizable: {
      type: Boolean,
      default: false,
    },
    personalizationLabel: {
      type: String,
      default: "Add your personalization text",
    },
    personalizationMaxLength: {
      type: Number,
      default: 50,
    },
    hasVariants: {
      type: Boolean,
      default: false,
    },
    colors: [
      {
        id: String,
        name: String,
        hex: String,
      }
    ],
    sizes: [
      {
        id: String,
        name: String,
        inStock: {
          type: Boolean,
          default: true,
        },
      }
    ],
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
