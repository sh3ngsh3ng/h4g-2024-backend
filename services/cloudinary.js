const testingImage = "./testing/images/testImage.png";
const testingVideo = "./testing/videos/testVideo.mp4";

require("dotenv").config();
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API,
  api_secret: process.env.CLOUDINARY_SECRET,
});

async function testUploadImage() {
  try {
    const output = await cloudinary.uploader.upload(testingImage, {
      public_id: "love",
      folder: "testingVolunteerWave/images",
      resource_type: "image",
    });
    console.log("uploaded image successfully");
    console.log(output);
  } catch (error) {
    console.log("error", error);
  }
}

//testUploadImage();

async function testDeleteImage() {
  try {
    await cloudinary.uploader.destroy("testingVolunteerWave/images/testingImage");
    console.log("deleted image successfully");
  } catch (error) {
    console.log("error", error);
  }
}

//testDeleteImage();

// can use eager to resize videos
async function testUploadVideo() {
  try {
    const output = await cloudinary.uploader.upload(testingVideo, {
      public_id: "testingVideo",
      folder: "testingVolunteerWave/videos",
      resource_type: "video",
    });
    console.log("uploaded video successfully");
    console.log(output);
  } catch (error) {
    console.log("error", error);
  }
}

//testUploadVideo();

async function testDeleteVideo() {
  try {
    await cloudinary.uploader.destroy("testingVolunteerWave/videos/testingVideo", {
      resource_type: "video",
    });
    console.log("deleted video successfully");
  } catch (error) {
    console.log("error", error);
  }
}

//testDeleteVideo();
