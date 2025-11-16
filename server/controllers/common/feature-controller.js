const Feature = require("../../models/Feature");

const addFeatureImage = async (req, res) => {
  try {

    // console.log("REQ BODY:", req.body);

    const { image } = req.body;

    const featureImages = new Feature({
      image,
    });

    await featureImages.save();

    res.status(201).json({
      success: true,
      data: featureImages,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Failed to add Feature image!" });
  }
};

const getFeatureImages = async (req, res) => {
  try {
    const images = await Feature.find({});

    res.status(200).json({
      success: true,
      data: images,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Failed to add Feature image!" });
  }
};

module.exports = { addFeatureImage, getFeatureImages };
