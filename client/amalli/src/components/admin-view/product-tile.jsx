import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { addCommasToNumbers } from "@/lib/utils";
import { Badge } from "../ui/badge";

const AdminProductTile = ({
  product,
  setFormData,
  setOpenCreateProductsDialog,
  setCurrentIdToEdit,
  handleDelete,
}) => {
  // console.log(product);
  
  return (
    <div>
      <Card className="w-full max-w-sm mx-auto pt-0">
        <div className="relative">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-[300px] object-cover rounded-t-lg"
          />
          {product?.isPersonalizable && (
            <Badge className="absolute top-2 right-2 bg-[#02066f]">
              Personalizable
            </Badge>
          )}
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
            className="hover:cursor-pointer bg-[#02066f] hover:bg-amber-400"
            onClick={() => {
              setOpenCreateProductsDialog(true);
              setCurrentIdToEdit(product._id);
              setFormData(product);
            }}
          >
            Edit
          </Button>
          <Button
            className="hover:cursor-pointer bg-[#02066f] hover:bg-red-400"
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