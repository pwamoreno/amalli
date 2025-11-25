const Product = require("../../models/Product");

const getFilteredProducts = async (req, res) => {
  try {
    // console.log("Working");

    const { category = [], brand = [], sortBy = "price-lowtohigh" } = req.query;

    let filters = {};
    let sort = {};

    // if (category.length) {
    //   filters.category = { $in: category.split(",") };
    // }

    if (category.length) {
      const categories = category.split(",");

      // Check if "new-arrivals" is in the categories
      if (categories.includes("new-arrivals")) {
        // Remove "new-arrivals" from category filter
        const otherCategories = categories.filter((c) => c !== "new-arrivals");

        // If there are other categories, filter by them
        if (otherCategories.length > 0) {
          filters.category = { $in: otherCategories };
        }

        const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

        filters.createdAt = { $gte: sevenDaysAgo };

        // Sort by newest and optionally limit by date
        sort.createdAt = -1;
      } else {
        // Regular category filter
        filters.category = { $in: categories };
      }
    }

    if (brand.length) {
      filters.brand = { $in: brand.split(",") };
    }

    switch (sortBy) {
      case "price-lowtohigh":
        sort.price = 1;
        break;
      case "price-hightolow":
        sort.price = -1;
        break;
      case "title-atoz":
        sort.title = 1;
        break;
      case "title-ztoa":
        sort.title = -1;
        break;

      default:
        sort.price = 1;
        break;
    }

    const products = await Product.find(filters).sort(sort);

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

const getProductsDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

module.exports = { getFilteredProducts, getProductsDetails };
