import { StarIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
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

  // console.log(selectedVariant.color?.id, selectedVariant.size?.id);

  // console.log("Product Details:", productDetails);
  // console.log("hasVariants:", productDetails?.hasVariants);
  // console.log("Colors:", productDetails?.colors);
  // console.log("Sizes:", productDetails?.sizes);

  function handleRatingChange(getRating) {
    setRating(getRating);
  }

  function handleAddToCart(getCurrentProductId, getTotalStock) {
    // Check if personalization is required but not provided
    // if (productDetails?.isPersonalizable && !personalizationText.trim()) {
    //   toast("Please enter personalization text before adding to cart.", {
    //     style: { background: "#fa113d", color: "white" },
    //   });
    //   return;
    // }
    // console.log(getCurrentProductId);

    // Check variant selection
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
    // console.log(user?.userName);

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

  // console.log(reviews);

  const averageReview =
    reviews && reviews.length > 0
      ? reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
        reviews.length
      : 0;

  const isAddToCartDisabled =
    (productDetails?.isPersonalizable && !personalizationText.trim()) ||
    (productDetails?.hasVariants &&
      ((productDetails.colors?.length > 0 && !selectedVariant.color) ||
        (productDetails.sizes?.length > 0 && !selectedVariant.size)));

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]">
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={productDetails?.image}
            alt={productDetails?.title}
            width={600}
            height={600}
            className="aspect-square w-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-center gap-3">
          <div>
            <h1 className="text-3xl font-extrabold">{productDetails?.title}</h1>
            {/* Personalization Badge inline with title */}
            {productDetails?.isPersonalizable && (
              <Badge className="bg-[#02066f]">Personalizable</Badge>
            )}
            <p className="text-muted-foreground">
              {productDetails?.description}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p
              className={`text-xl font-bold text-primary ${
                (productDetails?.salePrice ?? 0) > 0 ? "line-through" : ""
              }`}
            >
              ₦{addCommasToNumbers(productDetails?.price ?? 0)}
            </p>
            {(productDetails?.salePrice ?? 0) > 0 ? (
              <p className="text-xl font-bold text-muted-foreground">
                ₦{addCommasToNumbers(productDetails?.salePrice ?? 0)}
              </p>
            ) : null}
          </div>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-0.5">
              <StarRating rating={averageReview} />
            </div>
            <span className="text-muted-foreground">
              ({averageReview.toFixed(2)})
            </span>
          </div>

          {/* Variant Selector */}
          {productDetails?.hasVariants && (
            <div className="mt-4">
              <VariantSelector
                product={productDetails}
                onVariantChange={setSelectedVariant}
                selectedVariant={selectedVariant}
              />
            </div>
          )}

          {/* Personalization Input Section */}
          {productDetails?.isPersonalizable && (
            <div className="mt-4 mb-2 space-y-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start gap-2">
                <div className="flex-1">
                  <Label
                    htmlFor="personalization"
                    className="text-base font-semibold text-blue-900"
                  >
                    {productDetails?.personalizationLabel ||
                      "Personalize this product"}
                  </Label>
                  <p className="text-sm text-blue-700 mt-1">
                    Make this special with your custom text (required)
                  </p>
                </div>
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
                  className="bg-white border-blue-300 focus:border-blue-500 focus:ring-blue-500"
                  maxLength={maxLength}
                />
                <div className="flex justify-between items-center text-sm">
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
                    <p className="text-base font-serif text-gray-800">
                      "{personalizationText}"
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
          <div className="mt-5 mb-5">
            {productDetails?.totalStock === 0 ? (
              <Button className="w-full opacity-60 cursor-not-allowed">
                Out of stock
              </Button>
            ) : (
              <Button
                className={`w-full ${
                  isAddToCartDisabled
                    ? "opacity-60 cursor-not-allowed"
                    : "bg-[#02066f] hover:bg-green-400 hover:cursor-pointer"
                }`}
                onClick={() =>
                  handleAddToCart(
                    productDetails?._id,
                    productDetails?.totalStock
                  )
                }
                disabled={isAddToCartDisabled}
              >
                {productDetails?.isPersonalizable
                  ? personalizationText.trim()
                    ? "Add Personalized Item to Cart"
                    : "Enter Personalization to Continue"
                  : productDetails?.hasVariants
                  ? selectedVariant.color?.id || selectedVariant.size?.id
                    ? "Add to Cart"
                    : "Select a size or color to continue"
                  : "Add to Cart"}
              </Button>
            )}
            {/* Helper text for personalization requirement */}
            {productDetails?.isPersonalizable &&
              !personalizationText.trim() && (
                <p className="text-xs text-center text-blue-600 mt-2">
                  Personalization text is required before adding to cart
                </p>
              )}
          </div>
          <Separator />
          <div className="max-h-[300px] overflow-auto">
            <h2 className="text-xl font-bold mb-4">Reviews</h2>
            <div className="grid gap-6">
              {reviews && reviews.length > 0 ? (
                reviews.map((reviewItem) => (
                  <div className="flex gap-4">
                    <Avatar className="w-10 h-10 border">
                      <AvatarFallback>
                        {reviewItem?.username[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold">{reviewItem?.username}</h3>
                      </div>
                      <div className="flex items-center gap-0.5">
                        <StarRating rating={reviewItem?.reviewValue} />
                      </div>
                      <p className="text-muted-foreground">
                        {reviewItem?.reviewMessage}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <h1>No Reviews</h1>
              )}
            </div>
            {isAuthenticated ? (
              <div className="mt-10 flex flex-col gap-2">
                <Label>Write a review</Label>
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
                />
                <Button
                  onClick={handleAddReview}
                  disabled={reviewMessage.trim() === ""}
                  className="hover:bg-green-400 hover:cursor-pointer"
                >
                  Submit
                </Button>
              </div>
            ) : (
              <div className="mt-10 p-4 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground">
                  <Button
                    variant="link"
                    className="p-0 h-auto font-semibold"
                    onClick={() => (window.location.href = "/auth/login")}
                  >
                    Sign in
                  </Button>{" "}
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
//           <Button
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
