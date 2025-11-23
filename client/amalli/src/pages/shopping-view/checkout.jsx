import { useState } from "react";
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

const ShoppingCheckout = () => {
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user, isAuthenticated, guestId } = useSelector((state) => state.auth);
  const { authorizationUrl } = useSelector((state) => state.shopOrder);
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const [shippingInfo, setShippingInfo] = useState(null);
  const [paymentStarted, setPaymentStarted] = useState(false);
  const [guestEmail, setGuestEmail] = useState("");
  const dispatch = useDispatch();

  // console.log(currentSelectedAddress);

  const userId = isAuthenticated ? user?.id : guestId;

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
  const totalAmount = cartTotal + shippingCost;

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

    // Validate guest email
    if (!isAuthenticated && !guestEmail.trim()) {
      toast("Please enter your email address.", {
        style: { background: "#fa113d", color: "white" },
      });
      return;
    }

    // Validate email format
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

    // console.log(orderData);

    dispatch(createNewOrder(orderData)).then((data) => {
      // console.log(data), "[paystack_resp]";
      if (data?.payload?.success) {
        // Store order ID for verification
        sessionStorage.setItem(
          "currentOrderId",
          JSON.stringify(data.payload.orderId)
        );

        // Store order details for success page - ADD THIS
        sessionStorage.setItem(
          "lastOrderDetails",
          JSON.stringify({
            totalAmount: totalAmount,
            email: isAuthenticated ? user?.email : guestEmail,
            itemCount: cartItems.items.length,
            orderDate: new Date().toISOString(),
          })
        );
        
        setPaymentStarted(true);
      } else {
        setPaymentStarted(false);
      }
    });
  }

  if (authorizationUrl) {
    window.location.href = authorizationUrl;
  }

  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img
          src={checkout}
          className="h-full w-full object-cover object-center"
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
          {/* Shipping Selector */}
          <div className="p-4 border rounded-lg bg-background">
            <ShippingSelector
              onShippingChange={setShippingInfo}
              // selectedShipping={shippingInfo}
            />
          </div>

        </div>
        <div className="flex flex-col gap-4">
          {cartItems && cartItems.items && cartItems.items.length > 0
            ? cartItems.items.map((item) => <UserCartContent cartItem={item} />)
            : null}
          <div className="mt-8 space-y-4">
            <div className="flex justify-between mx-5">
              <span className="font-bold">Total</span>
              <span className="font-bold">
                ₦{addCommasToNumbers(cartTotal.toFixed(2))}
              </span>
            </div>
            <div className="flex justify-between mx-5">
              <span className="text-muted-foreground">Shipping</span>
              <span className={shippingCost > 0 ? "text-green-600 font-medium" : ""}>
                {shippingCost > 0 ? `₦${addCommasToNumbers(shippingCost.toFixed(2))}` : "Select location"}
              </span>
            </div>
            <div className="flex justify-between mx-5 pt-4 border-t">
              <span className="font-bold text-lg">Total</span>
              <span className="font-bold text-lg">₦{addCommasToNumbers(totalAmount.toFixed(2))}</span>
            </div>
          </div>
          <div className="mt-4 w-full">
            {/*Might want to integrate more than one payment method for checkout. Primary focus obviously on Nigerian modes of payment. */}
            <PressableButton
              onClick={handlePaystackPayment}
              className="w-full bg-[#02066f] hover:bg-green-500 hover:cursor-pointer"
            >
              {paymentStarted
                ? "Processing payment..."
                : shippingInfo
                ? "Checkout with Paystack"
                : "Select shipping location to continue"}
            </PressableButton>
          </div>
          {!isAuthenticated && (
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-900">
                <strong>Want to track your order?</strong> Create an account
                after checkout to view order history and save addresses for
                faster checkout next time.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShoppingCheckout;
