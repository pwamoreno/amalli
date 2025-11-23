import React, { useEffect, useRef } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { FileIcon, UploadCloud, X } from "lucide-react";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";
import { PressableButton } from "../common/pressable-button";

const ProductImageUpload = ({
  imageFile,
  setImageFile,
  // uploadedImageUrl,
  setUploadedImageUrl,
  imageLoadingState,
  setImageLoadingState,
  isCustomStyled = false
}) => {
  const inputRef = useRef(null);
  const API = import.meta.env.VITE_API_URL;

  function handleImageFileChange(event) {
    // console.log(event.target.files);
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setImageFile(selectedFile);
    }
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  function handleDrop(event) {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];

    if (droppedFile) {
      setImageFile(droppedFile);
    }
  }

  function handleRemoveImage() {
    setImageFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  async function uploadImageToCloudinary(){
    setImageLoadingState(true)
    const data = new FormData()
    data.append("my_file", imageFile)
    const response = await axios.post(`${API}/api/admin/products/upload-image`, data)
    // console.log("response", response);
    
    if(response?.data?.success){
        setUploadedImageUrl(response.data.result.url)
        setImageLoadingState(false)
    }
  }

  useEffect(() => {
    if(imageFile !== null){
        uploadImageToCloudinary()
    }
  }, [imageFile])

  return (
    <div className={`w-full px-4 mt-4 ${isCustomStyled ? "" : "max-w-md mx-auto"}`}>
      <Label className="text-lg font-semibold mb-3 block">Upload Image</Label>
      <div
        className="border-2 border-dashed rounded-lg p-4"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <Input
          id="image-upload"
          type="file"
          //   className="hidden"
          ref={inputRef}
          onChange={handleImageFileChange}
        />
        {!imageFile ? (
          <Label
            htmlFor="image-upload"
            className="flex flex-col items-center justify-center h-32 cursor-pointer"
          >
            <UploadCloud className="w-10 h-10 text-muted-foreground mb-2" />
            <span>Drag & drop or click to upload</span>
          </Label>
        ) : (
          imageLoadingState ?
          <Skeleton className="h-10 bg-gray-100"/> :
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FileIcon className="w-8 h-8 text-primary mr-2" />
            </div>
            <p className="text-sm font-medium">{imageFile.name}</p>
            <PressableButton
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
              onClick={handleRemoveImage}
            >
              <X className="w-4 h-4" />
              <span className="sr-only">Remove File</span>
            </PressableButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductImageUpload;
