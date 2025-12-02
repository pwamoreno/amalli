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

module.exports = {
  paystackWebhook,
};
