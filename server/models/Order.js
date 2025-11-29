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
      // Personalization fields
      personalizationText: {
        type: String,
        default: null,
      },
      // Variant fields
      selectedColor: {
        id: String,
        name: String,
        hex: String,
      },
      selectedSize: {
        id: String,
        name: String,
      },
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
  // Promo Code Fields
  promoCode: {
    type: String,
    default: null,
    uppercase: true,
  },
  discountAmount: {
    type: Number,
    default: 0,
    min: 0,
  },
  cartTotal: {
    type: Number,
    required: true,
    min: 0,
  },
  // End of Promo Code Fields
  orderStatus: String,
  paymentMethod: String,
  paymentStatus: String,
  totalAmount: Number, // This should be: cartTotal - discountAmount + shippingCost
  orderDate: Date,
  orderUpdateDate: Date,
  paymentId: String,
  payerId: String,
  isGuest: {
    type: Boolean,
    default: false,
  },
});

// Add a virtual to verify total calculation
OrderSchema.virtual('calculatedTotal').get(function() {
  return (this.cartTotal || 0) - (this.discountAmount || 0) + (this.shippingCost || 0);
});

// Add a pre-save hook to validate total amount
OrderSchema.pre('save', function(next) {
  // Ensure cartTotal exists
  if (!this.cartTotal) {
    this.cartTotal = this.totalAmount - this.shippingCost + this.discountAmount;
  }
  
  // Validate that discount doesn't exceed cart total
  if (this.discountAmount > this.cartTotal) {
    return next(new Error('Discount amount cannot exceed cart total'));
  }
  
  next();
});

// Add indexes for better query performance
OrderSchema.index({ userId: 1, orderDate: -1 });
OrderSchema.index({ email: 1, orderDate: -1 });
OrderSchema.index({ promoCode: 1 });
OrderSchema.index({ orderStatus: 1 });

module.exports = mongoose.model("Order", OrderSchema);