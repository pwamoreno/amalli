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

  console.log(reference, "ref")

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
      </CardHeader>
    </Card>
  );
};

export default PayStackPaymentVerification;
