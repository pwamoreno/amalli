const PromoCode = require("../../models/PromoCode");

const getAllPromoCodes = async (req, res) => {
  try {
    const PromoCodes = await PromoCode.find().sort({ createdAt: -1 });

    res.json({ success: true, data: PromoCodes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createNewPromoCode = async (req, res) => {
  try {
    const promoCode = new PromoCode(req.body);
    await promoCode.save();

    res.json({ success: true, data: promoCode });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({
        success: false,
        message: "Promo code already exists",
      });
    } else {
      res.status(500).json({ success: false, message: error.message });
    }
  }
};

const updatePromoCode = async (req, res) => {
  try {
    const promoCode = await PromoCode.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!promoCode) {
      return res
        .status(404)
        .json({ success: false, message: "Promo code not found" });
    }

    res.json({ success: true, data: promoCode });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deletePromoCode = async (req, res) => {
  try {
    const promoCode = await PromoCode.findByIdAndDelete(req.params.id);

    if (!promoCode) {
      return res
        .status(404)
        .json({ success: false, message: "Promo code not found" });
    }

    res.json({success: true, message: "Promo code deleted"})

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


module.exports = {
    getAllPromoCodes,
    createNewPromoCode,
    updatePromoCode,
    deletePromoCode
}