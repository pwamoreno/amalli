import { useEffect, useState } from "react";
import { ArrowLeft, Search, ShoppingCart, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import { fetchProductDetails } from "@/store/shop/products-slice";
import { fetchAllFilteredProducts } from "@/store/shop/products-slice";
import { Sheet } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import UserCartWrapper from "@/components/shopping-view/cart-wrapper";

const SearchProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  const [filteredItems, setFilteredItems] = useState([]);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user, isAuthenticated, guestId } = useSelector((state) => state.auth);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [openCartSheet, setOpenCartSheet] = useState(false);

  // console.log(productList, productDetails);
  const userId = isAuthenticated ? user?.id : guestId;

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setFilteredItems(productList);
    } else {
      const filtered = productList.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredItems(filtered);
    }
  };

  function handleGetProductDetails(getCurrentProductId) {
    // console.log(getCurrentProductId);
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  function handleAddToCart(getCurrentProductId, getTotalStock) {
    console.log(cartItems);

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

  useEffect(() => {
    if (!productList || productList.length === 0) {
      dispatch(fetchAllFilteredProducts({}));
    }
  }, [dispatch, productList]);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredItems(productList);
    } else {
      const filtered = productList.filter(
        (item) =>
          item?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item?.category?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredItems(filtered);
    }
  }, [productList, searchQuery]);

  useEffect(() => {
    if (productDetails !== null) {
      setOpenDetailsDialog(true);
    }
  }, [productDetails]);

  useEffect(() => {
    if (userId) {
      dispatch(fetchCartItems(userId));
    }
  }, [dispatch, userId]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft className="h-6 w-6 text-gray-700" />
            </button>

            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for items..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                autoFocus
              />
              {searchQuery && (
                <button
                  onClick={() => handleSearch("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded"
                >
                  <X className="h-4 w-4 text-gray-500" />
                </button>
              )}
            </div>

            <Sheet
              open={openCartSheet}
              onOpenChange={() => setOpenCartSheet(false)}
            >
              <Button
                onClick={() => setOpenCartSheet(true)}
                variant="outline"
                size="icon"
                className="relative hover:cursor-pointer"
              >
                <ShoppingCart className="h-6 w-6" />
                {/* Cart item count badge */}
                {cartItems?.items?.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItems.items.length}
                  </span>
                )}
                <span className="sr-only">Shopping cart</span>
              </Button>
              <UserCartWrapper
                setOpenCartSheet={setOpenCartSheet}
                cartItems={
                  cartItems && cartItems.items && cartItems.items.length > 0
                    ? cartItems.items
                    : []
                }
              />
            </Sheet>
          </div>
        </div>
      </div>

      {/* Search Results */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {searchQuery && (
          <p className="text-sm text-gray-600 mb-4">
            Found {filteredItems.length} result
            {filteredItems.length !== 1 ? "s" : ""} for "{searchQuery}"
          </p>
        )}

        {productList.length === 0 ? (
          <div className="text-center py-12">
            <div className="animate-spin h-12 w-12 border-4 border-black border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-500">Loading products...</p>
          </div>
        ) : filteredItems.length > 0 ? (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredItems.map((item) => (
                <ShoppingProductTile
                  handleAddToCart={handleAddToCart}
                  handleGetProductDetails={handleGetProductDetails}
                  key={item._id}
                  product={item}
                />
              ))}
            </div>
            <ProductDetailsDialog
              open={openDetailsDialog}
              setOpen={setOpenDetailsDialog}
              productDetails={productDetails}
            />
          </div>
        ) : (
          <div className="text-center py-12">
            <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No results found
            </h3>
            <p className="text-gray-500">
              Try searching with different keywords
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchProducts;
