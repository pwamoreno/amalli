const crypto = require("crypto");
const { updateOrderAfterSuccessfulPayment } = require("../../helpers/paystack");

const paystackWebhook = async (req, res) => {
  try {
    const hash = crypto
      .createHmac("sha512", process.env.PAYSTACK_SECRET_KEY)
      .update(req.body)
      .digest("hex");

    if (hash !== req.headers["x-paystack-signature"]) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid signature" });
    }

    const event = JSON.parse(req.body);
    // console.log("Webhook event:", event.event);

    if (event.event === "charge.success") {
      const orderId = event.data.metadata?.orderId;

      if (!orderId) {
        return res
          .status(400)
          .json({ success: false, message: "Missing orderId" });
      }

      const result = await updateOrderAfterSuccessfulPayment(
        orderId,
        event.data
      );

      // console.log(result);

      return res.status(200).json(result);
    }

    return res.status(200).json({ success: true, message: "Event received" });
  } catch (error) {
    // console.error("Webhook Error:", error.message);
    return res.status(200).json({ success: false, message: "Error processed" });
  }
};

// const paystackWebhook = async (req, res) => {
//   try {
//     // Verify webhook signature from Paystack
//     const hash = crypto
//       .createHmac("sha512", process.env.PAYSTACK_SECRET_KEY)
//       .update(JSON.stringify(req.body))
//       .digest("hex");

//     if (hash !== req.headers["x-paystack-signature"]) {
//       console.log("❌ Invalid webhook signature");
//       return res
//         .status(401)
//         .json({ success: false, message: "Invalid signature" });
//     }

//     const event = req.body;
//     console.log("✅ Webhook received:", event.event);

//     // Handle successful charge
//     if (event.event === "charge.success") {
//       const { reference, customer, metadata } = event.data;
//       const orderId = metadata?.orderId;

//       if (!orderId) {
//         console.log("❌ No orderId in webhook metadata");
//         return res
//           .status(400)
//           .json({ success: false, message: "Missing orderId" });
//       }

//       // Check if order already processed
//       const existingOrder = await Order.findById(orderId);
//       if (!existingOrder) {
//         console.log("❌ Order not found:", orderId);
//         return res
//           .status(404)
//           .json({ success: false, message: "Order not found" });
//       }

//       // Skip if already paid (prevents double processing)
//       if (existingOrder.paymentStatus === "paid") {
//         console.log("⚠️ Order already paid:", orderId);
//         return res
//           .status(200)
//           .json({ success: true, message: "Already processed" });
//       }

//       console.log("💰 Processing payment for order:", orderId);

//       // Update order
//       const updatedOrder = await Order.findOneAndUpdate(
//         { _id: orderId },
//         {
//           paymentId: reference,
//           payerId: customer.customer_code,
//           paymentStatus: "paid",
//           orderStatus: "verified",
//           orderUpdateDate: new Date(),
//         },
//         { new: true }
//       );

//       // Update product stock
//       for (let item of updatedOrder.cartItems) {
//         let product = await Product.findById(item.productId);

//         if (!product) {
//           console.log(`⚠️ Product not found: ${item.productId}`);
//           continue; // Skip missing products instead of failing entire webhook
//         }

//         product.totalStock -= item.quantity;
//         await product.save();
//         console.log(`📦 Stock updated for: ${product.title}`);
//       }

//       // Clear cart
//       const getCartId = updatedOrder.cartId;
//       if (getCartId) {
//         await Cart.findByIdAndDelete(getCartId);
//         console.log("🛒 Cart cleared:", getCartId);
//       }

//       console.log("✅ Webhook processed successfully for order:", orderId);

//       // IMPORTANT: Always return 200 to Paystack
//       return res
//         .status(200)
//         .json({ success: true, message: "Webhook processed" });
//     }

//     // Handle other events (optional)
//     if (event.event === "charge.failed") {
//       console.log("❌ Payment failed for reference:", event.data.reference);
//       // You can update order status to 'failed' here if needed
//     }

//     // Always return 200 for unhandled events
//     res.status(200).json({ success: true, message: "Event received" });
//   } catch (error) {
//     console.error("❌ Webhook error:", error.message);
//     // IMPORTANT: Still return 200 to prevent Paystack from retrying
//     res.status(200).json({ success: false, message: "Error processed" });
//   }
// };

module.exports = {
  paystackWebhook,
};
