import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { loadavg } from "os";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadFileOnCloudinayry = async (localfile) => {
  if (!localfile) return null;

  //   upload file on cloudinary

  try {
    const response = await cloudinary.uploader.upload(localfile, {
      resource_type: "auto",
    });
    // file has been uploaded successfully
    // console.log("file has been uploaded", response);
    fs.unlinkSync(localfile);
    return response.url;
  } catch (error) {
    fs.unlinkSync(localfile);
    // remove the locally saved temporary file  as the upload operation got failed
    return null;
  }
};

// cloudinary.uploader.upload(
//   "https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
//   { public_id: "olympic_flag" },
//   function (error, result) {
//     console.log(result);
//   }
// );

export { uploadFileOnCloudinayry };
