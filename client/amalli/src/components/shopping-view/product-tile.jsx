import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { addCommasToNumbers } from "@/lib/utils";

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
      handleAddToCart(product?._id, product?.totalStock);
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
            className="w-full h-[300px] object-cover rounded-t-lg"
          />
          {product?.totalStock === 0 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
              Out of stock
            </Badge>
          ) : product?.totalStock < 10 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
              {`Only ${product?.totalStock} items left`}
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
          <h2 className="text-xl font-bold mb-2">{product?.title}</h2>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">
              {product?.category}
            </span>
            <span className="text-sm text-muted-foreground">
              {product?.brand}
            </span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span
              className={`${
                product.salePrice > 0 ? "line-through" : ""
              } text-lg font-semibold text-primary`}
            >
              ₦{addCommasToNumbers(product?.price)}
            </span>
            {product.salePrice > 0 ? (
              <span className="text-lg font-semibold text-primary">
                ₦{addCommasToNumbers(product?.salePrice)}
              </span>
            ) : null}
          </div>
        </CardContent>
      </div>
      <CardFooter>
        {product?.totalStock === 0 ? (
          <Button className="w-full opacity-60 cursor-not-allowed">
            Out of stock
          </Button>
        ) : (
          <Button
            onClick={handlePersonalizeButtonClick}
            className="w-full bg-[#02066f] hover:bg-green-500 hover:cursor-pointer"
          >
            {getButtonText()}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ShoppingProductTile;
