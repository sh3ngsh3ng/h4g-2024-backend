const testing = "./testing/images/testing.png";

require("dotenv").config();
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API,
  api_secret: process.env.CLOUDINARY_SECRET,
});

async function testUploadImage() {
  try {
    await cloudinary.uploader.upload(testing, {
      public_id: "testing",
      folder: "testingVolunteerWave",
      resource_type: "image",
    });
    console.log("uploaded image successfully");
  } catch (error) {
    console.log("error", error);
  }
}

testUploadImage();

async function testDeleteImage() {
  try {
    await cloudinary.uploader.destroy("testingVolunteerWave/testing");
    console.log("deleted image successfully");
  } catch (error) {
    console.log("error", error);
  }
}

testDeleteImage();
