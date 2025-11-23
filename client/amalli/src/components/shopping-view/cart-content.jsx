import React from "react";
import { PressableButton } from "../common/pressable-button";
import { Minus, Plus, Trash } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCartItem,
  updateCartItemQuantity,
} from "@/store/shop/cart-slice";
import { toast } from "sonner";
import { addCommasToNumbers } from "@/lib/utils";

const UserCartContent = ({ cartItem }) => {
  const { user, isAuthenticated, guestId } = useSelector((state) => state.auth);
  const { productList } = useSelector((state) => state.shopProducts);

  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.shopCart);

  const userId = isAuthenticated ? user?.id : guestId;

  function handleCartItemDelete(getCartItem) {
    dispatch(
      deleteCartItem({ userId: userId, productId: getCartItem?.productId })
    ).then((data) => {
      if (data?.payload?.success) {
        toast("Cart item deleted successfully.", {
          style: { background: "#22c55e", color: "white" },
        });
      }
    });
  }

  function handleUpdateQuantity(getCartItem, typeOfAction) {
    if (typeOfAction === "plus") {
      let getCartItems = cartItems.items || [];

      if (getCartItems.length) {
        const indexOfCurrentCartItem = getCartItems.findIndex(
          (item) => item.productId === getCartItem.productId
        );

        const getCurrentProductIndex = productList.findIndex(
          (product) => product._id === getCartItem?.productId
        );

        const getTotalStock = productList[getCurrentProductIndex].totalStock;

        if (indexOfCurrentCartItem > -1) {
          const getQuantity = getCartItems[indexOfCurrentCartItem].quantity;
          if (getQuantity + 1 > getTotalStock) {
            toast(`Only ${getQuantity} items can be added.`, {
              style: { background: "#fa113d", color: "white" },
            });

            return;
          }
        }
      }
    }
    dispatch(
      updateCartItemQuantity({
        userId: userId,
        productId: getCartItem?.productId,
        quantity:
          typeOfAction === "plus"
            ? getCartItem?.quantity + 1
            : getCartItem?.quantity - 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        toast("Cart item updated successfully.", {
          style: { background: "#22c55e", color: "white" },
        });
      }
    });
  }

  return (
    <div className="mx-5 flex items-center space-x-4">
      <img
        src={cartItem?.image}
        alt={cartItem?.title}
        className="w-20 h-20 rounded object-cover"
      />
      <div className="flex-1">
        <h3 className="font-extrabold">{cartItem?.title}</h3>
        <div className="flex items-center gap-2 mt-1">
          <PressableButton
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full hover:cursor-pointer"
            disabled={cartItem?.quantity === 1}
            onClick={() => handleUpdateQuantity(cartItem, "minus")}
          >
            <Minus className="w-4 h-4" />
            <span className="sr-only">Decrease</span>
          </PressableButton>
          <span className="font-semibold">{cartItem?.quantity}</span>
          <PressableButton
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full hover:cursor-pointer"
            onClick={() => handleUpdateQuantity(cartItem, "plus")}
          >
            <Plus className="w-4 h-4" />
            <span className="sr-only">Increase</span>
          </PressableButton>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p className="font-semibold">
          ₦
          {addCommasToNumbers(
            (
              (cartItem?.salePrice > 0
                ? cartItem?.salePrice
                : cartItem?.price) * cartItem?.quantity
            ).toFixed(2)
          )}
        </p>
        <Trash
          className="cursor-pointer mt-1"
          size={20}
          color="red"
          onClick={() => handleCartItemDelete(cartItem)}
        />
      </div>
    </div>
  );
};

export default UserCartContent;
