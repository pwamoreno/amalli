import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";
import { PressableButton } from "../common/pressable-button"; 


const AddressCard = ({
  addressInfo,
  index,
  handleDeleteAddress,
  handleEditAddress,
  setCurrentSelectedAddress,
  selectedId,
}) => {
  return (
    <Card
      onClick={
        setCurrentSelectedAddress
          ? () => setCurrentSelectedAddress(addressInfo)
          : null
      }
      className={`cursor-pointer border-green-100 ${
        selectedId?._id === addressInfo?._id
          ? "border-green-300 border-[3px]"
          : "border-black"
      }`}
    >
      <CardContent className={"grid gap-4"}>
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
        {addressInfo?.zipcode.length === 0 ? (
          <Label className="hidden"></Label>
        ) : (
          <Label>
            <strong>zipcode:</strong>
            {addressInfo?.zipcode}
          </Label>
        )}
        <Label>
          <strong>Phone:</strong>
          {addressInfo?.phone}
        </Label>
        {addressInfo?.notes.length === 0 ? (
          <Label className="hidden"></Label>
        ) : (
          <Label>
            <strong>Note:</strong>
            {addressInfo?.notes}
          </Label>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <PressableButton
          className="hover:bg-amber-300 hover:cursor-pointer"
          onClick={() => handleEditAddress(addressInfo)}
        >
          Edit
        </PressableButton>
        <PressableButton
          className="hover:bg-red-400 hover:cursor-pointer"
          onClick={() => handleDeleteAddress(addressInfo)}
        >
          Delete
        </PressableButton>
      </CardFooter>
    </Card>
  );
};

export default AddressCard;
