import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { verifyPayment } from "@/store/shop/order-slice";

const PayStackPaymentVerification = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const param = new URLSearchParams(location.search);
  const reference = param.get("reference");

  // console.log(reference, "ref")

  useEffect(() => {
    if (reference) {
      const orderId = JSON.parse(sessionStorage.getItem("currentOrderId"));
      dispatch(verifyPayment({ reference, orderId })).then((data) => {
        if (data?.payload?.success) {
          sessionStorage.removeItem("currentOrderId");
          window.location.href = "/shop/payment-success";
        }
      });
    }
  }, [reference, dispatch]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Verifying payment...</CardTitle>
        <div className="flex justify-center mt-4">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
        </div>
        <p className="text-center text-muted-foreground mt-4">
          Please wait while we verify your payment with Paystack.
        </p>
      </CardHeader>
    </Card>
  );
};

export default PayStackPaymentVerification;
