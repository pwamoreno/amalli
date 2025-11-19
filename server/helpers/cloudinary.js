const cloudinary = require("cloudinary").v2;
const multer = require("multer");

cloudinary.config({
  cloud_name: "dta1affwu",
  // cloud_name: "dta1affwu",
  api_key: "252854164953131",
  api_secret: "M9bqrZ4igPLY6S_wU59vAEqP48Q",
});

const storage = new multer.memoryStorage();

async function imageUploadUtil(file){
  const result = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });

  return result;
}

const upload = multer({ storage });

module.exports = { upload, imageUploadUtil };
