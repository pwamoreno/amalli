const Order = require("../../models/Order");
const Cart = require("../../models/Cart");
const Product = require("../../models/Product");

const createOrder = async (req, res) => {
  try {
    const {
      userId,
      email,
      cartId,
      cartItems,
      addressInfo,
      totalAmount,
      orderStatus,
      paymentMethod,
      paymentStatus,
      orderDate,
      orderUpdateDate,
      paymentId,
      payerId,
      isGuest,
    } = req.body;

    const newOrder = new Order({
      userId,
      email,
      cartItems,
      addressInfo,
      totalAmount,
      orderStatus,
      paymentMethod,
      paymentStatus,
      orderDate,
      orderUpdateDate,
      paymentId,
      payerId,
      cartId,
      isGuest: isGuest || false,
    });

    const savedOrder = await newOrder.save();

    const amountInKobo = totalAmount * 100;

    // console.log("paystack sk: ", process.env.NEXT_PAYSTACK_SECRET_KEY)

    const session = await fetch(
      "https://api.paystack.co/transaction/initialize",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          amount: amountInKobo,
          channels: ["card"],
          callback_url: `${process.env.CLIENT_URL}/shop/payment-verification`,
          metadata: {
            items: cartItems,
            orderId: savedOrder._id,
            cancel_action: `${process.env.CLIENT_URL}/shop/checkout`,
          },
        }),
      }
    );

    const data = await session.json();

    if (!session.ok) {
      return res
        .status(500)
        .json({ success: false, message: "Checkout failed" });
    }

    res.status(200).json({
      success: true,
      authorization_url: data.data.authorization_url,
      reference: data.data.reference,
      orderId: savedOrder._id,
    });
  } catch (error) {
    console.log("Error creating order:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Failed to initialize payment" });
  }
};

const verifyPayment = async (req, res) => {
  const { reference, orderId } = req.body;

  if (!reference) {
    return res
      .status(400)
      .json({ success: false, message: "Missing reference" });
  }

  try {
    const response = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const responseData = await response.json();

    const data = responseData.data;

    // console.log("paystack verify data", data);

    if (data.status === "success") {
      const updatedOrder = await Order.findOneAndUpdate(
        { _id: orderId },
        {
          paymentId: data.reference,
          payerId: data.customer.customer_code,
          paymentStatus: "paid",
          orderStatus: "verified",
          orderUpdateDate: new Date(),
        },
        { new: true }
      );

      for (let item of updatedOrder.cartItems) {
        let product = await Product.findById(item.productId);

        if (!product) {
          return res
            .status(404)
            .json({
              success: false,
              message: `Product not found. ${product.title}`,
            });
        }

        product.totalStock -= item.quantity

        await product.save()
      }

      const getCartId = updatedOrder.cartId;
      if (getCartId) {
        await Cart.findByIdAndDelete(getCartId);
      }

      //   await updatedOrder.save();

      return res.status(200).json({
        success: true,
        message: "Payment verified successfully",
        order: updatedOrder,
      });
    }
  } catch (error) {
    console.error(
      "Error verifying payment: ",
      error.response?.data || error.message
    );
    res
      .status(500)
      .json({ success: false, message: "Payment verification failed" });
  }
};

const getAllOrdersByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await Order.find({ userId });

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

const getOrderDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    res.status(200).json({ suuccess: true, data: order });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Failed to get order details." });
  }
};

module.exports = {
  createOrder,
  verifyPayment,
  getAllOrdersByUserId,
  getOrderDetails,
};
