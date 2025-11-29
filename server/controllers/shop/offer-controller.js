const SpecialOffer = require("../../models/SpecialOffer");

const getAllActiveOffers = async (req, res) => {
  try {
    const now = new Date();

    const offers = await SpecialOffer.find({
      isActive: true,
      startDate: { $lte: now },
      endDate: { $gte: now },
    }).sort({ createdAt: -1 });

    res.json({ success: true, data: offers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getOfferByCategory = async (req, res) => {
  try {
    const now = new Date();

    const offers = await SpecialOffer.find({
      isActive: true,
      startDate: { $lte: now },
      endDate: { $gte: now },
      $or: [
        { offerType: "sitewide" },
        { offerType: "category", targetId: req.params.categoryId },
      ],
    });

    res.json({ success: true, data: offers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getOfferByProduct = async (req, res) => {
  try {
    const now = new Date();

    const offers = await SpecialOffer.find({
      isActive: true,
      startDate: { $lte: now },
      endDate: { $gte: now },
      $or: [
        { offerType: "sitewide" },
        { offerType: "product", targetId: req.params.productId },
      ],
    });

    res.json({ success: true, data: offers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
    getAllActiveOffers,
    getOfferByCategory,
    getOfferByProduct
}