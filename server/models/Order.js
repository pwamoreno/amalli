const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  userId: String,
  email: String,
  cartId: String,
  cartItems: [
    {
      productId: String,
      title: String,
      image: String,
      price: String,
      quantity: Number,
    },
  ],
  addressInfo: {
    addressId: String,
    address: String,
    city: String,
    zipcode: String,
    phone: String,
    notes: String,
  },
  shippingInfo: {
    type: mongoose.Schema.Types.Mixed, // Flexible structure
    required: true,
  },
  shippingCost: {
    type: Number,
    required: true,
  },
  orderStatus: String,
  paymentMethod: String,
  paymentStatus: String,
  totalAmount: Number,
  orderDate: Date,
  orderUpdateDate: Date,
  paymentId: String,
  payerId: String,
  isGuest: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Order", OrderSchema);
