import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog } from "../ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import ShoppingOrderDetails from "./orders-details";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersByUserId } from "@/store/shop/order-slice";

const ShoppingOrders = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { orderList } = useSelector(state => state.shopOrder)

  console.log(user)

  useEffect(() => {
    dispatch(getAllOrdersByUserId(user?.id))
  }, [dispatch, user])

  console.log("orderList: ", orderList);
  

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order History</CardTitle>
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
            <TableRow>
              <TableCell>123456</TableCell>
              <TableCell>10/08/2025</TableCell>
              <TableCell>pending</TableCell>
              <TableCell>1100</TableCell>
              <TableCell>
                <Dialog open={open} onOpenChange={setOpen}>
                  <Button
                    className="hover:cursor-pointer"
                    onClick={() => setOpen(true)}
                  >
                    View Details
                  </Button>
                  <ShoppingOrderDetails />
                </Dialog>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ShoppingOrders;
