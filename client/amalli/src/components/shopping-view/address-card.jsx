import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

const AddressCard = ({
  addressInfo,
  index,
  handleDeleteAddress,
  handleEditAddress,
}) => {
  return (
    <Card>
      <CardContent className="grid gap-4">
        <h2 className="font-extrabold text-2xl text-muted-foreground">
          Address {index + 1}
        </h2>
        <Label>
          <strong>Address:</strong>
          {addressInfo?.address}
        </Label>
        <Label>
          <strong>City:</strong>
          {addressInfo?.city}
        </Label>
        <Label>
          <strong>Pincode:</strong>
          {addressInfo?.pincode}
        </Label>
        <Label>
          <strong>Phone:</strong>
          {addressInfo?.phone}
        </Label>
        <Label>
          <strong>Note:</strong>
          {addressInfo?.notes}
        </Label>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          className="hover:bg-amber-300 hover:cursor-pointer"
          onClick={() => handleEditAddress(addressInfo)}
        >
          Edit
        </Button>
        <Button
          className="hover:bg-red-400 hover:cursor-pointer"
          onClick={() => handleDeleteAddress(addressInfo)}
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AddressCard;
