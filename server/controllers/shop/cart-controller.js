const Cart = require("../../models/Cart");
const Product = require("../../models/Product");

const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity, personalizationText, variant } = req.body;

    // console.log("Received request:", { userId, productId, quantity, personalizationText, variant });

    if (!userId || !productId || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid or incomplete data provided",
      });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Validate personalization requirement
    if (product.isPersonalizable && !personalizationText?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Personalization text is required for this product",
      });
    }

    // Validate variant requirements
    if (product.hasVariants) {
      if (product.colors?.length > 0 && !variant?.color) {
        return res.status(400).json({
          success: false,
          message: "Please select a color",
        });
      }
      if (product.sizes?.length > 0 && !variant?.size) {
        return res.status(400).json({
          success: false,
          message: "Please select a size",
        });
      }
    }

    const isGuest = typeof userId === "string" && userId.startsWith("guest_");

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, isGuest, items: [] });
    }

    // Helper function to check if two items are the same
    const isSameItem = (item) => {
      // Must be same product
      if (item.productId.toString() !== productId) return false;

      // Check personalization match
      const itemPersonalization = item.personalizationText?.trim() || "";
      const newPersonalization = personalizationText?.trim() || "";
      if (itemPersonalization !== newPersonalization) return false;

      // Check variant match (color)
      const itemColorId = item.selectedColor?.id || null;
      const newColorId = variant?.color?.id || null;
      if (itemColorId !== newColorId) return false;

      // Check variant match (size)
      const itemSizeId = item.selectedSize?.id || null;
      const newSizeId = variant?.size?.id || null;
      if (itemSizeId !== newSizeId) return false;

      return true;
    };

    // Find existing item with same product, personalization, and variants
    const existingItemIndex = cart.items.findIndex(isSameItem);

    if (existingItemIndex === -1) {
      // Add new item - properly structure the color and size objects
      const newItem = {
        productId,
        quantity,
        personalizationText: personalizationText?.trim() || "",
      };

      // Only add color if it exists
      if (variant?.color) {
        newItem.selectedColor = {
          id: variant.color.id,
          name: variant.color.name,
          hex: variant.color.hex,
        };
      }

      // Only add size if it exists
      if (variant?.size) {
        newItem.selectedSize = {
          id: variant.size.id,
          name: variant.size.name,
        };
      }

      cart.items.push(newItem);
      // console.log("Adding new item:", newItem);
    } else {
      // Update quantity of existing item
      cart.items[existingItemIndex].quantity += quantity;
      // console.log("Updating existing item quantity");
    }

    await cart.save();
    // console.log("Cart saved successfully");

    res.status(200).json({
      success: true,
      data: cart,
    });
  } catch (error) {
    console.log("Error in addToCart:", error);
    res.status(500).json({
      success: false,
      message: "Error adding to cart",
      error: error.message,
    });
  }
};

const fetchCartItems = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID not found",
      });
    }

    const cart = await Cart.findOne({ userId }).populate({
      path: "items.productId",
      select: "image title price salePrice",
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    const validCartItems = cart.items.filter(
      (productItem) => productItem.productId
    );

    if (validCartItems.length < cart.items.length) {
      cart.items = validCartItems;
      await cart.save();
    }

    const populateCartItems = validCartItems.map((item) => ({
      productId: item.productId._id,
      image: item.productId.image,
      title: item.productId.title,
      price: item.productId.price,
      salePrice: item.productId.salePrice,
      quantity: item.quantity,
      personalizationText: item.personalizationText || "",
      selectedColor: item.selectedColor || null,
      selectedSize: item.selectedSize || null,
    }));

    res.status(200).json({
      success: true,
      data: {
        ...cart._doc,
        items: populateCartItems,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error getting cart items",
    });
  }
};

const updateCartItemQuantity = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    if (!userId || !productId || quantity <= 0) {
      return res.status(404).json({
        success: false,
        message: "Invalid or incomplete data provided",
      });
    }

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found",
      });
    }

    const findCurrentProductIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (!findCurrentProductIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found",
      });
    }

    cart.items[findCurrentProductIndex].quantity = quantity;

    await cart.save();

    await cart.populate({
      path: "items.productId",
      select: "image title price salePrice",
    });

    const populateCartItems = cart.items.map((item) => ({
      productId: item.productId ? item.productId._id : null,
      image: item.productId ? item.productId.image : null,
      title: item.productId ? item.productId.title : null,
      price: item.productId ? item.productId.price : null,
      salePrice: item.productId ? item.productId.salePrice : null,
      quantity: item.quantity,
      personalizationText: item.personalizationText || "",
      selectedColor: item.selectedColor || null,
      selectedSize: item.selectedSize || null,
    }));

    res.status(200).json({
      success: true,
      data: {
        ...cart._doc,
        items: populateCartItems,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error updating cart item quantity",
    });
  }
};

const deleteCartItem = async (req, res) => {
  try {
    const { userId, productId } = req.params;

    if (!userId || !productId) {
      return res.status(404).json({
        success: false,
        message: "Invalid or incomplete data provided",
      });
    }

    const cart = await Cart.findOne({ userId }).populate({
      path: "items.productId",
      select: "image title price salePrice",
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    cart.items = cart.items.filter(
      (item) => item.productId._id.toString() !== productId
    );

    await cart.save();

    await cart.populate({
      path: "items.productId",
      select: "image title price salePrice",
    });

    const populateCartItems = cart.items.map((item) => ({
      productId: item.productId ? item.productId._id : null,
      image: item.productId ? item.productId.image : null,
      title: item.productId ? item.productId.title : null,
      price: item.productId ? item.productId.price : null,
      salePrice: item.productId ? item.productId.salePrice : null,
      quantity: item.quantity,
      personalizationText: item.personalizationText || "",
      selectedColor: item.selectedColor || null,
      selectedSize: item.selectedSize || null,
    }));

    res.status(200).json({
      success: true,
      data: {
        ...cart._doc,
        items: populateCartItems,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error deleting from cart",
    });
  }
};

module.exports = {
  addToCart,
  updateCartItemQuantity,
  fetchCartItems,
  deleteCartItem,
};
