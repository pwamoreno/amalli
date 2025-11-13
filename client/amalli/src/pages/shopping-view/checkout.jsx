import { useState } from "react";
import Address from "@/components/shopping-view/address";
import checkout from "../../assets/checkout.jpg";
import { useDispatch, useSelector } from "react-redux";
import UserCartContent from "@/components/shopping-view/cart-content";
import { Button } from "@/components/ui/button";
import { createNewOrder } from "@/store/shop/order-slice";
import { toast } from "sonner";

const ShoppingCheckout = () => {
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const { authorizationUrl } = useSelector((state) => state.shopOrder);
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const [paymentStarted, setPaymentStarted] = useState(false);
  const dispatch = useDispatch();

  // console.log(currentSelectedAddress);

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

    const orderData = {
      userId: user?.id,
      email: user?.email,
      cartId: cartItems?._id,
      cartItems: cartItems.items.map((item) => ({
        productId: item?.productId,
        title: item?.title,
        image: item?.image,
        price: item?.salePrice > 0 ? item?.salePrice : item?.price,
        quantity: item?.quantity,
      })),
      addressInfo: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        pincode: currentSelectedAddress?.pincode,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes,
      },
      totalAmount: cartTotal,
      orderStatus: "pending",
      paymentMethod: "paystack",
      paymentStatus: "pending",
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: "",
      payerId: "",
    };

    // console.log(orderData);

    dispatch(createNewOrder(orderData)).then((data) => {
      // console.log(data), "[paystack_resp]";
      if (data?.payload?.success) {
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
        <Address
          selectedId={currentSelectedAddress}
          setCurrentSelectedAddress={setCurrentSelectedAddress}
        />
        <div className="flex flex-col gap-4">
          {cartItems && cartItems.items && cartItems.items.length > 0
            ? cartItems.items.map((item) => <UserCartContent cartItem={item} />)
            : null}
          <div className="mt-8 space-y-4">
            <div className="flex justify-between mx-5">
              <span className="font-bold">Total</span>
              <span className="font-bold">₦{cartTotal.toFixed(2)}</span>
            </div>
          </div>
          <div className="mt-4 w-full">
            {/*Might want to integrate more than one payment method for checkout. Primary focus obviously on Nigerian modes of payment. */}
            <Button
              onClick={handlePaystackPayment}
              className="w-full hover:bg-green-500 hover:cursor-pointer"
            >
              {paymentStarted ? "Processing payment..." : "Checkout with paystack"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCheckout;
