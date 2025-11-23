import React, { useState } from "react";
import {
  Clock,
  Search,
  MapPin,
  Calendar,
} from "lucide-react";
import { PressableButton } from "@/components/common/pressable-button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import OrderTimeline from "@/components/shopping-view/order-timeline";

// ============================================
// 1. ORDER TRACKING PAGE (For Guest Users)
// ============================================

const OrderTrackingPage = () => {
  const [orderNumber, setOrderNumber] = useState("");
  const [email, setEmail] = useState("");
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleTrackOrder = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`/api/shop/order/track`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderNumber, email }),
      });

      const data = await response.json();

      if (data.success) {
        setOrderData(data.data);
      } else {
        setError(data.message || "Order not found");
      }
    } catch (err) {
      setError("Failed to track order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { color: "bg-yellow-500", text: "Pending" },
      verified: { color: "bg-blue-500", text: "Verified" },
      processing: { color: "bg-purple-500", text: "Processing" },
      shipped: { color: "bg-indigo-500", text: "Shipped" },
      delivered: { color: "bg-green-500", text: "Delivered" },
      cancelled: { color: "bg-red-500", text: "Cancelled" },
    };

    const config = statusConfig[status] || statusConfig.pending;
    return (
      <Badge className={`${config.color} text-white`}>{config.text}</Badge>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-serif mb-2">Track Your Order</h1>
          <p className="text-gray-600">
            Enter your order details to see the latest updates
          </p>
        </div>

        {/* Tracking Form */}
        {!orderData && (
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle>Order Information</CardTitle>
              <CardDescription>
                Enter your order number and email address
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleTrackOrder} className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Order Number
                  </label>
                  <Input
                    placeholder="e.g., ORD123456789"
                    value={orderNumber}
                    onChange={(e) => setOrderNumber(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                {error && (
                  <div className="text-red-500 text-sm bg-red-50 p-3 rounded">
                    {error}
                  </div>
                )}
                <PressableButton
                  type="submit"
                  className="w-full bg-[#02066f]"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Clock className="w-4 h-4 mr-2 animate-spin" />
                      Tracking...
                    </>
                  ) : (
                    <>
                      <Search className="w-4 h-4 mr-2" />
                      Track Order
                    </>
                  )}
                </PressableButton>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Order Details */}
        {orderData && (
          <div className="space-y-6">
            <PressableButton
              variant="outline"
              onClick={() => {
                setOrderData(null);
                setOrderNumber("");
                setEmail("");
              }}
              className="mb-4"
            >
              ← Track Another Order
            </PressableButton>

            {/* Order Summary */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>
                      Order #{orderData._id?.slice(-8).toUpperCase()}
                    </CardTitle>
                    <CardDescription className="mt-2">
                      Placed on{" "}
                      {new Date(orderData.orderDate).toLocaleDateString()}
                    </CardDescription>
                  </div>
                  {getStatusBadge(orderData.orderStatus)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Shipping Address
                    </h3>
                    <p className="text-sm text-gray-600">
                      {orderData.addressInfo.address}
                      <br />
                      {orderData.addressInfo.city},{" "}
                      {orderData.addressInfo.state}
                      <br />
                      {orderData.addressInfo.phone}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Estimated Delivery
                    </h3>
                    <p className="text-sm text-gray-600">
                      {orderData.shippingInfo.estimatedDelivery ||
                        "3-8 working days"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Order Timeline */}
            <OrderTimeline
              status={orderData.orderStatus}
              orderDate={orderData.orderDate}
            />

            {/* Items */}
            <Card>
              <CardHeader>
                <CardTitle>Order Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orderData.cartItems.map((item) => (
                    <div key={item._id} className="flex gap-4">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-20 h-20 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium">{item.title}</h4>
                        <p className="text-sm text-gray-600">
                          Quantity: {item.quantity}
                        </p>
                        <p className="text-sm font-semibold">
                          ₦{item.price.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <Separator className="my-4" />
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>₦{orderData.totalAmount.toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderTrackingPage;