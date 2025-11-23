import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Dialog } from "../ui/dialog";
import { useEffect, useState } from "react";
import AdminOrdersDetails from "./orders-details";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders, getOrderDetailsAdmin } from "@/store/admin/order-slice";
import { Badge } from "../ui/badge";
import { resetOrderDetails } from "@/store/admin/order-slice";
import { addCommasToNumbers } from "@/lib/utils";
import { PressableButton } from "../common/pressable-button";

const AdminOrdersView = () => {
  const [open, setOpen] = useState(false);
  const { orderList, orderDetails } = useSelector((state) => state.adminOrder);
  const dispatch = useDispatch();

  function handleFetchOrderDetails(getId) {
    dispatch(getOrderDetailsAdmin(getId));
  }

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  useEffect(() => {
    if (orderDetails !== null) {
      setOpen(true);
    }
  }, [orderDetails]);

  // console.log(orderDetails);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>All Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Order Date</TableHead>
                <TableHead>Order Status</TableHead>
                <TableHead>Order Price</TableHead>
                <TableHead>
                  <span className="sr-only">Details</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orderList && orderList.length > 0
                ? orderList.map((orderItem) => (
                    <TableRow key={orderItem?._id}>
                      <TableCell>{orderItem?._id}</TableCell>
                      <TableCell>
                        {orderItem?.orderDate.split("T")[0]}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={`py-1 px-3 ${
                            orderItem?.orderStatus === "verified"
                              ? "bg-green-400"
                              : orderItem?.orderStatus === "pending"
                              ? "bg-amber-400"
                              : orderItem?.orderStatus === "rejected"
                              ? "bg-red-400"
                              : "bg-black"
                          }`}
                        >
                          {orderItem?.orderStatus}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        ₦{addCommasToNumbers(orderItem?.totalAmount)}
                      </TableCell>
                      <TableCell>
                        <PressableButton
                          className="hover:cursor-pointer bg-[#02066f]"
                          onClick={() =>
                            handleFetchOrderDetails(orderItem?._id)
                          }
                        >
                          View Details
                        </PressableButton>
                      </TableCell>
                    </TableRow>
                  ))
                : null}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Dialog
        open={open}
        onOpenChange={() => {
          setOpen(false);
          dispatch(resetOrderDetails());
        }}
      >
        <AdminOrdersDetails orderDetails={orderDetails} />
      </Dialog>
    </>
  );
};

export default AdminOrdersView;
