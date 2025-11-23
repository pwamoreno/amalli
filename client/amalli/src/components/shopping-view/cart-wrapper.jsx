import React from "react";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { PressableButton } from "../common/pressable-button";
import UserCartContent from "./cart-content";
import { useNavigate } from "react-router-dom";
import { addCommasToNumbers } from "@/lib/utils";

const UserCartWrapper = ({ cartItems, onClose }) => {
  const navigate = useNavigate();

  const cartTotal =
    cartItems && cartItems.length > 0
      ? cartItems.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  return (
    <SheetContent className="sm:max-w-md w-full">
      <SheetHeader>
        <SheetTitle>Your Cart</SheetTitle>
      </SheetHeader>
      <div className="mt-8 space-y-4">
        {cartItems && cartItems.length > 0
          ? cartItems.map((item) => (
              <UserCartContent key={item?.productId} cartItem={item} />
            ))
          : null}
      </div>
      <div className="mt-8 space-y-4">
        <div className="flex justify-between mx-5">
          <span className="font-bold">Total</span>
          <span className="font-bold">
            ₦{addCommasToNumbers(cartTotal.toFixed(2))}
          </span>
        </div>
      </div>
      <PressableButton
        className="mt-6 mx-5 hover:cursor-pointer bg-[#02066f] hover:bg-green-500"
        onClick={() => {
          onClose(false);
          setTimeout(() => {
            navigate("/shop/checkout");
          }, 400);
        }}
      >
        Checkout
      </PressableButton>
    </SheetContent>
  );
};

export default UserCartWrapper;
