import { useEffect, useState } from "react";
import { Tag, X } from "lucide-react";
import Address from "@/components/shopping-view/address";
import ShippingSelector from "@/components/shopping-view/shipping-selector";
import checkout from "../../assets/checkout.jpg";
import { useDispatch, useSelector } from "react-redux";
import UserCartContent from "@/components/shopping-view/cart-content";
import { PressableButton } from "@/components/common/pressable-button";
import { createNewOrder } from "@/store/shop/order-slice";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { addCommasToNumbers } from "@/lib/utils";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

const ShoppingCheckout = () => {
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user, isAuthenticated, guestId } = useSelector((state) => state.auth);
  const { authorizationUrl } = useSelector((state) => state.shopOrder);
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const [shippingInfo, setShippingInfo] = useState(null);
  const [paymentStarted, setPaymentStarted] = useState(false);
  const [guestAddress, setGuestAddress] = useState(null);
  const [guestEmail, setGuestEmail] = useState("");

  // Promo Code State
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [promoLoading, setPromoLoading] = useState(false);

  const dispatch = useDispatch();

  const userId = isAuthenticated ? user?.id : guestId;

  // Calculate cart total
  const cartTotal =
    cartItems && cartItems.items && cartItems.items.length > 0
      ? cartItems.items.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  const shippingCost = shippingInfo?.price || 0;

  // Calculate discount amount
  const calculateDiscount = () => {
    if (!appliedPromo) return 0;

    let discount = 0;
    if (appliedPromo.discountType === "percentage") {
      discount = (cartTotal * appliedPromo.discountValue) / 100;
      // Apply max discount cap if exists
      if (appliedPromo.maxDiscount && discount > appliedPromo.maxDiscount) {
        discount = appliedPromo.maxDiscount;
      }
    } else {
      // Fixed amount discount
      discount = appliedPromo.discountValue;
    }

    // Ensure discount doesn't exceed cart total
    return Math.min(discount, cartTotal);
  };

  const discountAmount = calculateDiscount();
  const totalAmount = cartTotal - discountAmount + shippingCost;

  // Function to validate and apply promo code
  const handleApplyPromo = async () => {
    if (!promoCode.trim()) {
      toast("Please enter a promo code", {
        style: { background: "#fa113d", color: "white" },
      });
      return;
    }

    setPromoLoading(true);

    try {
      const response = await axios.post(`${API}/api/shop/promo/validate`, {
        code: promoCode.toUpperCase(),
        userId: userId,
        cartTotal: cartTotal,
        isGuest: !isAuthenticated,
      });

      if (response.data.success) {
        setAppliedPromo(response.data.promo);
        toast("Promo code applied successfully!", {
          style: { background: "#10b981", color: "white" },
        });
      } else {
        toast(response.data.message || "Invalid promo code", {
          style: { background: "#fa113d", color: "white" },
        });
      }
    } catch (error) {
      toast(error.response?.data?.message || "Failed to apply promo code", {
        style: { background: "#fa113d", color: "white" },
      });
    } finally {
      setPromoLoading(false);
    }
  };

  // Remove applied promo code
  const handleRemovePromo = () => {
    setAppliedPromo(null);
    setPromoCode("");
    toast("Promo code removed", {
      style: { background: "#64748b", color: "white" },
    });
  };

  // Apply promo code usage after successful payment
  const applyPromoUsage = async (code, userId) => {
    try {
      await axios.post(`${API}/api/shop/promo/apply`, {
        code: code,
        userId: userId,
      });
    } catch (error) {
      console.error("Failed to apply promo usage:", error);
    }
  };

  function handlePaystackPayment() {
    if (cartItems.length === 0) {
      toast("Cart empty. Add items to proceed.", {
        style: { background: "#fa113d", color: "white" },
      });
      return;
    }

    if (currentSelectedAddress === null) {
      toast("Select or input an address to proceed.", {
        style: { background: "#fa113d", color: "white" },
      });
      return;
    }

    if (!isAuthenticated && !guestEmail.trim()) {
      toast("Please enter your email address.", {
        style: { background: "#fa113d", color: "white" },
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!isAuthenticated && !emailRegex.test(guestEmail)) {
      toast("Please enter a valid email address.", {
        style: { background: "#fa113d", color: "white" },
      });
      return;
    }

    const orderData = {
      userId: userId,
      email: isAuthenticated ? user?.email : guestEmail,
      cartId: cartItems?._id,
      cartItems: cartItems.items.map((item) => ({
        productId: item?.productId,
        title: item?.title,
        image: item?.image,
        price: item?.salePrice > 0 ? item?.salePrice : item?.price,
        quantity: item?.quantity,
        personalizationText: item?.personalizationText || "",
        ...(item?.selectedColor && {
          selectedColor: {
            id: item.selectedColor.id,
            name: item.selectedColor.name,
            hex: item.selectedColor.hex,
          },
        }),
        ...(item?.selectedSize && {
          selectedSize: {
            id: item.selectedSize.id,
            name: item.selectedSize.name,
          },
        }),
      })),
      addressInfo: {
        addressId: currentSelectedAddress?._id || null,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        zipcode: currentSelectedAddress?.zipcode,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes,
      },
      shippingInfo: shippingInfo,
      shippingCost: shippingCost,
      // Include promo code information
      promoCode: appliedPromo ? appliedPromo.code : null,
      discountAmount: discountAmount,
      cartTotal: cartTotal,
      totalAmount: totalAmount,
      orderStatus: "pending",
      paymentMethod: "paystack",
      paymentStatus: "pending",
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: "",
      payerId: "",
      isGuest: !isAuthenticated,
    };

    dispatch(createNewOrder(orderData)).then((data) => {
      if (data?.payload?.success) {
        // Store order ID for verification
        sessionStorage.setItem(
          "currentOrderId",
          JSON.stringify(data.payload.orderId)
        );

        // Store order details for success page
        sessionStorage.setItem(
          "lastOrderDetails",
          JSON.stringify({
            totalAmount: totalAmount,
            email: isAuthenticated ? user?.email : guestEmail,
            itemCount: cartItems.items.length,
            orderDate: new Date().toISOString(),
            discountAmount: discountAmount,
            promoCode: appliedPromo?.code || null,
          })
        );

        // Apply promo code usage if promo was used
        if (appliedPromo) {
          applyPromoUsage(appliedPromo.code, userId);
        }

        setPaymentStarted(true);
      } else {
        setPaymentStarted(false);
      }
    });
  }

  useEffect(() => {
    if (!isAuthenticated && guestEmail.trim() && currentSelectedAddress) {
      setGuestAddress({
        email: guestEmail,
        address: currentSelectedAddress.address,
        city: currentSelectedAddress.city,
        zipcode: currentSelectedAddress.zipcode,
        phone: currentSelectedAddress.phone,
        notes: currentSelectedAddress.notes,
      });
    } else {
      setGuestAddress(null);
    }
  }, [guestEmail, currentSelectedAddress, isAuthenticated]);

  if (authorizationUrl) {
    window.location.href = authorizationUrl;
  }

  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img
          src={checkout}
          className="h-full w-full object-cover object-center"
          alt="Checkout"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
        <div className="flex flex-col gap-4">
          {!isAuthenticated && (
            <div className="space-y-2 p-4 border rounded-lg bg-muted/50">
              <Label htmlFor="guest-email" className="text-base font-semibold">
                Email Address *
              </Label>
              <Input
                id="guest-email"
                type="email"
                placeholder="your@email.com"
                value={guestEmail}
                onChange={(e) => setGuestEmail(e.target.value)}
                className="w-full"
                required
              />
              <p className="text-sm text-muted-foreground">
                We'll send your order confirmation to this email
              </p>
            </div>
          )}

          <Address
            selectedId={currentSelectedAddress}
            setCurrentSelectedAddress={setCurrentSelectedAddress}
          />

          {guestAddress && (
            <div className="p-4 border rounded-lg bg-muted/50 mt-4">
              <h3 className="font-semibold text-base mb-2">Added Address</h3>
              <p>
                <strong>Email:</strong> {guestAddress.email}
              </p>
              <p>
                <strong>Address:</strong> {guestAddress.address}
              </p>
              <p>
                <strong>City:</strong> {guestAddress.city}
              </p>
              <p>
                <strong>Zipcode:</strong> {guestAddress.zipcode}
              </p>
              <p>
                <strong>Phone:</strong> {guestAddress.phone}
              </p>
              {guestAddress.notes && (
                <p>
                  <strong>Notes:</strong> {guestAddress.notes}
                </p>
              )}
            </div>
          )}

          <div className="p-4 border rounded-lg bg-background">
            <ShippingSelector onShippingChange={setShippingInfo} />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {cartItems && cartItems.items && cartItems.items.length > 0
            ? cartItems.items.map((item) => (
                <UserCartContent key={item.productId} cartItem={item} />
              ))
            : null}

          {/* Promo Code Section */}
          <div className="p-4 border rounded-lg bg-background">
            <Label className="text-base font-semibold mb-2 flex items-center gap-2">
              <Tag className="w-4 h-4" />
              Promo Code
            </Label>

            {!appliedPromo ? (
              <div className="flex gap-2 mt-2">
                <Input
                  type="text"
                  placeholder="Enter promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                  className="flex-1"
                  disabled={promoLoading}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleApplyPromo();
                    }
                  }}
                />
                <button
                  onClick={handleApplyPromo}
                  disabled={promoLoading}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {promoLoading ? "Applying..." : "Apply"}
                </button>
              </div>
            ) : (
              <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-green-800">
                      {appliedPromo.code}
                    </p>
                    <p className="text-sm text-green-700">
                      {appliedPromo.discountType === "percentage"
                        ? `${appliedPromo.discountValue}% off`
                        : `₦${addCommasToNumbers(
                            appliedPromo.discountValue
                          )} off`}
                    </p>
                    {appliedPromo.description && (
                      <p className="text-xs text-green-600 mt-1">
                        {appliedPromo.description}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={handleRemovePromo}
                    className="p-1 hover:bg-green-100 rounded"
                    title="Remove promo code"
                  >
                    <X className="w-5 h-5 text-green-800" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="mt-8 space-y-4">
            <div className="flex justify-between mx-5">
              <span className="font-bold">Subtotal</span>
              <span className="font-bold">
                ₦{addCommasToNumbers(cartTotal.toFixed(2))}
              </span>
            </div>

            {appliedPromo && discountAmount > 0 && (
              <div className="flex justify-between mx-5">
                <span className="text-green-600 font-medium">
                  Discount ({appliedPromo.code})
                </span>
                <span className="text-green-600 font-medium">
                  -₦{addCommasToNumbers(discountAmount.toFixed(2))}
                </span>
              </div>
            )}

            <div className="flex justify-between mx-5">
              <span className="text-muted-foreground">Shipping</span>
              <span
                className={shippingCost > 0 ? "text-green-600 font-medium" : ""}
              >
                {shippingCost > 0
                  ? `₦${addCommasToNumbers(shippingCost.toFixed(2))}`
                  : "Select location"}
              </span>
            </div>

            <div className="flex justify-between mx-5 pt-4 border-t">
              <span className="font-bold text-lg">Total</span>
              <span className="font-bold text-lg">
                ₦{addCommasToNumbers(totalAmount.toFixed(2))}
              </span>
            </div>

            {appliedPromo && discountAmount > 0 && (
              <div className="mx-5 p-2 bg-green-50 rounded text-center text-sm text-green-800">
                You saved ₦{addCommasToNumbers(discountAmount.toFixed(2))}!
              </div>
            )}
          </div>

          <div className="mt-4 w-full">
            <PressableButton
              onClick={handlePaystackPayment}
              className="w-full bg-[#02066f] hover:bg-green-500 hover:cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
              disabled={paymentStarted}
            >
              {paymentStarted
                ? "Processing payment..."
                : shippingInfo
                ? "Checkout with Paystack"
                : "Select shipping location to continue"}
            </PressableButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCheckout;
