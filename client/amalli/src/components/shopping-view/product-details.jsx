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

const ProductDetailsDialog = ({ open, setOpen, productDetails }) => {
  const [reviewMessage, setReviewMessage] = useState("");
  const [rating, setRating] = useState(0);

  const dispatch = useDispatch();
  const { user, isAuthenticated, guestId } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { reviews } = useSelector((state) => state.shopReview);

  const userId = isAuthenticated ? user?.id : guestId;

  function handleRatingChange(getRating) {
    setRating(getRating);
  }

  function handleAddToCart(getCurrentProductId, getTotalStock) {
    // console.log(getCurrentProductId);
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
      })
    ).then((data) => {
      if (data?.payload.success) {
        dispatch(fetchCartItems(userId));
        toast("Product added to cart successfully.", {
          style: { background: "#22c55e", color: "white" },
        });
      }
    });
  }

  function handleDialogClose() {
    setOpen(false);
    dispatch(setProductDetails());
    setRating(0);
    setReviewMessage("");
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
            <span className="text-muted-foreground">({averageReview.toFixed(2)})</span>
          </div>
          <div className="mt-5 mb-5">
            {productDetails?.totalStock === 0 ? (
              <Button className="w-full opacity-60 cursor-not-allowed">
                Out of stock
              </Button>
            ) : (
              <Button
                className="w-full hover:bg-green-400 hover:cursor-pointer"
                onClick={() =>
                  handleAddToCart(
                    productDetails?._id,
                    productDetails?.totalStock
                  )
                }
              >
                Add to Cart
              </Button>
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
            
            {/* <div className="mt-10 flex flex-col gap-2">
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
            </div> */}

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
                    onClick={() => window.location.href = '/auth/login'}
                  >
                    Sign in
                  </Button>
                  {" "}to write a review
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
