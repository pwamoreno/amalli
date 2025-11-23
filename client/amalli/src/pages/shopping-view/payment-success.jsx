import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { PressableButton } from "@/components/common/pressable-button";
import { CheckCircle2, Package, Mail, ArrowRight } from "lucide-react";
import { AmalliLogo } from "@/components/icons/AmalliLogo";
import { addCommasToNumbers } from "@/lib/utils";

const PaystackSuccessPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [orderDetails, setOrderDetails] = useState(null);

  // console.log(orderDetails)

  useEffect(() => {
    // Get order details from sessionStorage if you stored them
    const lastOrder = JSON.parse(
      sessionStorage.getItem("lastOrderDetails") || "null"
    );
    if (lastOrder) {
      setOrderDetails(lastOrder);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-100 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full shadow-xl">
        {/* Success Icon - Large and Centered */}
        <div className="flex justify-center pt-12 pb-6">
          {/* <AmalliLogo size={60} /> */}
          <div className="relative">
            {/* Animated background circles */}
            <div className="absolute inset-0 animate-ping">
              <div className="h-32 w-32 rounded-full bg-green-200 opacity-75"></div>
            </div>
            <div className="absolute inset-0 animate-pulse">
              <div className="h-32 w-32 rounded-full bg-green-100"></div>
            </div>
            {/* Main success icon */}
            <div className="relative flex items-center justify-center h-32 w-32 bg-green-500 rounded-full">
              <CheckCircle2
                className="h-20 w-20 text-white"
                strokeWidth={2.5}
              />
            </div>
          </div>
        </div>

        <CardHeader className="text-center pb-2">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Payment Successful!
          </h1>
          <p className="text-lg text-muted-foreground">
            Thank you for your order
          </p>
        </CardHeader>

        <CardContent className="space-y-6 px-8 pb-8">
          {/* Confirmation Messages */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6 space-y-4 border border-green-200">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 mt-1">
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Package className="h-5 w-5 text-green-600" />
                </div>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900">Order Confirmed</p>
                <p className="text-sm text-gray-600 mt-1">
                  Your order has been placed successfully and is being processed
                </p>
              </div>
            </div>

            {/* <div className="flex items-start gap-4">
              <div className="flex-shrink-0 mt-1">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <Mail className="h-5 w-5 text-blue-600" />
                </div>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900">
                  Confirmation Email Sent
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Check your inbox for order details and tracking information
                </p>
              </div>
            </div> */}
          </div>

          {/* Order Details */}
          {orderDetails && (
            <div className="bg-gray-50 rounded-lg p-6 space-y-3">
              <h3 className="font-semibold text-gray-900 text-lg mb-3">
                Order Summary
              </h3>
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-gray-600">Order Total</span>
                <span className="font-bold text-xl text-gray-900">
                  ₦{addCommasToNumbers(orderDetails.totalAmount?.toFixed(2))}
                </span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">Payment Method</span>
                <span className="font-medium text-gray-900">Paystack</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">Payment Status</span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  Paid
                </span>
              </div>
            </div>
          )}

          {/* Call to Action Buttons */}
          <div className="space-y-3 pt-4">
            {isAuthenticated ? (
              <PressableButton
                onClick={() => navigate("/shop/account")}
                className="w-full h-12 text-base bg-green-600 hover:bg-green-700"
              >
                View Order History
                <ArrowRight className="ml-2 h-5 w-5" />
              </PressableButton>
            ) : (
              <div className="space-y-3">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                  <p className="text-sm font-medium text-blue-900 mb-3">
                    Want to track your order and enjoy faster checkout?
                  </p>
                  <PressableButton
                    onClick={() => navigate("/auth/register")}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    Create an Account
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </PressableButton>
                </div>
              </div>
            )}

            <PressableButton
              onClick={() => navigate("/shop/home")}
              variant="outline"
              className="w-full h-12 text-base"
            >
              Continue Shopping
            </PressableButton>
          </div>

          {/* Guest Note */}
          {!isAuthenticated && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <p className="text-sm text-amber-900">
                <strong>Note:</strong> You checked out as a guest. We've sent
                your order confirmation and tracking details to your email.
                Create an account to manage your orders easily!
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PaystackSuccessPage;
