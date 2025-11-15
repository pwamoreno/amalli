import ProductImageUpload from "@/components/admin-view/image-upload";
import AdminProductTile from "@/components/admin-view/product-tile";
import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
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

  function onSubmit(event) {
    event.preventDefault();

    currentIdToEdit !== null
      ? dispatch(
          editProduct({
            id: currentIdToEdit,
            formData,
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
          addNewProduct({
            ...formData,
            image: uploadedImageUrl,
          })
        ).then((data) => {
          // console.log(data);
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
          className="hover:cursor-pointer hover:bg-green-400"
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
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
};

export default AdminProducts;
