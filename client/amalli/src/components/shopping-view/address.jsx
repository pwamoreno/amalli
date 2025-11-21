import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import CommonForm from "../common/form";
import { addressFormControls } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewAddress,
  deleteAddress,
  editAddress,
  fetchAllAddress,
} from "@/store/shop/address-slice";
import AddressCard from "./address-card";
import { toast } from "sonner";

const initialAddressFormData = {
  address: "",
  city: "",
  phone: "",
  zipcode: "",
  notes: "",
};

const Address = ({ setCurrentSelectedAddress, selectedId }) => {
  const [formData, setFormData] = useState(initialAddressFormData);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { addressList } = useSelector((state) => state.shopAddress);

  function manageAddress(event) {
    event.preventDefault();

    if (!isAuthenticated) {
      if (!isFormValid()) {
        toast("Please fill all address fields", {
          style: { background: "#fa113d", color: "white" },
        });
        return;
      }

      // Pass the address data directly to checkout
      setCurrentSelectedAddress(formData);
      toast("Address added for checkout", {
        style: { background: "#22c55e", color: "white" },
      });
      return;
    }

    if (addressList.length >= 3 && currentEditedId === null) {
      setFormData(initialAddressFormData);
      toast("Only three addresses allowed!", {
        style: { background: "#fa113d", color: "white" },
      });
      return;
    }

    currentEditedId !== null
      ? dispatch(
          editAddress({
            userId: user?.id,
            addressId: currentEditedId,
            formData,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllAddress(user?.id));
            setCurrentEditedId(null);
            setFormData(initialAddressFormData);
            toast("Address updated succesfully", {
              style: { background: "#22c55e", color: "white" },
            });
          }
        })
      : dispatch(
          addNewAddress({
            ...formData,
            userId: user?.id,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllAddress(user?.id));
            setFormData(initialAddressFormData);
            toast("Address added succesfully", {
              style: { background: "#22c55e", color: "white" },
            });
          }
        });
  }

  function handleDeleteAddress(getAddress) {
    dispatch(
      deleteAddress({ userId: user?.id, addressId: getAddress?._id })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllAddress(user?.id));
        toast("Address deleted succesfully", {
          style: { background: "#22c55e", color: "white" },
        });
      }
    });
  }

  function handleEditAddress(getAddress) {
    setCurrentEditedId(getAddress?._id);
    setFormData({
      ...formData,
      address: getAddress?.address,
      city: getAddress?.city,
      phone: getAddress?.phone,
      zipcode: getAddress?.zipcode,
      notes: getAddress?.notes,
    });
  }

  function isFormValid() {
    const excludedFields = ["zipcode", "notes"];
    return Object.keys(formData)
      .filter((key) => !excludedFields.includes(key))
      .map((key) => formData[key].trim() !== "")
      .every((item) => item);
  }

  useEffect(() => {
    if (isAuthenticated && user?.id) {
      dispatch(fetchAllAddress(user?.id));
    }
  }, [dispatch, user?.id, isAuthenticated]);

  //   console.log(addressList);

  return (
    <Card className="py-4">
      {isAuthenticated && addressList && addressList.length > 0 && (
        <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
          {addressList.map((address, index) => (
            <AddressCard
              selectedId={selectedId}
              addressInfo={address}
              index={index}
              handleDeleteAddress={handleDeleteAddress}
              handleEditAddress={handleEditAddress}
              setCurrentSelectedAddress={setCurrentSelectedAddress}
              key={index}
            />
          ))}
        </div>
      )}
      <CardHeader>
        <CardTitle>
          {currentEditedId !== null ? "Edit Address" : "Add New Address"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <CommonForm
          formControls={addressFormControls}
          formData={formData}
          setFormData={setFormData}
          buttonText={currentEditedId !== null ? "Edit" : "Add"}
          onSubmit={manageAddress}
          isButtonDisabled={!isFormValid()}
        />
      </CardContent>
    </Card>
  );
};

export default Address;
