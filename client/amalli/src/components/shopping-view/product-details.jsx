import { StarIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { PressableButton } from "../common/pressable-button";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { toast } from "sonner";
import { setProductDetails } from "@/store/shop/products-slice";
import { Label } from "../ui/label";
import StarRating from "../common/star-rating";
import { useEffect, useState } from "react";
import { addCommasToNumbers } from "@/lib/utils";
import { addReview, getReviews } from "@/store/shop/review-slice";
import { Badge } from "../ui/badge";
import VariantSelector from "./variant-selector";

const ProductDetailsDialog = ({ open, setOpen, productDetails }) => {
  const [reviewMessage, setReviewMessage] = useState("");
  const [selectedVariant, setSelectedVariant] = useState({
    color: null,
    size: null,
  });
  const [rating, setRating] = useState(0);
  const [personalizationText, setPersonalizationText] = useState("");

  const dispatch = useDispatch();
  const { user, isAuthenticated, guestId } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { reviews } = useSelector((state) => state.shopReview);

  const userId = isAuthenticated ? user?.id : guestId;

  const maxLength = productDetails?.personalizationMaxLength || 50;

  function handleRatingChange(getRating) {
    setRating(getRating);
  }

  function handleAddToCart(getCurrentProductId, getTotalStock) {
    if (productDetails?.hasVariants) {
      if (productDetails.colors?.length > 0 && !selectedVariant.color) {
        toast("Please select a color.", {
          style: { background: "#fa113d", color: "white" },
        });
        return;
      }
      if (productDetails.sizes?.length > 0 && !selectedVariant.size) {
        toast("Please select a size.", {
          style: { background: "#fa113d", color: "white" },
        });
        return;
      }
    }

    let getCartItems = cartItems.items || [];

    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId === getCurrentProductId
      );

      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        if (getQuantity + 1 > getTotalStock) {
          toast(`Only ${getQuantity} items can be added.`, {
            style: { background: "#fa113d", color: "white" },
          });

          return;
        }
      }
    }

    // const payload = {
    //   userId: userId,
    //   productId: getCurrentProductId,
    //   quantity: 1,
    //   personalizationText: personalizationText.trim() || "",
    //   selectedColor: selectedVariant?.color,
    //   selectedSize: selectedVariant?.size,
    // };

    // console.log("Sending to backend:", payload);

    dispatch(
      addToCart({
        userId: userId,
        productId: getCurrentProductId,
        quantity: 1,
        personalizationText: personalizationText.trim() || "",
        variant: selectedVariant,
      })
    ).then((data) => {
      if (data?.payload.success) {
        dispatch(fetchCartItems(userId));
        const message = productDetails?.isPersonalizable
          ? "Personalized product added to cart successfully."
          : "Product added to cart successfully.";
        toast(message, {
          style: { background: "#22c55e", color: "white" },
        });
        setPersonalizationText("");
      } else {
        console.error("Add to cart failed:", data);
        toast("Failed to add product to cart.", {
          style: { background: "#fa113d", color: "white" },
        });
      }
    });
  }

  function handleDialogClose() {
    setOpen(false);
    dispatch(setProductDetails());
    setRating(0);
    setReviewMessage("");
    setPersonalizationText("");
    setSelectedVariant({
      color: null,
      size: null,
    });
  }

  function handleAddReview() {
    if (!isAuthenticated) {
      toast("Please sign in to leave a review.", {
        style: { background: "#fa113d", color: "white" },
      });
      return;
    }

    dispatch(
      addReview({
        productId: productDetails?._id,
        userId: user?.id,
        username: user?.userName,
        reviewMessage,
        reviewValue: rating,
      })
    ).then((data) => {
      if (data.payload.success) {
        setRating(0);
        setReviewMessage("");
        dispatch(getReviews(productDetails?._id));
        toast("Product review added successfully.", {
          style: { background: "#22c55e", color: "white" },
        });
      }
    });
  }

  useEffect(() => {
    if (productDetails !== null) {
      dispatch(getReviews(productDetails?._id));
    }
  }, [productDetails, dispatch]);

  const averageReview =
    reviews && reviews.length > 0
      ? reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
        reviews.length
      : 0;

  // Improved disabled logic with helper function
  const isAddToCartDisabled =
    productDetails?.totalStock === 0 ||
    (productDetails?.isPersonalizable && !personalizationText.trim()) ||
    (productDetails?.hasVariants &&
      ((productDetails.colors?.length > 0 && !selectedVariant.color) ||
        (productDetails.sizes?.length > 0 && !selectedVariant.size)));

  // Improved button text logic
  const getButtonText = () => {
    if (productDetails?.totalStock === 0) {
      return "Out of stock";
    }

    if (productDetails?.isPersonalizable) {
      return personalizationText.trim()
        ? "Add Personalized Item to Cart"
        : "Enter Personalization to Continue";
    }

    if (productDetails?.hasVariants) {
      const needsColor =
        productDetails.colors?.length > 0 && !selectedVariant.color;
      const needsSize =
        productDetails.sizes?.length > 0 && !selectedVariant.size;

      if (needsColor && needsSize) return "Select Color & Size to Continue";
      if (needsColor) return "Select Color to Continue";
      if (needsSize) return "Select Size to Continue";

      return "Add to Cart";
    }

    return "Add to Cart";
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-4 sm:p-6 lg:p-8 max-w-[95vw] sm:max-w-[90vw] lg:max-w-[80vw] xl:max-w-[70vw] max-h-[90vh] overflow-y-auto [&>button]:absolute [&>button]:right-6 [&>button]:top-6 [&>button]:z-50 [&>button]:text-white [&>button]:bg-black/50 [&>button]:backdrop-blur-sm [&>button]:rounded-sm [&>button]:p-1.5 [&>button:hover]:bg-black/70">
        {/* Image Section */}
        <div className="relative overflow-hidden rounded-lg order-1 lg:order-1">
          <img
            src={productDetails?.image}
            alt={productDetails?.title}
            width={600}
            height={600}
            className="aspect-square w-full object-cover"
          />
        </div>

        {/* Content Section */}
        <div className="flex flex-col gap-4 order-2 lg:order-2">
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold leading-tight">
                {productDetails?.title}
              </h1>
              {productDetails?.isPersonalizable && (
                <Badge className="bg-[#02066f] self-start">
                  Personalizable
                </Badge>
              )}
            </div>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              {productDetails?.description}
            </p>
          </div>

          {/* Price Section */}
          <div className="flex items-center justify-between">
            <p
              className={`text-lg sm:text-xl font-bold ${
                (productDetails?.salePrice ?? 0) > 0
                  ? "line-through text-muted-foreground"
                  : ""
              }`}
            >
              ₦{addCommasToNumbers(productDetails?.price ?? 0)}
            </p>
            {(productDetails?.salePrice ?? 0) > 0 ? (
              <p className="text-lg sm:text-xl font-bold">
                ₦{addCommasToNumbers(productDetails?.salePrice ?? 0)}
              </p>
            ) : null}
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5">
              <StarRating rating={averageReview} />
            </div>
            <span className="text-muted-foreground text-sm">
              ({averageReview.toFixed(2)})
            </span>
          </div>

          {/* Variant Selector */}
          {productDetails?.hasVariants && (
            <div className="mt-2">
              <VariantSelector
                product={productDetails}
                onVariantChange={setSelectedVariant}
                selectedVariant={selectedVariant}
              />
            </div>
          )}

          {/* Personalization Input Section */}
          {productDetails?.isPersonalizable && (
            <div className="mt-2 space-y-3 p-3 sm:p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="space-y-2">
                <Label
                  htmlFor="personalization"
                  className="text-sm sm:text-base font-semibold text-blue-900"
                >
                  {productDetails?.personalizationLabel ||
                    "Personalize this product"}
                </Label>
                <p className="text-xs sm:text-sm text-blue-700">
                  Make this special with your custom text (required)
                </p>
              </div>

              <div className="space-y-2">
                <Input
                  id="personalization"
                  placeholder="Enter your personalization text..."
                  value={personalizationText}
                  onChange={(e) => {
                    if (e.target.value.length <= maxLength) {
                      setPersonalizationText(e.target.value);
                    }
                  }}
                  className="bg-white border-blue-300 focus:border-blue-500 focus:ring-blue-500 text-sm sm:text-base"
                  maxLength={maxLength}
                />
                <div className="flex justify-between items-center text-xs sm:text-sm">
                  <span
                    className={`${
                      personalizationText.length === maxLength
                        ? "text-orange-600 font-medium"
                        : "text-muted-foreground"
                    }`}
                  >
                    {personalizationText.length}/{maxLength} characters
                  </span>
                  {personalizationText.length === maxLength && (
                    <span className="text-orange-600 font-medium">
                      Character limit reached
                    </span>
                  )}
                </div>

                {/* Preview */}
                {personalizationText && (
                  <div className="bg-white p-3 rounded border border-blue-200">
                    <p className="text-xs font-medium text-blue-900 mb-1">
                      Preview:
                    </p>
                    <p className="text-sm sm:text-base font-serif text-gray-800">
                      "{personalizationText}"
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Add to Cart Button */}
          <div className="mt-4 mb-4">
            <PressableButton
              className={`w-full text-sm sm:text-base ${
                isAddToCartDisabled
                  ? "opacity-60 cursor-not-allowed"
                  : "bg-[#02066f] hover:bg-green-400 hover:cursor-pointer"
              }`}
              onClick={() =>
                handleAddToCart(productDetails?._id, productDetails?.totalStock)
              }
              disabled={isAddToCartDisabled}
              size="lg"
            >
              {getButtonText()}
            </PressableButton>

            {/* Helper messages */}
            {productDetails?.isPersonalizable &&
              !personalizationText.trim() && (
                <p className="text-xs text-center text-blue-600 mt-2">
                  Personalization text is required
                </p>
              )}

            {productDetails?.hasVariants && isAddToCartDisabled && (
              <p className="text-xs text-center text-orange-600 mt-2">
                {productDetails.colors?.length > 0 &&
                  !selectedVariant.color &&
                  "Please select a color"}
                {productDetails.colors?.length > 0 &&
                  !selectedVariant.color &&
                  productDetails.sizes?.length > 0 &&
                  !selectedVariant.size &&
                  " and "}
                {productDetails.sizes?.length > 0 &&
                  !selectedVariant.size &&
                  "Please select a size"}
              </p>
            )}
          </div>

          <Separator />

          {/* Reviews Section */}
          <div className="max-h-[300px] overflow-auto">
            <h2 className="text-lg sm:text-xl font-bold mb-4">Reviews</h2>
            <div className="space-y-4">
              {reviews && reviews.length > 0 ? (
                reviews.map((reviewItem, index) => (
                  <div key={index} className="flex gap-3">
                    <Avatar className="w-8 h-8 sm:w-10 sm:h-10 border flex-shrink-0">
                      <AvatarFallback>
                        {reviewItem?.username[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-1 flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-sm sm:text-base truncate">
                          {reviewItem?.username}
                        </h3>
                      </div>
                      <div className="flex items-center gap-0.5">
                        <StarRating rating={reviewItem?.reviewValue} />
                      </div>
                      <p className="text-muted-foreground text-sm sm:text-base break-words">
                        {reviewItem?.reviewMessage}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground text-center py-4">
                  No Reviews
                </p>
              )}
            </div>

            {/* Add Review Section */}
            {isAuthenticated ? (
              <div className="mt-6 space-y-3">
                <Label className="text-sm sm:text-base">Write a review</Label>
                <div className="flex gap-0.5">
                  <StarRating
                    rating={rating}
                    handleRatingChange={handleRatingChange}
                  />
                </div>
                <Input
                  name="reviewMessage"
                  value={reviewMessage}
                  onChange={(event) => setReviewMessage(event.target.value)}
                  placeholder="Write a review..."
                  className="text-sm sm:text-base"
                />
                <PressableButton
                  onClick={handleAddReview}
                  disabled={reviewMessage.trim() === ""}
                  className="hover:bg-green-400 hover:cursor-pointer w-full sm:w-auto"
                  size="sm"
                >
                  Submit Review
                </PressableButton>
              </div>
            ) : (
              <div className="mt-6 p-3 sm:p-4 bg-muted rounded-lg text-center">
                <p className="text-xs sm:text-sm text-muted-foreground">
                  <PressableButton
                    variant="link"
                    className="p-0 h-auto font-semibold text-xs sm:text-sm"
                    onClick={() => (window.location.href = "/auth/login")}
                  >
                    Sign in
                  </PressableButton>{" "}
                  to write a review
                </p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailsDialog;

// const ProductDetailsDialog = ({ open, setOpen, productDetails }) => {
//   // ... your existing state and variables

//   // Fixed disabled logic
//   const isAddToCartDisabled =
//     productDetails?.totalStock === 0 ||
//     (productDetails?.isPersonalizable && !personalizationText.trim()) ||
//     (productDetails?.hasVariants &&
//      ((productDetails.colors?.length > 0 && !selectedVariant.color) ||
//       (productDetails.sizes?.length > 0 && !selectedVariant.size)));

//   // Improved button text logic
//   const getButtonText = () => {
//     if (productDetails?.totalStock === 0) {
//       return "Out of stock";
//     }

//     if (productDetails?.isPersonalizable) {
//       return personalizationText.trim()
//         ? "Add Personalized Item to Cart"
//         : "Enter Personalization to Continue";
//     }

//     if (productDetails?.hasVariants) {
//       const needsColor = productDetails.colors?.length > 0 && !selectedVariant.color;
//       const needsSize = productDetails.sizes?.length > 0 && !selectedVariant.size;

//       if (needsColor && needsSize) return "Select Color & Size to Continue";
//       if (needsColor) return "Select Color to Continue";
//       if (needsSize) return "Select Size to Continue";

//       return "Add to Cart";
//     }

//     return "Add to Cart";
//   };

//   return (
//     <Dialog open={open} onOpenChange={handleDialogClose}>
//       <DialogContent className="grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]">
//         {/* ... your existing JSX ... */}

//         <div className="mt-5 mb-5">
//           <PressableButton
//             className={`w-full ${
//               isAddToCartDisabled
//                 ? "opacity-60 cursor-not-allowed"
//                 : "bg-[#02066f] hover:bg-green-400 hover:cursor-pointer"
//             }`}
//             onClick={() =>
//               handleAddToCart(
//                 productDetails?._id,
//                 productDetails?.totalStock
//               )
//             }
//             disabled={isAddToCartDisabled}
//           >
//             {getButtonText()}
//           </Button>

//           {/* Helper messages */}
//           {productDetails?.isPersonalizable && !personalizationText.trim() && (
//             <p className="text-xs text-center text-blue-600 mt-2">
//               Personalization text is required
//             </p>
//           )}

//           {productDetails?.hasVariants && isAddToCartDisabled && (
//             <p className="text-xs text-center text-orange-600 mt-2">
//               {productDetails.colors?.length > 0 && !selectedVariant.color && "Please select a color"}
//               {productDetails.colors?.length > 0 && !selectedVariant.color &&
//                productDetails.sizes?.length > 0 && !selectedVariant.size && " and "}
//               {productDetails.sizes?.length > 0 && !selectedVariant.size && "Please select a size"}
//             </p>
//           )}
//         </div>

//         {/* ... rest of your JSX ... */}
//       </DialogContent>
//     </Dialog>
//   );
// };
