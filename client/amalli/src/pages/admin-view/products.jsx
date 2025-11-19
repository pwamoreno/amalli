import ProductImageUpload from "@/components/admin-view/image-upload";
import AdminProductTile from "@/components/admin-view/product-tile";
import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { addProductFormElements } from "@/config";
import {
  addNewProduct,
  deleteProduct,
  editProduct,
  fetchAllProducts,
} from "@/store/admin/product-slice";
import { X } from "lucide-react";
import { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const initialFormData = {
  image: null,
  title: "",
  description: "",
  categories: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
  isPersonalizable: false,
  personalizationLabel: "Add your personalization text",
  personalizationMaxLength: 50,
  hasVariants: false,
  colors: [],
  sizes: [],
};

const AdminProducts = () => {
  const [openCreateProductsDialog, setOpenCreateProductsDialog] =
    useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFIle, setImageFIle] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentIdToEdit, setCurrentIdToEdit] = useState(null);

  const { productList } = useSelector((state) => state.adminProducts);
  const dispatch = useDispatch();

  // Helper function to add color
  const addColor = () => {
    setFormData({
      ...formData,
      colors: [
        ...formData.colors,
        { id: Date.now().toString(), name: "", hex: "#000000" },
      ],
    });
  };

  // Helper function to update color
  const updateColor = (index, field, value) => {
    const newColors = [...formData.colors];
    newColors[index][field] = value;
    setFormData({ ...formData, colors: newColors });
  };

  // Helper function to remove color
  const removeColor = (index) => {
    const newColors = formData.colors.filter((_, i) => i !== index);
    setFormData({ ...formData, colors: newColors });
  };

  // Helper function to add size
  const addSize = () => {
    setFormData({
      ...formData,
      sizes: [
        ...formData.sizes,
        { id: Date.now().toString(), name: "", inStock: true },
      ],
    });
  };

  // Helper function to update size
  const updateSize = (index, field, value) => {
    const newSizes = [...formData.sizes];
    newSizes[index][field] = value;
    setFormData({ ...formData, sizes: newSizes });
  };

  // Helper function to remove size
  const removeSize = (index) => {
    const newSizes = formData.sizes.filter((_, i) => i !== index);
    setFormData({ ...formData, sizes: newSizes });
  };

  function onSubmit(event) {
    event.preventDefault();

    const completeFormData = {
      ...formData,
      image: currentIdToEdit !== null ? formData.image : uploadedImageUrl,
      // Ensure variants are included
      colors: formData.hasVariants ? formData.colors : [],
      sizes: formData.hasVariants ? formData.sizes : [],
    };

    console.log("Submitting form data:", completeFormData);

    currentIdToEdit !== null
      ? dispatch(
          editProduct({
            id: currentIdToEdit,
            formData: completeFormData,
          })
        ).then((data) => {
          // console.log("editedData", data);
          if (data?.payload?.success) {
            dispatch(fetchAllProducts());
            setFormData(initialFormData);
            setOpenCreateProductsDialog(false);
            setCurrentIdToEdit(null);
            toast("Product edited successfully!", {
              style: { background: "#22c55e", color: "white" },
            });
          }
        })
      : dispatch(
          addNewProduct(completeFormData)
        ).then((data) => {
          console.log("Add product response:", data);
          if (data?.payload?.success) {
            dispatch(fetchAllProducts());
            setOpenCreateProductsDialog(false);
            setImageFIle(null);
            setFormData(initialFormData);
            toast("Product added successfully!", {
              style: { background: "#22c55e", color: "white" },
            });
          }
        });
  }

  function handleDelete(getProductId) {
    // console.log(getProductId);
    dispatch(deleteProduct(getProductId)).then((data) => {
      // console.log(data);
      if (data?.payload?.success) {
        dispatch(fetchAllProducts());
        toast("Product deleted successfully!", {
          style: { background: "#22c55e", color: "white" },
        });
      }
    });
  }

  // function isFormValid() {
  //   console.log(formData.image);

  //   console.log(Object.keys(formData)
  //     .map((key) => formData[key] !== "")
  //     .every((item) => item));

  //   return Object.keys(formData)
  //     .map((key) => formData[key] !== "")
  //     .every((item) => item);
  // }

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  // console.log("productList", productList);

  return (
    <Fragment>
      <div className="mb-5 flex justify-end">
        <Button
          onClick={() => setOpenCreateProductsDialog(true)}
          className="hover:cursor-pointer bg-[#02066f] hover:bg-green-400"
        >
          Add New Product
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {productList && productList.length > 0
          ? productList.map((productItem) => (
              <AdminProductTile
                setCurrentIdToEdit={setCurrentIdToEdit}
                setOpenCreateProductsDialog={setOpenCreateProductsDialog}
                setFormData={setFormData}
                product={productItem}
                handleDelete={handleDelete}
                key={productItem._id}
              />
            ))
          : null}
      </div>
      <Sheet
        open={openCreateProductsDialog}
        onOpenChange={() => {
          setOpenCreateProductsDialog(false);
          setCurrentIdToEdit(null);
          setFormData(initialFormData);
        }}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>
              {currentIdToEdit !== null ? "Edit Product" : "Add New Product"}
            </SheetTitle>
          </SheetHeader>
          <ProductImageUpload
            imageFile={imageFIle}
            setImageFile={setImageFIle}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            imageLoadingState={imageLoadingState}
            setImageLoadingState={setImageLoadingState}
            currentIdToEdit={currentIdToEdit}
          />
          <div className="py-6 px-4">
            <CommonForm
              onSubmit={onSubmit}
              formData={formData}
              setFormData={setFormData}
              buttonText={currentIdToEdit !== null ? "Edit" : "Add"}
              formControls={addProductFormElements}
              // isButtonDisabled={!isFormValid()}
            />
            {/* Variants Section */}
            {formData.hasVariants && (
              <div className="mt-6 pt-6 border-t space-y-4">
                <h3 className="text-sm font-semibold">Product Variants</h3>

                {/* Color Variants */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <Label className="text-sm font-medium">Colors</Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addColor}
                    >
                      + Add Color
                    </Button>
                  </div>

                  <div className="space-y-2">
                    {formData.colors.map((color, index) => (
                      <div
                        key={color.id}
                        className="flex gap-2 items-center p-3 border rounded-lg"
                      >
                        <Input
                          placeholder="Color name"
                          value={color.name}
                          onChange={(e) =>
                            updateColor(index, "name", e.target.value)
                          }
                          className="flex-1"
                        />
                        <div className="flex items-center gap-2">
                          <Input
                            type="color"
                            value={color.hex}
                            onChange={(e) =>
                              updateColor(index, "hex", e.target.value)
                            }
                            className="w-16 h-10 cursor-pointer"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            onClick={() => removeColor(index)}
                          >
                            <X />
                          </Button>
                        </div>
                      </div>
                    ))}
                    {formData.colors.length === 0 && (
                      <p className="text-sm text-muted-foreground text-center py-4">
                        No colors added yet
                      </p>
                    )}
                  </div>
                </div>

                {/* Size Variants */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <Label className="text-sm font-medium">Sizes</Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addSize}
                    >
                      + Add Size
                    </Button>
                  </div>

                  <div className="space-y-2">
                    {formData.sizes.map((size, index) => (
                      <div
                        key={size.id}
                        className="flex gap-2 items-center p-3 border rounded-lg"
                      >
                        <Input
                          placeholder="Size (e.g., SMALL)"
                          value={size.name}
                          onChange={(e) =>
                            updateSize(index, "name", e.target.value)
                          }
                          className="flex-1"
                        />
                        <div className="flex items-center gap-2">
                          <Checkbox
                            checked={size.inStock}
                            onCheckedChange={(checked) =>
                              updateSize(index, "inStock", checked)
                            }
                          />
                          <Label className="text-sm whitespace-nowrap">
                            In Stock
                          </Label>
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            onClick={() => removeSize(index)}
                          >
                            <X />
                          </Button>
                        </div>
                      </div>
                    ))}
                    {formData.sizes.length === 0 && (
                      <p className="text-sm text-muted-foreground text-center py-4">
                        No sizes added yet
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
};

export default AdminProducts;



{/**

  // Add this debugging useEffect to monitor formData changes
useEffect(() => {
  console.log("FormData changed:", {
    hasVariants: formData.hasVariants,
    colorsCount: formData.colors?.length || 0,
    sizesCount: formData.sizes?.length || 0,
    colors: formData.colors,
    sizes: formData.sizes,
  });
}, [formData]);

// Updated helper functions with logging
const addColor = () => {
  const newColor = { id: Date.now().toString(), name: "", hex: "#000000" };
  const updatedColors = [...formData.colors, newColor];
  console.log("Adding color:", newColor, "Total colors:", updatedColors.length);
  setFormData({
    ...formData,
    colors: updatedColors,
  });
};

const updateColor = (index, field, value) => {
  const newColors = [...formData.colors];
  newColors[index][field] = value;
  console.log(`Updating color ${index} ${field}:`, value);
  setFormData({ ...formData, colors: newColors });
};

const removeColor = (index) => {
  const newColors = formData.colors.filter((_, i) => i !== index);
  console.log("Removing color at index:", index, "Remaining:", newColors.length);
  setFormData({ ...formData, colors: newColors });
};

const addSize = () => {
  const newSize = { id: Date.now().toString(), name: "", inStock: true };
  const updatedSizes = [...formData.sizes, newSize];
  console.log("Adding size:", newSize, "Total sizes:", updatedSizes.length);
  setFormData({
    ...formData,
    sizes: updatedSizes,
  });
};

const updateSize = (index, field, value) => {
  const newSizes = [...formData.sizes];
  newSizes[index][field] = value;
  console.log(`Updating size ${index} ${field}:`, value);
  setFormData({ ...formData, sizes: newSizes });
};

const removeSize = (index) => {
  const newSizes = formData.sizes.filter((_, i) => i !== index);
  console.log("Removing size at index:", index, "Remaining:", newSizes.length);
  setFormData({ ...formData, sizes: newSizes });
};

function onSubmit(event) {
  event.preventDefault();

  // Prepare the complete form data
  const completeFormData = {
    title: formData.title,
    description: formData.description,
    category: formData.category,
    brand: formData.brand,
    price: formData.price,
    salePrice: formData.salePrice,
    totalStock: formData.totalStock,
    isPersonalizable: formData.isPersonalizable || false,
    personalizationLabel: formData.personalizationLabel || "Add your personalization text",
    personalizationMaxLength: formData.personalizationMaxLength || 50,
    hasVariants: formData.hasVariants || false,
    colors: formData.hasVariants ? (formData.colors || []) : [],
    sizes: formData.hasVariants ? (formData.sizes || []) : [],
    image: currentIdToEdit !== null ? formData.image : uploadedImageUrl,
  };

  // Comprehensive debug logging
  console.log("=== FORM SUBMISSION DEBUG ===");
  console.log("Original formData:", formData);
  console.log("Complete formData being sent:", completeFormData);
  console.log("hasVariants:", completeFormData.hasVariants);
  console.log("colors array:", completeFormData.colors);
  console.log("sizes array:", completeFormData.sizes);
  console.log("============================");

  if (currentIdToEdit !== null) {
    // EDIT MODE
    console.log("EDIT MODE - ID:", currentIdToEdit);
    dispatch(
      editProduct({
        id: currentIdToEdit,
        formData: completeFormData,
      })
    ).then((data) => {
      console.log("Edit product response:", data);
      if (data?.payload?.success) {
        dispatch(fetchAllProducts());
        setFormData(initialFormData);
        setOpenCreateProductsDialog(false);
        setCurrentIdToEdit(null);
        toast("Product edited successfully!", {
          style: { background: "#22c55e", color: "white" },
        });
      } else {
        console.error("Edit failed:", data);
        toast.error("Failed to edit product");
      }
    }).catch((error) => {
      console.error("Edit error:", error);
      toast.error("Error editing product");
    });
  } else {
    // ADD MODE
    console.log("ADD MODE - New Product");
    dispatch(addNewProduct(completeFormData)).then((data) => {
      console.log("Add product response:", data);
      console.log("Response payload:", data?.payload);
      
      if (data?.payload?.success) {
        console.log("Product added successfully, fetching all products...");
        dispatch(fetchAllProducts());
        setOpenCreateProductsDialog(false);
        setImageFIle(null);
        setFormData(initialFormData);
        toast("Product added successfully!", {
          style: { background: "#22c55e", color: "white" },
        });
      } else {
        console.error("Add failed:", data);
        toast.error("Failed to add product");
      }
    }).catch((error) => {
      console.error("Add error:", error);
      toast.error("Error adding product");
    });
  }
}
 */}