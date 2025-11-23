import ProductImageUpload from "@/components/admin-view/image-upload";
import { PressableButton } from "@/components/common/pressable-button";
import { addFeatureImage, getFeatureImages } from "@/store/common-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const AdminDashboard = () => {
  const [imageFIle, setImageFIle] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const dispatch = useDispatch();

  const { featureImageList } = useSelector((state) => state.commonFeature);

  // console.log(uploadedImageUrl);

  function handleUploadFeatureImage() {
    dispatch(addFeatureImage(uploadedImageUrl)).then((data) => {
      if (data?.payload?.success) {
        dispatch(getFeatureImages());
        setImageFIle(null);
        setUploadedImageUrl("");
      }
    });
  }

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  // console.log(featureImageList);

  return (
    <div>
      {/* <h1>Upload Feature Image</h1> */}
      <ProductImageUpload
        imageFile={imageFIle}
        setImageFile={setImageFIle}
        uploadedImageUrl={uploadedImageUrl}
        setUploadedImageUrl={setUploadedImageUrl}
        imageLoadingState={imageLoadingState}
        setImageLoadingState={setImageLoadingState}
        isCustomStyled={true}
        // currentIdToEdit={currentIdToEdit}
      />
      <PressableButton onClick={handleUploadFeatureImage} className="mt-5 w-full bg-[#02066f]">
        Upload
      </PressableButton>
      <div className="flex flex-col gap-4 mt-5">
        {featureImageList && featureImageList.length > 0
          ? featureImageList.map((featureImageItem) => (
              <div className="relative">
                <img
                  src={featureImageItem.image}
                  className="w-full h-[300px] object-cover rounded-lg"
                />
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default AdminDashboard;
