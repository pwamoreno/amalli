import { useState } from "react";
import CommonForm from "../common/form";
import { DialogContent, DialogTitle } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { useDispatch } from "react-redux";
import { Badge } from "../ui/badge";
import { toast } from "sonner";
import {
  getAllOrders,
  getOrderDetailsAdmin,
  updateOrderStatus,
} from "@/store/admin/order-slice";
import { addCommasToNumbers } from "@/lib/utils";

const initialFormData = {
  status: "",
};

const AdminOrdersDetails = ({ orderDetails }) => {
  const [formData, setFormData] = useState(initialFormData);
  const dispatch = useDispatch();

  // console.log(orderDetails);

  function handleUpdateStatus(event) {
    event.preventDefault();
    const { status } = formData;

    dispatch(
      updateOrderStatus({ id: orderDetails?._id, orderStatus: status })
    ).then((data) => {
      if (data?.payload.success) {
        dispatch(getOrderDetailsAdmin(orderDetails?._id));
        dispatch(getAllOrders());
        setFormData(initialFormData);
        toast(`${data?.payload?.message}`, {
          style: { background: "#22c55e", color: "white" },
        });
      } else {
        toast(`${data?.payload?.message}`, {
          style: { background: "#fa113d", color: "white" },
        });
      }
    });
  }

  return (
    <DialogContent className="sm:max-w-[600px]">
      <DialogTitle>Order Details</DialogTitle>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <div className="flex mt-6 items-center justify-between">
            <p className="font-medium">Order ID</p>
            <Label>{orderDetails?._id}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Date</p>
            <Label>{orderDetails?.orderDate}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Price</p>
            <Label>₦{addCommasToNumbers(orderDetails?.totalAmount ?? 0)}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Status</p>
            <Label>
              <Badge
                className={`py-1 px-3 ${
                  orderDetails?.orderStatus === "verified"
                    ? "bg-green-400"
                    : orderDetails?.orderStatus === "pending"
                    ? "bg-amber-400"
                    : orderDetails?.orderStatus === "rejected"
                    ? "bg-red-400"
                    : "bg-black"
                }`}
              >
                {orderDetails?.orderStatus}
              </Badge>
            </Label>
          </div>
        </div>
        <Separator />
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Order Details</div>
            <ul className="grid gap-3">
              {orderDetails?.cartItems && orderDetails?.cartItems.length > 0
                ? orderDetails?.cartItems.map((item) => (
                    <li
                      className="flex items-center justify-between"
                      key={item.productId}
                    >
                      <span>Title: {item.title}</span>
                      <span>Quantity: {item.quantity}</span>
                      <span>Price: ₦{addCommasToNumbers(item.price)}</span>
                    </li>
                  ))
                : null}
            </ul>
          </div>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Shipping Info</div>
            <div className="grid gap-0.5 text-muted-foreground">
              <span>{orderDetails?.email}</span>
              <span>{orderDetails?.addressInfo?.address}</span>
              <span>{orderDetails?.addressInfo?.city}</span>
              <span>{orderDetails?.addressInfo?.pincode}</span>
              <span>{orderDetails?.addressInfo?.phone}</span>
              <span>{orderDetails?.addressInfo?.notes}</span>
            </div>
          </div>
        </div>

        <div>
          <CommonForm
            formControls={[
              {
                label: "Order Status",
                name: "status",
                componentType: "select",
                options: [
                  { id: "pending", label: "Pending" },
                  { id: "inProcess", label: "In Process" },
                  { id: "inShipping", label: "In Shipping" },
                  { id: "delivered", label: "Delivered" },
                  { id: "rejected", label: "Rejected" },
                ],
              },
            ]}
            formData={formData}
            setFormData={setFormData}
            buttonText={"Update Order Status"}
            onSubmit={handleUpdateStatus}
          />
        </div>
      </div>
    </DialogContent>
  );
};

export default AdminOrdersDetails;
