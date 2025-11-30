import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Badge } from "../ui/badge";
import { addCommasToNumbers } from "@/lib/utils";
import { PressableButton } from "../common/pressable-button";

const ShoppingProductTile = ({
  product,
  handleGetProductDetails,
  handleAddToCart,
}) => {
  // Check if product has multiple variant options
  const hasMultipleColorOptions = product?.colors?.length > 1;
  const hasMultipleSizeOptions = product?.sizes?.length > 1;
  const hasMultipleVariantOptions =
    hasMultipleColorOptions || hasMultipleSizeOptions;

  // For personalizable products or products with multiple variants, open details dialog
  const handlePersonalizeButtonClick = () => {
    if (product?.isPersonalizable || hasMultipleVariantOptions) {
      // Open dialog to personalize or select variants
      handleGetProductDetails(product?._id);
    } else {
      // Regular add to cart (no variants or only single option for each)
      // Build variant object with single options if they exist
      const variant = {};

      if (product?.colors?.length === 1) {
        variant.color = product.colors[0];
      }

      handleAddToCart(product?._id, "", variant);
    }
  };

  // Determine button text based on product configuration
  const getButtonText = () => {
    if (product?.isPersonalizable) {
      return "Personalize";
    }
    if (hasMultipleVariantOptions) {
      return "Select";
    }
    return "Add to Cart";
  };

  return (
    <Card className="w-full max-w-sm mx-auto pt-0">
      <div onClick={() => handleGetProductDetails(product?._id)}>
        <div className="relative">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-[200px] sm:h-[250px] max-md:h-[150px] object-cover rounded-t-lg"
          />
          {product?.totalStock === 0 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
              Out of stock
            </Badge>
          ) : product?.totalStock < 10 ? (
            <Badge className="absolute top-2 left-1 bg-red-500 hover:bg-red-600">
              {product?.totalStock < 2
                ? `Only ${product?.totalStock} item left`
                : `Only ${product?.totalStock} items left`}
            </Badge>
          ) : product?.salePrice > 0 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
              Sale
            </Badge>
          ) : null}
          {/* Personalization Badge - Bottom Center */}
          {product?.isPersonalizable && (
            <Badge className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-[#02066f] shadow-lg">
              Personalizable
            </Badge>
          )}
        </div>
        <CardContent className="p-4">
          <h2 className="md:text-xl text-sm font-bold md:font-semibold mb-2 line-clamp-1 min-h-[1.5rem] md:min-h-[2.5rem]">
            {product?.title}
          </h2>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">
              {product?.category}
            </span>
            <span className="text-sm text-muted-foreground">
              {product?.brand}
            </span>
          </div>
          <div className="flex justify-between items-center mb-1">
            <span
              className={`${
                product.salePrice > 0
                  ? "line-through text-muted-foreground"
                  : ""
              } text-lg font-semibold max-md:text-sm`}
            >
              ₦{addCommasToNumbers(product?.price)}
            </span>
            {product.salePrice > 0 ? (
              <span className="text-lg font-semibold text-primary max-md:text-sm">
                ₦{addCommasToNumbers(product?.salePrice)}
              </span>
            ) : null}
          </div>
        </CardContent>
      </div>
      <CardFooter>
        {product?.totalStock === 0 ? (
          <PressableButton className="w-full opacity-60 cursor-not-allowed">
            Out of stock
          </PressableButton>
        ) : (
          <PressableButton
            onClick={handlePersonalizeButtonClick}
            className="w-full bg-[#02066f] hover:bg-green-500 hover:cursor-pointer"
          >
            {getButtonText()}
          </PressableButton>
        )}
      </CardFooter>
    </Card>
  );
};

export default ShoppingProductTile;
