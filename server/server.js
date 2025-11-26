require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRouter = require("./routes/auth/auth-routes");
const adminProductsRouter = require("./routes/admin/products-routes");
const adminOrderRouter = require("./routes/admin/order-routes");

const shopProductsRouter = require("./routes/shop/products-routes");
const shopCartRouter = require("./routes/shop/cart-routes");
const shopAddressRouter = require("./routes/shop/address-routes");
const shopOrderRouter = require("./routes/shop/order-routes");
const shopSearchRouter = require("./routes/shop/search-routes");
const shopReviewRouter = require("./routes/shop/review-routes");
const shopNewsletterRouter = require("./routes/shop/newsletter-routes");

// const webhookRouter = require("./routes/webhook/paystack-webhook-route")

const commonFeatureRouter = require("./routes/common/feature-routes");

const {
  paystackWebhook,
} = require("./controllers/webhook/paystack-webhook-controller");

//database connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected!"))
  .catch((error) => console.log(error));

const app = express();

const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: [`${process.env.CLIENT_URL}`, `${process.env.W_CLIENT_URL}`],
    methods: ["GET", "POST", "DELETE", "PUT", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cookie",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

// In prod
app.options('/.*/', cors());

app.post(
  "/api/paystack/webhook",
  express.raw({ type: "application/json" }),
  paystackWebhook
);

// app.use("/api/paystack/webhook", express.raw({ type: 'application/json' }));
// webhook MUST be here
// app.post("/api/paystack/webhook", express.raw({ type: "*/*" }),webhookRouter);

app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/admin/products", adminProductsRouter);
app.use("/api/admin/orders", adminOrderRouter);

app.use("/api/shop/products", shopProductsRouter);
app.use("/api/shop/cart", shopCartRouter);
app.use("/api/shop/address", shopAddressRouter);
app.use("/api/shop/order", shopOrderRouter);
app.use("/api/shop/search", shopSearchRouter);
app.use("/api/shop/review", shopReviewRouter);
app.use("/api/shop/newsletter", shopNewsletterRouter);

app.use("/api/common/feature", commonFeatureRouter);

app.listen(PORT, "0.0.0.0", () =>
  console.log(`Server is running on port ${PORT}`)
);
