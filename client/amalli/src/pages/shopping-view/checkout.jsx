import Address from "@/components/shopping-view/address";
import checkout from "../../assets/checkout.jpg";
import { useSelector } from "react-redux";
import UserCartContent from "@/components/shopping-view/cart-content";
import { Button } from "@/components/ui/button";

const ShoppingCheckout = () => {
  const { cartItems } = useSelector((state) => state.shopCart);

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

  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img
          src={checkout}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
        <Address />
        <div className="flex flex-col gap-4">
          {cartItems && cartItems.items && cartItems.items.length > 0
            ? cartItems.items.map((item) => <UserCartContent cartItem={item} />)
            : null}
          <div className="mt-8 space-y-4">
            <div className="flex justify-between mx-5">
              <span className="font-bold">Total</span>
              <span className="font-bold">{cartTotal.toFixed(2)}</span>
            </div>
          </div>
          <div className="mt-4 w-full">
            {/*Might want to integrate more than one payment method for checkout. Primary focus obviously on Nigerian modes of payment. */}
            <Button className="w-full hover:bg-green-500 hover:cursor-pointer">
              Checkout with paystack
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCheckout;
