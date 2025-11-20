// helpers/paystack.js
const Order = require("../models/Order");
const Product = require("../models/Product");
const Cart = require("../models/Cart");

const updateOrderAfterSuccessfulPayment = async (
  orderId,
  paystackData
) => {
  const order = await Order.findById(orderId);

  if (!order) return { success: false, message: "Order not found" };

  // Prevent double-processing
  if (order.paymentStatus === "paid") {
    return { success: true, message: "Order already processed", order };
  }

  // Update order details
  order.paymentId = paystackData.reference;
  order.payerId = paystackData.customer?.customer_code;
  order.paymentStatus = "paid";
  order.orderStatus = "verified";
  order.orderUpdateDate = new Date();

  await order.save();

  // Update stock
  for (let item of order.cartItems) {
    let product = await Product.findById(item.productId);
    if (!product) continue;
    product.totalStock -= item.quantity;
    await product.save();
  }

  // Clear cart
  if (order.cartId) {
    await Cart.findByIdAndDelete(order.cartId);
  }

  return { success: true, message: "Order updated", order };
};


module.exports = {
    updateOrderAfterSuccessfulPayment
}