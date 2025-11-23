import { PressableButton } from "@/components/common/pressable-button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/products-slice";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { useNavigate } from "react-router-dom";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { toast } from "sonner";
import { getFeatureImages } from "@/store/common-slice";
import {
  Anklet,
  Bracelet,
  Earrings,
  Necklace,
  Ring,
} from "@/components/icons/AmalliLogo";

const categoriesWithIcon = [
  { id: "necklaces", label: "Necklaces", icon: Necklace },
  { id: "earrings", label: "Earrings", icon: Earrings },
  { id: "bracelets", label: "Bracelets", icon: Bracelet },
  { id: "rings", label: "Rings", icon: Ring },
  { id: "anklets", label: "Anklets", icon: Anklet },
];

const ShoppingHome = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  const { featureImageList } = useSelector((state) => state.commonFeature);
  // const { cartItems } = useSelector((state) => state.shopCart);

  const { user, isAuthenticated, guestId } = useSelector((state) => state.auth);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // console.log(productList);

  const userId = isAuthenticated ? user?.id : guestId;

  function handleNavigateToListingPage(getCurrentItem, section) {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      [section]: [getCurrentItem.id],
    };

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate("/shop/listing");
  }

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  function handleAddToCart(getCurrentProductId) {
    // console.log(getCurrentProductId);
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

  useEffect(() => {
    if (productDetails !== null) {
      setOpenDetailsDialog(true);
    }
  }, [productDetails]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [featureImageList.length]);

  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: {},
        sortParams: "price-lowtohigh",
      })
    );
  }, [dispatch]);

  useEffect(() => {
    if (userId) {
      dispatch(fetchCartItems(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
        {featureImageList && featureImageList.length > 0
          ? featureImageList.map((slide, index) => (
              <img
                src={slide?.image}
                alt="banner-img"
                key={index}
                className={`${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                } absolute top-0 left-0 w-full h-full  max-md:object-cover object-cover transition-opacity duration-1000`}
              />
            ))
          : null}
        <PressableButton
          variant="outline"
          size="icon"
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80 hover:cursor-pointer"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) =>
                (prevSlide - 1 + featureImageList.length) %
                featureImageList.length
            )
          }
        >
          <ChevronLeft className="w-4 h-4" />
        </PressableButton>
        <PressableButton
          variant="outline"
          size="icon"
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80 hover:cursor-pointer"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) => (prevSlide + 1) % featureImageList.length
            )
          }
        >
          <ChevronRight className="w-4 h-4" />
        </PressableButton>
      </div>
      <div className="py-12 bg-gray-50">
        <h2 className="text-xl lg:text-3xl font-bold text-center mb-8">
          Shop by category
        </h2>
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex gap-2 sm:gap-4 overflow-x-auto sm:grid sm:grid-cols-5 pb-2 sm:pb-0 scrollbar-hide">
            {categoriesWithIcon.map((categoryItem, index) => (
              <Card
                key={index}
                className="cursor-pointer hover:shadow-lg transition-shadow flex-shrink-0 sm:flex-shrink"
                onClick={() =>
                  handleNavigateToListingPage(categoryItem, "category")
                }
              >
                <CardContent className="flex flex-col items-center justify-center p-3 sm:p-6 w-[70px] h-[70px] sm:w-auto sm:h-auto sm:aspect-auto aspect-square">
                  <categoryItem.icon
                    className={`w-8 h-8 sm:w-16 sm:h-16 mb-1 sm:mb-3 text-primary`}
                  />
                  <span className="font-bold text-center text-[10px] sm:text-base leading-tight">
                    {categoryItem.label}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <section className="py-12">
        <div className="container mx-auto px-2 lg:px-4">
          <h2 className="text-xl lg:text-3xl font-bold text-center mb-8">
            Featured Products
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 max-w-6xl mx-auto">
            {productList && productList.length > 0
              ? productList
                  .slice(0, 4)
                  .map((productItem) => (
                    <ShoppingProductTile
                      key={productItem._id}
                      handleGetProductDetails={handleGetProductDetails}
                      product={productItem}
                      handleAddToCart={handleAddToCart}
                    />
                  ))
              : null}
          </div>
        </div>
      </section>
      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
};

export default ShoppingHome;
