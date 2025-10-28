const Order = require("../../models/Order");

const getAllUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({});

    if (!orders.length) {
      return res
        .status(404)
        .json({ success: false, message: "No orders found" });
    }

    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Failed to get all user orders." });
  }
};

module.exports = { getAllUserOrders };
