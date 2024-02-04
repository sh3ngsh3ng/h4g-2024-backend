const testing = "./testing/images/testing.png";

require("dotenv").config();
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API,
  api_secret: process.env.CLOUDINARY_SECRET,
});

cloudinary.uploader
  .upload(testing, {
    public_id: "testing",
    folder: "testingVolunteerWave",
    resource_type: "image",
  })
  .then(() => {
    console.log("uploaded successfully");
  })
  .catch((error) => {
    console.log("error", error);
  });
