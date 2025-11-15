import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { addCommasToNumbers } from "@/lib/utils";

const AdminProductTile = ({
  product,
  setFormData,
  setOpenCreateProductsDialog,
  setCurrentIdToEdit,
  handleDelete,
}) => {
  return (
    <div>
      <Card className="w-full max-w-sm mx-auto pt-0">
        <div className="relative">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-[300px] object-cover rounded-t-lg"
          />
        </div>
        <CardContent>
          <h2 className="text-xl font-bold mb-2">{product?.title}</h2>
          <div className="flex justify-between items-center mb-2">
            <span
              className={`${
                product.salePrice > 0 ? "line-through" : ""
              } text-lg font-semibold text-primary`}
            >
              ₦{addCommasToNumbers(product?.price)}
            </span>
            {product?.salePrice > 0 ? (
              <span className="text-lg font-bold">
                ₦{addCommasToNumbers(product?.salePrice)}
              </span>
            ) : null}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <Button
            className="hover:cursor-pointer hover:bg-amber-400"
            onClick={() => {
              setOpenCreateProductsDialog(true);
              setCurrentIdToEdit(product._id);
              setFormData(product);
            }}
          >
            Edit
          </Button>
          <Button
            className="hover:cursor-pointer hover:bg-red-400"
            onClick={() => handleDelete(product?._id)}
          >
            Delete
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AdminProductTile;
