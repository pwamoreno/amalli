const PromoCode = require("../../models/PromoCode");

const validatePromo = async (req, res) => {
  try {
    const { code, userId, cartTotal, isGuest } = req.body;

    const promoCode = await PromoCode.findOne({ code: code.toUpperCase() });

    if (!promoCode) {
      res.json({ success: false, message: "Invalid promo code" });
    }

    if (!promoCode.isActive) {
      return res.json({
        success: false,
        message: "This promo code is no longer active",
      });
    }

    if (promoCode.expiryDate && new Date() > new Date(promoCode.expiryDate)) {
      return res.json({
        success: false,
        message: "This promo code has expired",
      });
    }

    if (promoCode.minPurchase && cartTotal < promoCode.minPurchase) {
      return res.json({
        success: false,
        message: `Minimum purchase of ₦${promoCode.minPurchase} required`,
      });
    }

    if (promoCode.applicableFor === "registered" && isGuest) {
      return res.json({
        success: false,
        message: "This promo code is only for registered users",
      });
    }

    if (promoCode.applicableFor === "guest" && !isGuest) {
      return res.json({
        success: false,
        message: "This promo code is only for guest users",
      });
    }

    if (promoCode.usageLimit && promoCode.usedCount >= promoCode.usageLimit) {
      return res.json({
        success: false,
        message: "This promo code has reached its usage limit",
      });
    }

    if (userId && promoCode.usedBy.some((u) => u.userId === userId)) {
      return res.json({
        success: false,
        message: "You have already used this promo code",
      });
    }

    res.json({
      success: true,
      promo: {
        code: promoCode.code,
        discountType: promoCode.discountType,
        discountValue: promoCode.discountValue,
        maxDiscount: promoCode.maxDiscount,
        description: promoCode.description,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const applyPromo = async (req, res) => {
  try {
    const { code, userId } = req.body;

    const promoCode = await PromoCode.findOneAndUpdate(
      { code: code.toUpperCase() },
      {
        $inc: { usedCount: 1 },
        $push: { usedBy: { userId, usedAt: new Date() } },
      },
      { new: true }
    );

    if (!promoCode) {
      return res.status(404).json({
        success: false,
        message: "Promo code not found",
      });
    }

    res.json({ success: true, data: promoCode });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
    validatePromo,
    applyPromo
}