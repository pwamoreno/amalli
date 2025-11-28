const SpecialOffer = require("../../models/SpecialOffer");

const getAllOffers = async (req, res) => {
  try {
    const offers = await SpecialOffer.find().sort({ createdAt: -1 });
    res.json({ success: true, data: offers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createNewOffer = async (req, res) => {
  try {
    const offer = new SpecialOffer(req.body);
    await offer.save();

    res.json({ succes: true, data: offer });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateOffer = async (req, res) => {
  try {
    const offer = await SpecialOffer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!offer) {
      return res
        .status(404)
        .json({ success: false, message: "Offer not found" });
    }

    res.json({ success: true, data: offer });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteOffer = async (req, res) => {
  try {
    const offer = await SpecialOffer.findByIdAndDelete(rew.params.id);

    if (!offer) {
      return res
        .status(404)
        .json({ success: false, message: "Offer not found" });
    }

    res.json({ success: true, message: "Offer deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAllOffers,
  createNewOffer,
  updateOffer,
  deleteOffer,
};
